import type { CommissionSummary, Deal } from "@/types/marketplace";

export function summarizeCommissions(deals: Deal[]): CommissionSummary {
  return deals.reduce<CommissionSummary>(
    (acc, deal) => {
      const amount = Number(deal.amount) || 0;
      const commission = Number(deal.commission_amount) || 0;

      acc.totalDeals += 1;
      acc.totalDealVolume += amount;

      if (deal.status === "delivered") {
        acc.deliveredDeals += 1;
        acc.totalCommission += commission;
      } else if (deal.status !== "cancelled") {
        acc.pendingCommission += commission;
      }

      return acc;
    },
    {
      totalDeals: 0,
      deliveredDeals: 0,
      totalDealVolume: 0,
      totalCommission: 0,
      pendingCommission: 0,
    }
  );
}

export function formatSar(value: number) {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 2,
  }).format(value);
}
