import { APP_NAME } from "@/lib/constants";
import { formatSar } from "@/lib/marketplace";
import type { CommissionSummary } from "@/types/marketplace";

export function CommissionStats({ summary }: { summary: CommissionSummary }) {
  const items = [
    {
      label: "إجمالي الصفقات",
      value: String(summary.totalDeals),
    },
    {
      label: "صفقات مُسلَّمة",
      value: String(summary.deliveredDeals),
    },
    {
      label: "حجم الصفقات",
      value: formatSar(summary.totalDealVolume),
    },
    {
      label: `عمولة ${APP_NAME} المحصّلة`,
      value: formatSar(summary.totalCommission),
    },
    {
      label: "عمولة معلّقة",
      value: formatSar(summary.pendingCommission),
    },
  ] as const;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-border/80 bg-background/80 px-4 py-5"
        >
          <p className="text-xs text-muted-foreground">{item.label}</p>
          <p className="mt-2 font-heading text-2xl font-semibold tracking-tight">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
