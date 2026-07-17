const stats = [
  { value: "5%", label: "عمولة تلقائية من كل صفقة" },
  { value: "24/7", label: "متابعة حالات التوصيل" },
  { value: "1", label: "لوحة لكل الموزّعين والصفقات" },
  { value: "0", label: "حاجة لأسطول داخلي" },
] as const;

export function GrowthStats() {
  return (
    <section id="growth" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-3xl font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
          هذه الأرقام لا تكذب.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          هكذا يبدو التوزيع عندما تتوقف عن إضاعة الوقت على الأعمال الروتينية
          وتبدأ بالتركيز على نمو العمل.
        </p>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t border-border pt-5">
              <p className="font-heading text-4xl font-extrabold text-brand-blue sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
