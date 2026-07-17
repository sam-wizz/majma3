import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";

import { getAdminEmails, hasSupabaseConfig } from "@/lib/env";
import { getSessionUser } from "@/lib/auth";
import { ensureProfile } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";

export async function getProfileRole(
  userId: string
): Promise<"admin" | "user" | null> {
  if (!hasSupabaseConfig()) {
    return null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("getProfileRole failed:", error.message);
      return null;
    }

    if (data?.role === "admin" || data?.role === "user") {
      return data.role;
    }
  } catch (error) {
    console.error("getProfileRole failed:", error);
  }

  return null;
}

export async function isAdminUser(
  user: User | null | undefined
): Promise<boolean> {
  if (!user?.email) return false;

  const allowlist = getAdminEmails();
  if (allowlist.includes(user.email.toLowerCase())) {
    return true;
  }

  const role = await getProfileRole(user.id);
  return role === "admin";
}

export async function requireAdmin() {
  if (!hasSupabaseConfig()) {
    redirect("/login");
  }

  const user = await getSessionUser();
  if (!user) {
    redirect("/login?next=/admin");
  }

  await ensureProfile(user);

  const admin = await isAdminUser(user);
  if (!admin) {
    redirect("/dashboard");
  }

  return user;
}
