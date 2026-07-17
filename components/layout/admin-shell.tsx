import Link from "next/link";

import { signOut } from "@/app/actions/auth";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

const links = [
  { href: "/admin", label: "نظرة عامة" },
  { href: "/admin/deals", label: "كل الصفقات" },
  { href: "/admin/distributors", label: "كل الموزّعين" },
  { href: "/dashboard", label: "لوحة المستخدم" },
] as const;

export function AdminShell({
  email,
  children,
}: {
  email?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-svh bg-[radial-gradient(ellipse_at_top,oklch(0.94_0.03_210),transparent_50%),oklch(0.985_0.01_200)]">
      <header className="border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-4">
            <MobileNav links={links} />
            <Link href="/admin" className="flex items-center gap-2 leading-tight">
              <span className="font-heading text-xl font-semibold">{APP_NAME}</span>
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                إدارة
              </span>
            </Link>
            <nav className="hidden items-center gap-4 md:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {email ? (
              <span
                className="hidden text-sm text-muted-foreground lg:inline"
                dir="ltr"
              >
                {email}
              </span>
            ) : null}
            <form action={signOut}>
              <Button type="submit" variant="outline" size="sm">
                تسجيل الخروج
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
