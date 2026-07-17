"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { hasSupabaseConfig } from "@/lib/env";
import { safeNextPath } from "@/lib/navigation";
import { ensureProfile } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/invoice";

const CONFIG_ERROR =
  "إعدادات Supabase غير مكتملة. انسخ .env.example إلى .env.local واملأ المفاتيح.";

export async function signUp(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  if (!hasSupabaseConfig()) {
    return { success: false, error: CONFIG_ERROR };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("fullName") ?? "").trim();

  if (!email || !password) {
    return { success: false, error: "البريد الإلكتروني وكلمة المرور مطلوبان." };
  }

  if (password.length < 8) {
    return {
      success: false,
      error: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName || undefined },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  if (data.user) {
    await ensureProfile(data.user);
  }

  revalidatePath("/", "layout");

  if (!data.session) {
    return {
      success: true,
      message:
        "تم إنشاء الحساب. إذا كان تأكيد البريد مفعّلاً، راجع صندوق الوارد ثم سجّل الدخول.",
    };
  }

  redirect("/dashboard");
}

export async function signIn(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  if (!hasSupabaseConfig()) {
    return { success: false, error: CONFIG_ERROR };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = safeNextPath(String(formData.get("next") ?? "/dashboard"));

  if (!email || !password) {
    return { success: false, error: "البريد الإلكتروني وكلمة المرور مطلوبان." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  if (data.user) {
    await ensureProfile(data.user);
  }

  revalidatePath("/", "layout");
  redirect(next);
}

export async function signOut(): Promise<void> {
  if (!hasSupabaseConfig()) {
    redirect("/login");
  }

  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
