import Link from "next/link";

import { Button } from "@/components/ui/button";

export function OrderingSection() {
  return (
    <section id="ordering" className="bg-navy py-24 text-navy-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold tracking-wide text-brand-blue">
            الطلبات والتوصيل
          </p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
            أنهِ الإدخال اليدوي.
            <span className="mt-2 block text-white/80">
              الموزّع الموجود يستلم الطلب ويوصله.
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
            bAI يلتقط الصفقة ويحوّلها إلى مسار تشغيل واضح: اختيار الموزّع، بدء
            التوصيل، ثم التسليم — مع احتساب العمولة تلقائياً.
          </p>
          <Button
            size="lg"
            className="mt-8 bg-brand-blue text-white hover:bg-brand-blue/90"
            render={<Link href="/orders" />}
          >
            إدارة الطلبات
          </Button>
        </div>

        <div
          aria-hidden
          className="relative min-h-[280px] overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#121a6b_0%,#3d6bff_55%,#afc9ff_100%)] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.55)] animate-[fade-in_1s_ease-out_both]"
        >
          <div className="absolute inset-x-8 top-10 bottom-10 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm" />
          <div className="absolute left-[18%] top-[34%] h-2.5 w-[48%] rounded-full bg-white/80" />
          <div className="absolute left-[18%] top-[44%] h-2.5 w-[32%] rounded-full bg-white/45" />
          <div className="absolute bottom-[26%] left-[18%] right-[18%] h-24 rounded-2xl bg-white/10" />
        </div>
      </div>
    </section>
  );
}
