import Link from "next/link";

import { CommissionStats } from "@/components/marketplace/commission-stats";
import { DealsTable } from "@/components/marketplace/deals-table";
import { DistributorsTable } from "@/components/marketplace/distributors-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { fetchAdminOverview } from "@/lib/admin-data";
import { APP_NAME } from "@/lib/constants";
import { summarizeCommissions } from "@/lib/marketplace";

export default async function AdminPage() {
  const {
    deals,
    distributors,
    profiles,
    errors,
    usingServiceRole,
    hasDbAdminRole,
  } = await fetchAdminOverview();
  const summary = summarizeCommissions(deals);
  const adminCount = profiles.filter((profile) => profile.role === "admin").length;
  const userCount = profiles.length;
  const showSetupHint = !usingServiceRole && !hasDbAdminRole;

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            لوحة إدارة {APP_NAME}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            متابعة كل الموزّعين والصفقات وعمولات المنصة عبر الحسابات.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" render={<Link href="/admin/distributors" />}>
            الموزّعون
          </Button>
          <Button render={<Link href="/admin/deals" />}>الصفقات</Button>
        </div>
      </div>

      {showSetupHint ? (
        <Alert>
          <AlertTitle>أكمل إعداد لوحة الإدارة</AlertTitle>
          <AlertDescription>
            نفّذ <span dir="ltr">supabase/admin.sql</span> ثم رقِّ حسابك إلى admin،
            وأضف <span dir="ltr">ADMIN_EMAILS</span> مع{" "}
            <span dir="ltr">SUPABASE_SERVICE_ROLE_KEY</span> في{" "}
            <span dir="ltr">.env.local</span> حتى تظهر كل بيانات المنصة.
          </AlertDescription>
        </Alert>
      ) : null}

      {(errors.deals || errors.distributors || errors.profiles) && (
        <Alert variant="destructive">
          <AlertTitle>تعذر تحميل بعض بيانات الإدارة</AlertTitle>
          <AlertDescription>
            {[errors.deals, errors.distributors, errors.profiles]
              .filter(Boolean)
              .join(" · ")}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/80 bg-background/80 px-4 py-5">
          <p className="text-xs text-muted-foreground">المستخدمون</p>
          <p className="mt-2 font-heading text-2xl font-semibold">{userCount}</p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-background/80 px-4 py-5">
          <p className="text-xs text-muted-foreground">المديرون</p>
          <p className="mt-2 font-heading text-2xl font-semibold">{adminCount}</p>
        </div>
        <div className="rounded-2xl border border-border/80 bg-background/80 px-4 py-5">
          <p className="text-xs text-muted-foreground">الموزّعون</p>
          <p className="mt-2 font-heading text-2xl font-semibold">
            {distributors.length}
          </p>
        </div>
      </div>

      <CommissionStats summary={summary} />

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-xl font-semibold">أحدث الصفقات</h2>
          <Button variant="ghost" size="sm" render={<Link href="/admin/deals" />}>
            عرض الكل
          </Button>
        </div>
        <DealsTable deals={deals.slice(0, 8)} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-xl font-semibold">الموزّعون</h2>
          <Button
            variant="ghost"
            size="sm"
            render={<Link href="/admin/distributors" />}
          >
            عرض الكل
          </Button>
        </div>
        <DistributorsTable distributors={distributors.slice(0, 8)} />
      </section>
    </div>
  );
}
