import Link from "next/link";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-heading text-xl font-semibold tracking-tight text-foreground"
        >
          {APP_NAME}
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/privacy"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            الخصوصية
          </Link>
          <Button variant="ghost" render={<Link href="/login" />}>
            دخول
          </Button>
          <Button render={<Link href="/signup" />}>ابدأ الآن</Button>
        </nav>
      </div>
    </header>
  );
}
