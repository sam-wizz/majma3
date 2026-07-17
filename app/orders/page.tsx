import { CreateDealForm } from "@/components/marketplace/create-deal-form";
import { DealsTable } from "@/components/marketplace/deals-table";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { isAdminUser } from "@/lib/admin";
import { requireUser } from "@/lib/auth";
import { normalizeDeals } from "@/lib/deals";
import { createClient } from "@/lib/supabase/server";
import type { Distributor } from "@/types/marketplace";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const user = await requireUser();
  const isAdmin = await isAdminUser(user);
  const supabase = await createClient();

  const [{ data: distributorsData }, { data: dealsData, error }] =
    await Promise.all([
      supabase
        .from("distributors")
        .select("id, user_id, name, phone, area, status, created_at")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("created_at", { ascending: false }),
      supabase
        .from("deals")
        .select(
          "id, user_id, distributor_id, customer_name, customer_phone, pickup_address, delivery_address, amount, commission_rate, commission_amount, status, notes, created_at, updated_at, delivered_at, distributor:distributors(id, name, phone, area)"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
    ]);

  const distributors = (distributorsData ?? []) as Distributor[];
  const deals = normalizeDeals(dealsData);

  return (
    <DashboardShell email={user.email} isAdmin={isAdmin}>
      <div className="space-y-10">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            الطلبات والصفقات
          </h1>
          <p className="mt-2 text-muted-foreground">
            أسند الطلب لموزّع موجود ليستلمه ويوصّله — وتُحسب عمولة bAI من كل صفقة.
          </p>
        </div>

        <section className="rounded-2xl border border-border bg-background/90 p-6 shadow-sm">
          <h2 className="font-heading text-xl font-semibold">طلب جديد</h2>
          <div className="mt-4">
            <CreateDealForm distributors={distributors} />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold">كل الصفقات</h2>
          {error ? (
            <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              تعذر تحميل الصفقات: {error.message}. نفّذ{" "}
              <span dir="ltr">supabase/marketplace.sql</span>.
            </p>
          ) : (
            <DealsTable deals={deals} />
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
