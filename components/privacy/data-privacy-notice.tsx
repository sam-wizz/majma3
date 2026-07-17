import { ShieldCheck } from "lucide-react";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function DataPrivacyNotice() {
  return (
    <Alert className="border-primary/20 bg-accent/40">
      <ShieldCheck />
      <AlertTitle>إشعار خصوصية البيانات</AlertTitle>
      <AlertDescription className="space-y-2 text-muted-foreground">
        <p>
          بيانات الموزّعين والصفقات والفواتير تُحفظ في Supabase مع Row Level
          Security، بحيث يرى كل مستخدم سجلاته فقط — والمديرون المصرّح لهم فقط
          يطّلعون على لوحة الإدارة.
        </p>
        <p>
          عند رفع فاتورة، تُرسل نسخة إلى OpenAI لاستخراج الحقول المطلوبة فقط،
          وتبقى مفاتيح API على الخادم داخل متغيرات البيئة.
        </p>
        <p>
          لمزيد من التفاصيل راجع{" "}
          <Link href="/privacy" className="underline underline-offset-4">
            سياسة الخصوصية
          </Link>
          .
        </p>
      </AlertDescription>
    </Alert>
  );
}
