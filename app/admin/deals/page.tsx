import { DealsTable } from "@/components/marketplace/deals-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchAdminOverview } from "@/lib/admin-data";
import { formatSar, summarizeCommissions } from "@/lib/marketplace";

export default async function AdminDealsPage() {
  const { deals, errors } = await fetchAdminOverview();
  const summary = summarizeCommissions(deals);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          كل الصفقات
        </h1>
        <p className="mt-2 text-muted-foreground">
          إجمالي العمولة المحصّلة: {formatSar(summary.totalCommission)} — معلّقة:{" "}
          {formatSar(summary.pendingCommission)}
        </p>
      </div>

      {errors.deals ? (
        <Alert variant="destructive">
          <AlertTitle>تعذر تحميل الصفقات</AlertTitle>
          <AlertDescription>{errors.deals}</AlertDescription>
        </Alert>
      ) : (
        <DealsTable deals={deals} />
      )}
    </div>
  );
}
