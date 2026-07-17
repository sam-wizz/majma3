import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";

import { getAdminEmails, hasSupabaseConfig } from "@/lib/env";
import { getSessionUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export async function getProfileRole(userId: string): Promise<"admin" | "user" | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (data?.role === "admin" || data?.role === "user") {
    return data.role;
  }

  return null;
}

export async function isAdminUser(user: User | null | undefined): Promise<boolean> {
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

  const admin = await isAdminUser(user);
  if (!admin) {
    redirect("/dashboard");
  }

  return user;
}
