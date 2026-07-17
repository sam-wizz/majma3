export const APP_NAME = "مد";

/** الطبقة التقنية للمنصة */
export const APP_TECH_NAME = "bAI";

export const APP_DESCRIPTION =
  "منصة توزيع تربط الطلب بالموزّع الحالي للتوصيل، وتأخذ مد عمولة من كل صفقة.";

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

/** نسبة عمولة مد الافتراضية من قيمة الصفقة (5%) */
export const DEFAULT_COMMISSION_RATE = 0.05;

export function calculateCommission(
  dealAmount: number,
  rate: number = DEFAULT_COMMISSION_RATE
): number {
  if (!Number.isFinite(dealAmount) || dealAmount < 0) return 0;
  return Math.round(dealAmount * rate * 100) / 100;
}
