import { createClient } from "@supabase/supabase-js";

import { getSupabaseUrl, getSupabaseServiceRoleKey } from "@/lib/env";

/**
 * Server-only Supabase client that bypasses RLS.
 * Use exclusively after requireAdmin() for platform admin dashboards.
 */
export function createServiceClient() {
  const serviceRoleKey = getSupabaseServiceRoleKey();

  return createClient(getSupabaseUrl(), serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
