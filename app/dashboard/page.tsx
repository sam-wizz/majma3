import Link from "next/link";

import { InvoicesTable } from "@/components/invoices/invoices-table";
import { CommissionStats } from "@/components/marketplace/commission-stats";
import { DealsTable } from "@/components/marketplace/deals-table";
import { DataPrivacyNotice } from "@/components/privacy/data-privacy-notice";
import { Button } from "@/components/ui/button";
import { APP_NAME, DEFAULT_COMMISSION_RATE } from "@/lib/constants";
import { requireUser } from "@/lib/auth";
import { normalizeDeals } from "@/lib/deals";
import { summarizeCommissions } from "@/lib/marketplace";
import { createClient } from "@/lib/supabase/server";
import type { Invoice } from "@/types/invoice";

export default async function DashboardPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const [dealsResult, invoicesResult] = await Promise.all([
    supabase
      .from("deals")
      .select(
        "id, user_id, distributor_id, customer_name, customer_phone, pickup_address, delivery_address, amount, commission_rate, commission_amount, status, notes, created_at, updated_at, delivered_at, distributor:distributors(id, name, phone, area)"
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("invoices")
      .select(
        "id, user_id, file_path, file_name, invoice_date, total_amount, supplier_name, items, status, error_message, created_at, updated_at"
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  const deals = normalizeDeals(dealsResult.data);
  const invoices = (invoicesResult.data ?? []) as Invoice[];
  const summary = summarizeCommissions(deals);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            لوحة {APP_NAME}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            الموزّع الموجود يستلم الطلب ويوصله، و{APP_NAME} تأخذ عمولة{" "}
            {(DEFAULT_COMMISSION_RATE * 100).toFixed(0)}% من كل صفقة.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" render={<Link href="/distributors" />}>
            الموزّعون
          </Button>
          <Button render={<Link href="/orders" />}>طلب جديد</Button>
        </div>
      </div>

      {dealsResult.error ? (
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          تعذر تحميل الصفقات: {dealsResult.error.message}. نفّذ{" "}
          <span dir="ltr">supabase/marketplace.sql</span> في Supabase.
        </p>
      ) : (
        <>
          <CommissionStats summary={summary} />
          <section className="space-y-4">
            <h2 className="font-heading text-xl font-semibold">أحدث الصفقات</h2>
            <DealsTable deals={deals.slice(0, 10)} />
          </section>
        </>
      )}

      <section id="invoices" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-xl font-semibold">الفواتير</h2>
          <Button variant="outline" size="sm" render={<Link href="/upload" />}>
            رفع فاتورة
          </Button>
        </div>
        {invoicesResult.error ? (
          <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            تعذر تحميل الفواتير: {invoicesResult.error.message}. نفّذ{" "}
            <span dir="ltr">supabase/schema.sql</span>.
          </p>
        ) : (
          <InvoicesTable invoices={invoices} />
        )}
      </section>

      <DataPrivacyNotice />
    </div>
  );
}
