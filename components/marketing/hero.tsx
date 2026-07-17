"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

const rotatingLines = [
  "تعالج كل طلب فوراً",
  "تسند التوصيل للموزّع الحالي",
  "تنمو بعمولة من كل صفقة",
  "تركّز على العلاقات لا الإدارة",
] as const;

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % rotatingLines.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-svh overflow-hidden bg-navy text-navy-foreground">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,rgb(61_107_255/0.35),transparent_55%),radial-gradient(ellipse_70%_50%_at_90%_80%,rgb(175_201_255/0.18),transparent_50%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
      />

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 pb-20 pt-32">
        <div className="max-w-3xl animate-[fade-up_0.85s_ease-out_both]">
          <p className="font-heading text-5xl font-extrabold tracking-tight sm:text-7xl">
            {APP_NAME}
          </p>
          <h1 className="mt-6 font-heading text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-5xl">
            كن الموزّع الذي
            <span className="mt-2 block min-h-[1.3em] text-brand-blue transition-opacity duration-500">
              {rotatingLines[index]}
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            منصة نمو مبنية للموزّعين وتجار الجملة: التقط الطلبات، أسندها لموزّع
            موجود، ودع التقنية تحسب العمولة وتنمّي هوامشك.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="bg-brand-blue px-6 text-white hover:bg-brand-blue/90 animate-[fade-up_0.85s_ease-out_0.12s_both]"
              render={<Link href="/signup" />}
            >
              ابدأ النمو الآن
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white animate-[fade-up_0.85s_ease-out_0.22s_both]"
              render={<Link href="#platform" />}
            >
              شاهد المنصة
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
