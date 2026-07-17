import { redirect } from "next/navigation";

import { hasSupabaseConfig } from "@/lib/env";
import { ensureProfile } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";

export async function getSessionUser() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function requireUser() {
  if (!hasSupabaseConfig()) {
    redirect("/login");
  }

  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  await ensureProfile(user);
  return user;
}
