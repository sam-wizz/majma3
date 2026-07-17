import Link from "next/link";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

export function FinalCta() {
  return (
    <section className="bg-navy py-24 text-navy-foreground">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-3xl font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
          المستقبل مؤتمت.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          ابدأ بالتركيز على النمو لا الإدارة. موزّعو {APP_NAME} يبنون علاقات مربحة
          — والتقنية تتولى الباقي.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button
            size="lg"
            className="bg-brand-blue text-white hover:bg-brand-blue/90"
            render={<Link href="/signup" />}
          >
            ابدأ مع {APP_NAME}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            render={<Link href="/login" />}
          >
            تسجيل الدخول
          </Button>
        </div>
      </div>
    </section>
  );
}
