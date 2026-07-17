"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { extractInvoiceData } from "@/lib/ai/extract-invoice";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/invoice";

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
]);

const MAX_BYTES = 10 * 1024 * 1024;

export async function uploadInvoice(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const user = await requireUser();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { success: false, error: "يرجى اختيار ملف فاتورة صالح." };
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return {
      success: false,
      error: "الصيغ المدعومة: PDF أو PNG أو JPG أو WEBP.",
    };
  }

  if (file.size > MAX_BYTES) {
    return { success: false, error: "حجم الملف يجب ألا يتجاوز 10MB." };
  }

  const supabase = await createClient();
  const buffer = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^\w.\-()\u0600-\u06FF\s]/g, "_");
  const objectPath = `${user.id}/${crypto.randomUUID()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from("invoices")
    .upload(objectPath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return {
      success: false,
      error: `تعذر رفع الملف إلى التخزين: ${uploadError.message}`,
    };
  }

  const { data: inserted, error: insertError } = await supabase
    .from("invoices")
    .insert({
      user_id: user.id,
      file_path: objectPath,
      file_name: file.name,
      status: "processing",
      items: [],
    })
    .select("id")
    .single();

  if (insertError || !inserted) {
    await supabase.storage.from("invoices").remove([objectPath]);
    return {
      success: false,
      error: `تعذر حفظ سجل الفاتورة: ${insertError?.message ?? "unknown"}`,
    };
  }

  try {
    const extracted = await extractInvoiceData({
      buffer,
      mimeType: file.type,
      fileName: file.name,
    });

    const { error: updateError } = await supabase
      .from("invoices")
      .update({
        invoice_date: extracted.invoiceDate,
        total_amount: extracted.totalAmount,
        supplier_name: extracted.supplierName,
        items: extracted.items,
        status: "completed",
        error_message: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", inserted.id)
      .eq("user_id", user.id);

    if (updateError) {
      throw new Error(updateError.message);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "فشل تحليل الفاتورة.";

    await supabase
      .from("invoices")
      .update({
        status: "failed",
        error_message: message,
        updated_at: new Date().toISOString(),
      })
      .eq("id", inserted.id)
      .eq("user_id", user.id);

    return {
      success: false,
      error: `تم رفع الملف لكن فشل التحليل: ${message}`,
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
