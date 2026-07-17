"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        حدث خطأ غير متوقع
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        حاول مرة أخرى، أو حدّث الصفحة. إذا استمر الخطأ تأكد من إعداد{" "}
        <span dir="ltr">.env.local</span> وسكربتات Supabase.
      </p>
      <Button className="mt-8" onClick={reset}>
        إعادة المحاولة
      </Button>
    </main>
  );
}
