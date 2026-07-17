import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseConfig } from "@/lib/env";

let client: SupabaseClient | null = null;

/**
 * Returns a browser/server-safe Supabase client when env vars are configured.
 * Returns null until credentials are provided in `.env.local`.
 */
export function getSupabaseClient(): SupabaseClient | null {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  if (!client) {
    client = createClient(config.url, config.anonKey);
  }

  return client;
}
