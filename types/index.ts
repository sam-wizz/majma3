export type UserRole = "admin" | "user";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  role: UserRole;
  created_at: string;
}

export type SubscriptionPlan = "free" | "pro" | "enterprise";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: SubscriptionPlan;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export type {
  ActionResult,
  Invoice,
  InvoiceExtraction,
  InvoiceItem,
  InvoiceStatus,
} from "@/types/invoice";

export type {
  CommissionSummary,
  Deal,
  DealStatus,
  Distributor,
  DistributorStatus,
} from "@/types/marketplace";
