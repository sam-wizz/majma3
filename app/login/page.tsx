import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";
import { APP_NAME } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/") ? params.next : "/dashboard";

  return (
    <div className="flex min-h-svh items-center justify-center bg-[radial-gradient(ellipse_at_top,oklch(0.93_0.04_195),transparent_55%),oklch(0.99_0.005_200)] px-6 py-16">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <Link href="/" className="font-heading text-3xl font-semibold tracking-tight">
            {APP_NAME}
          </Link>
          <h1 className="text-xl font-medium">تسجيل الدخول</h1>
          <p className="text-sm text-muted-foreground">
            ادخل لإدارة فواتيرك وتحليلها تلقائياً.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-background/90 p-6 shadow-sm">
          <LoginForm nextPath={nextPath} />
        </div>
      </div>
    </div>
  );
}
