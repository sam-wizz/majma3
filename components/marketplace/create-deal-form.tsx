"use client";

import { useActionState } from "react";

import { createDeal } from "@/app/actions/marketplace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  APP_NAME,
  DEFAULT_COMMISSION_RATE,
} from "@/lib/constants";
import type { ActionResult } from "@/types/invoice";
import type { Distributor } from "@/types/marketplace";

export function CreateDealForm({
  distributors,
}: {
  distributors: Distributor[];
}) {
  const [state, formAction, pending] = useActionState<
    ActionResult | null,
    FormData
  >(createDeal, null);

  if (!distributors.length) {
    return (
      <Alert>
        <AlertTitle>أضف موزّعاً أولاً</AlertTitle>
        <AlertDescription>
          نموذج العمل يعتمد على موزّع موجود يستلم الطلب ويوصله. انتقل إلى صفحة
          الموزعين لإضافة موزّع نشط.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="customerName">اسم العميل</Label>
          <Input id="customerName" name="customerName" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="customerPhone">جوال العميل</Label>
          <Input id="customerPhone" name="customerPhone" dir="ltr" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="distributorId">الموزّع (يستلم ويوصّل)</Label>
        <select
          id="distributorId"
          name="distributorId"
          required
          className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          defaultValue=""
        >
          <option value="" disabled>
            اختر موزّعاً موجوداً
          </option>
          {distributors.map((distributor) => (
            <option key={distributor.id} value={distributor.id}>
              {distributor.name}
              {distributor.area ? ` — ${distributor.area}` : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pickupAddress">عنوان الاستلام (اختياري)</Label>
        <Input id="pickupAddress" name="pickupAddress" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deliveryAddress">عنوان التوصيل</Label>
        <Input id="deliveryAddress" name="deliveryAddress" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">قيمة الصفقة (ر.س)</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          min="0"
          step="0.01"
          required
          dir="ltr"
        />
        <p className="text-xs text-muted-foreground">
          عمولة {APP_NAME} تلقائياً: {(DEFAULT_COMMISSION_RATE * 100).toFixed(0)}%
          من قيمة الصفقة.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">ملاحظات</Label>
        <Textarea id="notes" name="notes" rows={3} />
      </div>

      {state && !state.success ? (
        <Alert variant="destructive">
          <AlertTitle>تعذر إنشاء الطلب</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      ) : null}
      {state?.success && state.message ? (
        <Alert>
          <AlertTitle>تم إسناد الطلب</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}

      <Button type="submit" disabled={pending} size="lg">
        {pending ? "جاري الإسناد..." : "إسناد الطلب للموزّع"}
      </Button>
    </form>
  );
}
