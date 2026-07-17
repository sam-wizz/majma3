import { redirect } from "next/navigation";

import { getProfileRole, requireAdmin } from "@/lib/admin";
import { hasServiceRoleKey, hasSupabaseConfig } from "@/lib/env";
import { normalizeDeals } from "@/lib/deals";
import { createServiceClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/types";
import type { Distributor } from "@/types/marketplace";

export async function getAdminClient() {
  if (!hasSupabaseConfig()) {
    throw new Error("Supabase is not configured");
  }
  if (hasServiceRoleKey()) {
    return createServiceClient();
  }
  return createClient();
}

export async function fetchAdminOverview() {
  // Gate here too: layout + page can render in parallel in the App Router.
  if (!hasSupabaseConfig()) {
    redirect("/login");
  }

  const user = await requireAdmin();
  const supabase = await getAdminClient();
  const dbRole = await getProfileRole(user.id);

  const [dealsResult, distributorsResult, profilesResult] = await Promise.all([
    supabase
      .from("deals")
      .select(
        "id, user_id, distributor_id, customer_name, customer_phone, pickup_address, delivery_address, amount, commission_rate, commission_amount, status, notes, created_at, updated_at, delivered_at, distributor:distributors(id, name, phone, area)"
      )
      .order("created_at", { ascending: false }),
    supabase
      .from("distributors")
      .select("id, user_id, name, phone, area, status, created_at")
      .order("created_at", { ascending: false }),
    supabase.from("profiles").select("id, email, full_name, role, created_at"),
  ]);

  return {
    deals: normalizeDeals(dealsResult.data),
    distributors: (distributorsResult.data ?? []) as Distributor[],
    profiles: (profilesResult.data ?? []) as Profile[],
    errors: {
      deals: dealsResult.error?.message ?? null,
      distributors: distributorsResult.error?.message ?? null,
      profiles: profilesResult.error?.message ?? null,
    },
    usingServiceRole: hasServiceRoleKey(),
    hasDbAdminRole: dbRole === "admin",
  };
}
