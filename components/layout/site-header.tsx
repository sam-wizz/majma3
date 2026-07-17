import Link from "next/link";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

const nav = [
  { href: "#platform", label: "المنصة" },
  { href: "#ordering", label: "الطلبات" },
  { href: "#growth", label: "النمو" },
  { href: "/privacy", label: "الأمان" },
] as const;

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="font-heading text-2xl font-extrabold tracking-tight text-navy-foreground"
        >
          {APP_NAME}
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 hover:text-white"
            render={<Link href="/login" />}
          >
            دخول
          </Button>
          <Button
            className="bg-brand-blue text-white hover:bg-brand-blue/90"
            render={<Link href="/signup" />}
          >
            اطلب عرضاً
          </Button>
        </div>
      </div>
    </header>
  );
}
