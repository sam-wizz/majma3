"use client";

import { useActionState, useState } from "react";

import { uploadInvoice } from "@/app/actions/invoices";
import { DataPrivacyNotice } from "@/components/privacy/data-privacy-notice";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionResult } from "@/types/invoice";

export function UploadForm() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    uploadInvoice,
    null
  );

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="file">ملف الفاتورة</Label>
          <Input
            id="file"
            name="file"
            type="file"
            accept="application/pdf,image/png,image/jpeg,image/webp"
            required
            disabled={pending}
            onChange={(event) => {
              setFileName(event.target.files?.[0]?.name ?? null);
            }}
          />
          <p className="text-sm text-muted-foreground">
            الصيغ المدعومة: PDF، PNG، JPG، WEBP — بحد أقصى 10MB.
            {fileName ? ` الملف المحدد: ${fileName}` : null}
          </p>
        </div>

        {state && !state.success ? (
          <Alert variant="destructive">
            <AlertTitle>فشل الرفع أو التحليل</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        ) : null}

        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "جاري الرفع والتحليل..." : "رفع وتحليل الفاتورة"}
        </Button>
      </form>

      <DataPrivacyNotice />
    </div>
  );
}
