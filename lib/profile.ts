import type { User } from "@supabase/supabase-js";

import { getAdminEmails, hasServiceRoleKey } from "@/lib/env";
import { createServiceClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types";

function desiredRoleForEmail(email: string | undefined): UserRole {
  if (!email) return "user";
  const allowlist = getAdminEmails();
  return allowlist.includes(email.toLowerCase()) ? "admin" : "user";
}

/**
 * Ensure a profiles row exists and sync admin allowlist → role when possible.
 */
export async function ensureProfile(user: User): Promise<void> {
  const supabase = await createClient();
  const desiredRole = desiredRoleForEmail(user.email);
  const fullName =
    typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : "";

  const { data: existing } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!existing) {
    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      email: user.email ?? null,
      full_name: fullName,
      role: "user",
    });

    // Trigger may have created it already, or table not migrated yet.
    if (error && error.code !== "23505") {
      console.error("ensureProfile insert failed:", error.message);
    }
  } else {
    await supabase
      .from("profiles")
      .update({
        email: user.email ?? null,
        full_name: fullName || undefined,
      })
      .eq("id", user.id);
  }

  // Promote allowlisted admins using service role (bypasses role trigger safely).
  if (desiredRole === "admin" && hasServiceRoleKey()) {
    const adminClient = createServiceClient();
    const { error } = await adminClient
      .from("profiles")
      .upsert(
        {
          id: user.id,
          email: user.email ?? null,
          full_name: fullName,
          role: "admin",
        },
        { onConflict: "id" }
      );

    if (error) {
      console.error("ensureProfile admin sync failed:", error.message);
    }
  }
}
