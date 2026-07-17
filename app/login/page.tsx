import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";
import { APP_NAME } from "@/lib/constants";
import { safeNextPath } from "@/lib/navigation";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = safeNextPath(params.next);

  return (
    <div className="flex min-h-svh items-center justify-center bg-[radial-gradient(ellipse_at_top,#eef3ff,transparent_55%),#ffffff] px-6 py-16">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <Link
            href="/"
            className="font-heading text-3xl font-extrabold tracking-tight text-navy"
          >
            {APP_NAME}
          </Link>
          <h1 className="text-xl font-semibold text-navy">تسجيل الدخول</h1>
          <p className="text-sm text-muted-foreground">
            ادخل لإدارة الموزّعين والصفقات وعمولة {APP_NAME}.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <LoginForm nextPath={nextPath} />
        </div>
      </div>
    </div>
  );
}
