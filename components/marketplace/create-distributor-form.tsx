"use client";

import { useActionState } from "react";

import { createDistributor } from "@/app/actions/marketplace";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionResult } from "@/types/invoice";

export function CreateDistributorForm() {
  const [state, formAction, pending] = useActionState<
    ActionResult | null,
    FormData
  >(createDistributor, null);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">اسم الموزّع</Label>
        <Input id="name" name="name" required placeholder="مثال: أبو سيف" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">الجوال</Label>
          <Input id="phone" name="phone" dir="ltr" placeholder="05xxxxxxxx" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="area">المنطقة</Label>
          <Input id="area" name="area" placeholder="الروابي" />
        </div>
      </div>

      {state && !state.success ? (
        <Alert variant="destructive">
          <AlertTitle>تعذر الحفظ</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      ) : null}
      {state?.success && state.message ? (
        <Alert>
          <AlertTitle>تم</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "جاري الحفظ..." : "إضافة موزّع"}
      </Button>
    </form>
  );
}
