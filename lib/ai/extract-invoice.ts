import OpenAI, { toFile } from "openai";
import { z } from "zod";

import { getOpenAIApiKey } from "@/lib/env";
import type { InvoiceExtraction } from "@/types/invoice";

const extractionSchema = z.object({
  invoiceDate: z.string().nullable(),
  totalAmount: z.number().nullable(),
  supplierName: z.string().nullable(),
  items: z
    .array(
      z.object({
        name: z.string(),
        quantity: z.number().nullable().optional(),
        unitPrice: z.number().nullable().optional(),
        totalPrice: z.number().nullable().optional(),
      })
    )
    .default([]),
});

const SYSTEM_PROMPT = `You are an invoice data extraction engine.
Extract these fields from the invoice document:
- invoiceDate (ISO date YYYY-MM-DD when possible, otherwise null)
- totalAmount (numeric total due, no currency symbols)
- supplierName (vendor / seller name)
- items (array of line items with name, quantity, unitPrice, totalPrice)

Return ONLY valid JSON matching this shape:
{
  "invoiceDate": string | null,
  "totalAmount": number | null,
  "supplierName": string | null,
  "items": [{ "name": string, "quantity": number | null, "unitPrice": number | null, "totalPrice": number | null }]
}

If a field is missing or unclear, use null (or [] for items). Do not invent values.`;

function getOpenAI() {
  return new OpenAI({ apiKey: getOpenAIApiKey() });
}

export async function extractInvoiceData(params: {
  buffer: Buffer;
  mimeType: string;
  fileName: string;
}): Promise<InvoiceExtraction> {
  const { buffer, mimeType, fileName } = params;
  const openai = getOpenAI();

  if (mimeType.startsWith("image/")) {
    const dataUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      temperature: 0,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Extract invoice fields from this image (${fileName}).`,
            },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        },
      ],
    });

    return parseExtraction(completion.choices[0]?.message?.content);
  }

  if (mimeType === "application/pdf") {
    const uploaded = await openai.files.create({
      file: await toFile(buffer, fileName, { type: mimeType }),
      purpose: "assistants",
    });

    try {
      const response = await openai.responses.create({
        model: "gpt-4o",
        temperature: 0,
        text: { format: { type: "json_object" } },
        input: [
          {
            role: "system",
            content: [{ type: "input_text", text: SYSTEM_PROMPT }],
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `Extract invoice fields from this PDF (${fileName}).`,
              },
              { type: "input_file", file_id: uploaded.id },
            ],
          },
        ],
      });

      return parseExtraction(response.output_text);
    } finally {
      await openai.files.delete(uploaded.id).catch(() => undefined);
    }
  }

  throw new Error(
    "Unsupported file type. Upload a PDF or image (PNG, JPG, WEBP)."
  );
}

function parseExtraction(
  content: string | null | undefined
): InvoiceExtraction {
  if (!content) {
    throw new Error("AI extraction returned an empty response.");
  }

  const json = JSON.parse(content) as unknown;
  const parsed = extractionSchema.parse(json);

  return {
    invoiceDate: parsed.invoiceDate,
    totalAmount: parsed.totalAmount,
    supplierName: parsed.supplierName,
    items: parsed.items.map((item) => ({
      name: item.name,
      quantity: item.quantity ?? null,
      unitPrice: item.unitPrice ?? null,
      totalPrice: item.totalPrice ?? null,
    })),
  };
}
