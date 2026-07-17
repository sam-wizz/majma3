import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/marketing/hero";
import { Separator } from "@/components/ui/separator";
import { APP_NAME } from "@/lib/constants";

const steps = [
  {
    title: `${APP_NAME} يستقبل الطلب`,
    description: "تسجّل الصفقة في المنصة وتختار الموزّع المناسب للمنطقة.",
  },
  {
    title: "الموزّع الموجود يستلم ويوصّل",
    description:
      "لا حاجة لأسطول داخلي — الموزّع الحالي يستلم الطلب ويوصله للعميل.",
  },
  {
    title: `${APP_NAME} تأخذ عمولة من كل صفقة`,
    description: "تُحسب العمولة تلقائياً عند إنشاء الصفقة وتُحصَّل عند التسليم.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />

        <section
          id="features"
          className="border-t border-border/60 bg-background"
        >
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              كيف تعمل {APP_NAME}؟
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              نموذج بسيط: طلب → موزّع → توصيل → عمولة.
            </p>

            <div className="mt-14 grid gap-10 sm:grid-cols-3">
              {steps.map((item, index) => (
                <div key={item.title}>
                  <p className="text-sm text-primary">الخطوة {index + 1}</p>
                  <h3 className="mt-2 font-heading text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        <section id="get-started" className="bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              جاهز للتشغيل
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              أضف متغيرات البيئة، نفّذ{" "}
              <span dir="ltr">supabase/marketplace.sql</span>، ثم ابدأ بإضافة
              الموزّعين وإسناد الطلبات.
            </p>
            <pre
              className="mt-8 overflow-x-auto rounded-xl bg-foreground px-5 py-4 text-sm text-background"
              dir="ltr"
            >
              <code>npm run dev</code>
            </pre>
          </div>
        </section>
      </main>
    </>
  );
}
