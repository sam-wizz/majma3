export const APP_NAME = "bAI";

export const APP_DESCRIPTION =
  "منصة نمو للموزّعين وتجار الجملة: أتمتة الطلبات، إسناد التوصيل للموزّع الحالي، وعمولة تلقائية من كل صفقة.";

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

/** نسبة العمولة الافتراضية من قيمة الصفقة (5%) */
export const DEFAULT_COMMISSION_RATE = 0.05;

export function calculateCommission(
  dealAmount: number,
  rate: number = DEFAULT_COMMISSION_RATE
): number {
  if (!Number.isFinite(dealAmount) || dealAmount < 0) return 0;
  return Math.round(dealAmount * rate * 100) / 100;
}
