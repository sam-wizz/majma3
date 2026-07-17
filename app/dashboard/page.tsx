import Link from "next/link";

import { InvoicesTable } from "@/components/invoices/invoices-table";
import { DataPrivacyNotice } from "@/components/privacy/data-privacy-notice";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { Invoice } from "@/types/invoice";

export default async function DashboardPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("invoices")
    .select(
      "id, user_id, file_path, file_name, invoice_date, total_amount, supplier_name, items, status, error_message, created_at, updated_at"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const invoices = (data ?? []) as Invoice[];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            لوحة التحكم
          </h1>
          <p className="mt-2 text-muted-foreground">
            عرض بيانات الفواتير المستخرجة لحسابك فقط.
          </p>
        </div>
        <Button render={<Link href="/upload" />}>رفع فاتورة</Button>
      </div>

      {error ? (
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          تعذر تحميل الفواتير: {error.message}. تأكد من تشغيل{" "}
          <span dir="ltr">supabase/schema.sql</span>.
        </p>
      ) : (
        <InvoicesTable invoices={invoices} />
      )}

      <DataPrivacyNotice />
    </div>
  );
}
