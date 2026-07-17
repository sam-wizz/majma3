import Link from "next/link";

import { DataPrivacyNotice } from "@/components/privacy/data-privacy-notice";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

export default function PrivacyPage() {
  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-16">
        <div className="space-y-3">
          <p className="font-heading text-sm font-semibold tracking-wide text-primary">
            {APP_NAME}
          </p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight">
            الخصوصية والأمان
          </h1>
          <p className="text-muted-foreground">
            كيف نعالج بيانات الفواتير ونحمي وصول المستخدمين في منصة {APP_NAME}.
          </p>
        </div>

        <DataPrivacyNotice />

        <section className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            الضوابط الأمنية
          </h2>
          <ul className="list-disc space-y-2 pr-5">
            <li>
              مفاتيح API تُخزَّن فقط في متغيرات البيئة على الخادم (
              <span dir="ltr">.env.local</span> / Vercel Environment Variables).
            </li>
            <li>
              سياسات Row Level Security في Supabase تمنع قراءة أو تعديل فواتير
              المستخدمين الآخرين.
            </li>
            <li>
              مسارات <span dir="ltr">/dashboard</span> و{" "}
              <span dir="ltr">/upload</span> محمية عبر جلسة المصادقة.
            </li>
            <li>
              ملفات التخزين غير عامة، ومسار كل ملف يبدأ بمعرّف المستخدم.
            </li>
          </ul>
        </section>

        <Button render={<Link href="/dashboard" />}>العودة للوحة التحكم</Button>
      </div>
    </div>
  );
}
