import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/marketing/hero";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    title: "مصادقة Supabase",
    description: "تسجيل دخول وإنشاء حساب مع حماية مسارات اللوحة والرفع.",
  },
  {
    title: "تحليل الفواتير",
    description:
      "استخراج التاريخ والإجمالي والمورد والبنود عبر الذكاء الاصطناعي.",
  },
  {
    title: "أمان وخصوصية",
    description:
      "مفاتيح في متغيرات البيئة، وRLS بحيث ترى فقط فواتيرك أنت.",
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
              ماذا تفعل المنصة؟
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              من الرفع إلى لوحة التحكم — مسار كامل لمعالجة الفواتير بأمان.
            </p>

            <div className="mt-14 grid gap-10 sm:grid-cols-3">
              {features.map((item) => (
                <div key={item.title}>
                  <h3 className="font-heading text-lg font-semibold tracking-tight">
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
              ابدأ خلال دقائق
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              أضف متغيرات البيئة، نفّذ مخطط Supabase، ثم شغّل المشروع محلياً أو
              انشره على Vercel.
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
