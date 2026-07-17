import Link from "next/link";

import { CommissionStats } from "@/components/marketplace/commission-stats";
import { DealsTable } from "@/components/marketplace/deals-table";
import { DataPrivacyNotice } from "@/components/privacy/data-privacy-notice";
import { Button } from "@/components/ui/button";
import { APP_NAME, APP_TECH_NAME, DEFAULT_COMMISSION_RATE } from "@/lib/constants";
import { requireUser } from "@/lib/auth";
import { normalizeDeals } from "@/lib/deals";
import { summarizeCommissions } from "@/lib/marketplace";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("deals")
    .select(
      "id, user_id, distributor_id, customer_name, customer_phone, pickup_address, delivery_address, amount, commission_rate, commission_amount, status, notes, created_at, updated_at, delivered_at, distributor:distributors(id, name, phone, area)"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const deals = normalizeDeals(data);
  const summary = summarizeCommissions(deals);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            لوحة {APP_NAME}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            عبر {APP_TECH_NAME}: الموزّع الموجود يستلم الطلب ويوصله، و{APP_NAME}{" "}
            تأخذ عمولة {(DEFAULT_COMMISSION_RATE * 100).toFixed(0)}% من كل صفقة.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" render={<Link href="/distributors" />}>
            الموزّعون
          </Button>
          <Button render={<Link href="/orders" />}>طلب جديد</Button>
        </div>
      </div>

      {error ? (
        <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          تعذر تحميل الصفقات: {error.message}. نفّذ{" "}
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

      <DataPrivacyNotice />
    </div>
  );
}
