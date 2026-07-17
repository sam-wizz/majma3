import { ShieldCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function DataPrivacyNotice() {
  return (
    <Alert className="border-primary/20 bg-accent/40">
      <ShieldCheck />
      <AlertTitle>إشعار خصوصية البيانات</AlertTitle>
      <AlertDescription className="space-y-2 text-muted-foreground">
        <p>
          تتم معالجة فواتيرك بشكل آمن: تُخزَّن الملفات في Supabase Storage ضمن مجلد
          خاص بحسابك، وتُحفظ البيانات المستخرجة في جدول{" "}
          <span dir="ltr">invoices</span> مع تفعيل Row Level Security بحيث لا يرى أي
          مستخدم فواتير غيره.
        </p>
        <p>
          تُرسل نسخة من الملف إلى مزوّد الذكاء الاصطناعي (OpenAI) فقط لغرض استخراج
          الحقول المطلوبة (التاريخ، الإجمالي، المورد، البنود)، ولا تُشارك مفاتيحك
          السرية مع المتصفح — تبقى في متغيرات البيئة على الخادم.
        </p>
        <p>
          يمكنك طلب حذف بياناتك عبر التواصل مع الدعم. راجع أيضاً صفحة{" "}
          <a href="/privacy" className="underline underline-offset-4">
            سياسة الخصوصية
          </a>
          .
        </p>
      </AlertDescription>
    </Alert>
  );
}
