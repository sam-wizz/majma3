import { DistributorsTable } from "@/components/marketplace/distributors-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchAdminOverview } from "@/lib/admin-data";

export default async function AdminDistributorsPage() {
  const { distributors, errors } = await fetchAdminOverview();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          كل الموزّعين
        </h1>
        <p className="mt-2 text-muted-foreground">
          قائمة الموزّعين المسجّلين عبر كل حسابات المنصة.
        </p>
      </div>

      {errors.distributors ? (
        <Alert variant="destructive">
          <AlertTitle>تعذر تحميل الموزّعين</AlertTitle>
          <AlertDescription>{errors.distributors}</AlertDescription>
        </Alert>
      ) : (
        <DistributorsTable distributors={distributors} />
      )}
    </div>
  );
}
