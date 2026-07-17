import type { Deal, Distributor } from "@/types/marketplace";

type DealRow = Omit<Deal, "distributor"> & {
  distributor?:
    | Pick<Distributor, "id" | "name" | "phone" | "area">
    | Pick<Distributor, "id" | "name" | "phone" | "area">[]
    | null;
};

export function normalizeDeals(rows: DealRow[] | null | undefined): Deal[] {
  return (rows ?? []).map((row) => {
    const distributor = Array.isArray(row.distributor)
      ? (row.distributor[0] ?? null)
      : (row.distributor ?? null);

    return {
      ...row,
      amount: Number(row.amount),
      commission_rate: Number(row.commission_rate),
      commission_amount: Number(row.commission_amount),
      distributor,
    };
  });
}
