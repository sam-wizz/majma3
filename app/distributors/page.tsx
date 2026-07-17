import { CreateDistributorForm } from "@/components/marketplace/create-distributor-form";
import { DistributorsTable } from "@/components/marketplace/distributors-table";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { Distributor } from "@/types/marketplace";

export const dynamic = "force-dynamic";

export default async function DistributorsPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("distributors")
    .select("id, user_id, name, phone, area, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const distributors = (data ?? []) as Distributor[];

  return (
    <DashboardShell email={user.email}>
      <div className="space-y-10">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            الموزّعون
          </h1>
          <p className="mt-2 text-muted-foreground">
            الموزّع الموجود يستلم الطلب ويوصله للعميل.
          </p>
        </div>

        <section className="rounded-2xl border border-border bg-background/90 p-6 shadow-sm">
          <h2 className="font-heading text-xl font-semibold">إضافة موزّع</h2>
          <div className="mt-4">
            <CreateDistributorForm />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold">قائمة الموزّعين</h2>
          {error ? (
            <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              تعذر تحميل الموزّعين: {error.message}. نفّذ{" "}
              <span dir="ltr">supabase/marketplace.sql</span>.
            </p>
          ) : (
            <DistributorsTable distributors={distributors} />
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
