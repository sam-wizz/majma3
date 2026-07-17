import Link from "next/link";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative min-h-svh overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_80%_10%,oklch(0.78_0.12_195/0.55),transparent_55%),radial-gradient(ellipse_80%_60%_at_10%_90%,oklch(0.88_0.07_85/0.4),transparent_50%),linear-gradient(165deg,oklch(0.985_0.01_95)_0%,oklch(0.95_0.025_200)_50%,oklch(0.9_0.04_210)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 [background-image:linear-gradient(oklch(0.3_0.04_220/0.07)_1px,transparent_1px),linear-gradient(90deg,oklch(0.3_0.04_220/0.07)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute -right-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.7_0.12_195/0.25)] blur-3xl animate-[pulse-soft_8s_ease-in-out_infinite]"
      />

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 pb-20 pt-28">
        <div className="max-w-2xl animate-[fade-up_0.85s_ease-out_both]">
          <p className="font-heading text-6xl font-semibold tracking-tight text-foreground sm:text-8xl">
            {APP_NAME}
          </p>
          <h1 className="mt-6 max-w-xl text-2xl font-medium leading-snug tracking-tight text-foreground/90 sm:text-3xl">
            Ship AI products with a platform built for speed.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            A production-ready Next.js foundation with Tailwind CSS and
            shadcn/ui — structured to scale as your SaaS grows.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="animate-[fade-up_0.85s_ease-out_0.12s_both]"
              render={<Link href="#get-started" />}
            >
              Start building
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="animate-[fade-up_0.85s_ease-out_0.22s_both]"
              render={<Link href="#features" />}
            >
              Explore stack
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
