const pillars = [
  {
    title: "طلبات متناثرة… تُعالج فوراً",
    description:
      "سجّل الصفقة مرة واحدة، وأسنِدها للموزّع المناسب دون إدخال يدوي متكرر.",
  },
  {
    title: "كتالوج تشغيل بأسلوبك",
    description:
      "نظّم الموزّعين والمناطق والصفقات في لوحة واحدة تفهم واقع التوزيع.",
  },
  {
    title: "أدوات نمو مبنية للمبيعات",
    description:
      "تتبّع العمولات والصفقات المسلّمة وركّز فريقك على العلاقات لا الإدارة.",
  },
  {
    title: "رؤية لحظية للعملاء",
    description:
      "اعرف من ينتظر التوصيل، وما هي قيمة الصفقة، وأين تتحرك العمولة.",
  },
] as const;

export function PlatformPillars() {
  return (
    <section id="platform" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-semibold tracking-wide text-brand-blue">
          موثوق لدى فرق التوزيع
        </p>
        <h2 className="mt-3 max-w-3xl font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
          منصة مخصّصة لتجّار الجملة والموزّعين — لا حلول عامة.
        </h2>
        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          {pillars.map((item, index) => (
            <div
              key={item.title}
              className="animate-[fade-up_0.7s_ease-out_both] border-t border-border pt-6"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <h3 className="font-heading text-xl font-bold text-navy">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
