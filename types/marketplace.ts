export type DistributorStatus = "active" | "inactive";

export type DealStatus =
  | "pending"
  | "assigned"
  | "in_transit"
  | "delivered"
  | "cancelled";

export interface Distributor {
  id: string;
  user_id: string;
  name: string;
  phone: string | null;
  area: string | null;
  status: DistributorStatus;
  created_at: string;
}

export interface Deal {
  id: string;
  user_id: string;
  distributor_id: string | null;
  customer_name: string;
  customer_phone: string | null;
  pickup_address: string | null;
  delivery_address: string;
  amount: number;
  commission_rate: number;
  commission_amount: number;
  status: DealStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
  delivered_at: string | null;
  distributor?: Pick<Distributor, "id" | "name" | "phone" | "area"> | null;
}

export interface CommissionSummary {
  totalDeals: number;
  deliveredDeals: number;
  totalDealVolume: number;
  totalCommission: number;
  pendingCommission: number;
}
