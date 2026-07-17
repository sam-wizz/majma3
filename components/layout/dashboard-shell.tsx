import Link from "next/link";

import { signOut } from "@/app/actions/auth";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { APP_NAME, APP_TECH_NAME } from "@/lib/constants";

export function DashboardShell({
  email,
  isAdmin = false,
  children,
}: {
  email?: string | null;
  isAdmin?: boolean;
  children: React.ReactNode;
}) {
  const links = [
    { href: "/dashboard", label: "لوحة التحكم" },
    { href: "/orders", label: "الطلبات" },
    { href: "/distributors", label: "الموزّعون" },
    { href: "/upload", label: "الفواتير" },
    { href: "/privacy", label: "الخصوصية" },
    ...(isAdmin ? [{ href: "/admin", label: "لوحة الإدارة" }] : []),
  ];

  return (
    <div className="relative min-h-svh bg-[radial-gradient(ellipse_at_top,oklch(0.96_0.02_200),transparent_55%),oklch(0.99_0.005_200)]">
      <header className="border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-4">
            <MobileNav links={links} />
            <Link href="/dashboard" className="leading-tight">
              <span className="font-heading text-xl font-semibold">{APP_NAME}</span>
              <span className="mr-2 text-xs text-muted-foreground" dir="ltr">
                {APP_TECH_NAME}
              </span>
            </Link>
            <nav className="hidden items-center gap-4 md:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    link.href === "/admin"
                      ? "text-sm font-medium text-primary transition-colors hover:text-primary/80"
                      : "text-sm text-muted-foreground transition-colors hover:text-foreground"
                  }
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
