export type UserRole = "owner" | "admin" | "member" | "viewer";

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
