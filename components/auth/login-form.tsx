"use client";

import { useActionState } from "react";
import Link from "next/link";

import { signIn } from "@/app/actions/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionResult } from "@/types/invoice";

export function LoginForm({ nextPath = "/dashboard" }: { nextPath?: string }) {
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    signIn,
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={nextPath} />

      <div className="space-y-2">
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          dir="ltr"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">كلمة المرور</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          dir="ltr"
        />
      </div>

      {state && !state.success ? (
        <Alert variant="destructive">
          <AlertTitle>تعذر تسجيل الدخول</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      ) : null}

      <Button type="submit" className="w-full" disabled={pending} size="lg">
        {pending ? "جاري الدخول..." : "تسجيل الدخول"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        ليس لديك حساب؟{" "}
        <Link href="/signup" className="text-foreground underline-offset-4 hover:underline">
          إنشاء حساب
        </Link>
      </p>
    </form>
  );
}
