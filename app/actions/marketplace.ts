"use server";

import { revalidatePath } from "next/cache";

import {
  APP_NAME,
  DEFAULT_COMMISSION_RATE,
  calculateCommission,
} from "@/lib/constants";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/types/invoice";
import type { DealStatus } from "@/types/marketplace";

function revalidateMarketplace() {
  revalidatePath("/dashboard");
  revalidatePath("/orders");
  revalidatePath("/distributors");
}

export async function createDistributor(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const user = await requireUser();
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const area = String(formData.get("area") ?? "").trim() || null;

  if (!name) {
    return { success: false, error: "اسم الموزّع مطلوب." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("distributors").insert({
    user_id: user.id,
    name,
    phone,
    area,
    status: "active",
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidateMarketplace();
  return { success: true, message: "تمت إضافة الموزّع." };
}

export async function createDeal(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const user = await requireUser();
  const customerName = String(formData.get("customerName") ?? "").trim();
  const customerPhone = String(formData.get("customerPhone") ?? "").trim() || null;
  const pickupAddress = String(formData.get("pickupAddress") ?? "").trim() || null;
  const deliveryAddress = String(formData.get("deliveryAddress") ?? "").trim();
  const distributorId = String(formData.get("distributorId") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim() || null;
  const amount = Number(formData.get("amount"));

  if (!customerName || !deliveryAddress) {
    return {
      success: false,
      error: "اسم العميل وعنوان التوصيل مطلوبان.",
    };
  }

  if (!distributorId) {
    return {
      success: false,
      error: "اختر موزّعاً موجوداً لاستلام الطلب وتوصيله.",
    };
  }

  if (!Number.isFinite(amount) || amount < 0) {
    return { success: false, error: "قيمة الصفقة غير صالحة." };
  }

  const commissionRate = DEFAULT_COMMISSION_RATE;
  const commissionAmount = calculateCommission(amount, commissionRate);

  const supabase = await createClient();

  const { data: distributor, error: distributorError } = await supabase
    .from("distributors")
    .select("id, status")
    .eq("id", distributorId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (distributorError || !distributor) {
    return { success: false, error: "الموزّع غير موجود ضمن حسابك." };
  }

  if (distributor.status !== "active") {
    return { success: false, error: "هذا الموزّع غير نشط حالياً." };
  }

  const { error } = await supabase.from("deals").insert({
    user_id: user.id,
    distributor_id: distributorId,
    customer_name: customerName,
    customer_phone: customerPhone,
    pickup_address: pickupAddress,
    delivery_address: deliveryAddress,
    amount,
    commission_rate: commissionRate,
    commission_amount: commissionAmount,
    status: "assigned",
    notes,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidateMarketplace();
  return {
    success: true,
    message: `تم إسناد الطلب للموزّع. عمولة ${APP_NAME}: ${commissionAmount} ر.س`,
  };
}

export async function updateDealStatus(
  dealId: string,
  status: DealStatus
): Promise<ActionResult> {
  const user = await requireUser();
  const supabase = await createClient();

  const payload: {
    status: DealStatus;
    updated_at: string;
    delivered_at?: string | null;
  } = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (status === "delivered") {
    payload.delivered_at = new Date().toISOString();
  }

  if (status === "cancelled" || status === "pending" || status === "assigned") {
    payload.delivered_at = null;
  }

  const { error } = await supabase
    .from("deals")
    .update(payload)
    .eq("id", dealId)
    .eq("user_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidateMarketplace();
  return { success: true, message: "تم تحديث حالة الصفقة." };
}
