# bAI

منصة SaaS لرفع الفواتير واستخراج بياناتها بالذكاء الاصطناعي، مبنية على Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Supabase.

## المزايا

- مصادقة Supabase (تسجيل / دخول) مع حماية `/dashboard` و `/upload`
- رفع صور وملفات PDF إلى Supabase Storage
- استخراج: التاريخ، الإجمالي، اسم المورد، وقائمة البنود عبر OpenAI
- لوحة تحكم تعرض الفواتير في جدول
- RLS بحيث يرى كل مستخدم فواتيره فقط
- إشعار خصوصية البيانات

## البنية

```text
app/
  login/ signup/ dashboard/ upload/ privacy/
  actions/          # Server Actions
components/
  auth/ invoices/ privacy/ layout/ ui/
lib/
  supabase/ ai/ auth.ts env.ts
supabase/schema.sql # جدول invoices + سياسات RLS + Storage
types/
proxy.ts            # حماية المسارات وتحديث الجلسة (Next.js 16)
```

## الإعداد المحلي

### 1) المتغيرات البيئية

```bash
cp .env.example .env.local
```

املأ القيم في `.env.local`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=sk-your-openai-key
```

### 2) قاعدة بيانات Supabase

1. أنشئ مشروعاً في [Supabase](https://supabase.com)
2. افتح SQL Editor
3. نفّذ محتويات الملف `supabase/schema.sql`
4. تأكد من وجود bucket باسم `invoices` (ينشئه السكربت)

### 3) التشغيل

```bash
npm install
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000).

## قائمة نشر Vercel (إنتاج)

1. **ادفع الكود إلى GitHub** وتأكد أن الفرع جاهز للدمج.
2. **Import المشروع في Vercel** واختر إطار Next.js.
3. **أضف Environment Variables** في Vercel (Production + Preview):
   - `NEXT_PUBLIC_APP_URL` = `https://your-domain.vercel.app`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
4. **حدّث URL في Supabase Auth**:
   - Authentication → URL Configuration
   - Site URL = رابط Vercel
   - Redirect URLs أضف `https://your-domain.vercel.app/**`
5. **تأكد من تنفيذ `supabase/schema.sql`** على مشروع الإنتاج (RLS + Storage).
6. **عطّل Email confirmations مؤقتاً** أثناء التجربة إن لزم (Auth → Providers → Email)، أو أبقِها مفعّلة واختبر تدفق التأكيد.
7. **Deploy** ثم افتح الموقع وجرّب:
   - إنشاء حساب / دخول
   - رفع فاتورة
   - ظهور الصف في `/dashboard`
8. **تحقق أمني سريع**:
   - لا يوجد `SERVICE_ROLE` في متغيرات `NEXT_PUBLIC_*`
   - مستخدم A لا يرى فواتير مستخدم B
   - صفحة `/privacy` تعرض إشعار الخصوصية
9. **اختياري للإنتاج**: اربط نطاقاً مخصصاً، فعّل HTTPS (افتراضي في Vercel)، راقب السجلات والأخطاء.

## أوامر مفيدة

| الأمر | الوصف |
| --- | --- |
| `npm run dev` | تطوير |
| `npm run build` | بناء إنتاج |
| `npm run start` | تشغيل البناء |
| `npm run lint` | ESLint |

## ملاحظات أمنية

- لا تضع مفاتيح OpenAI أو service role في الكود أو في متغيرات `NEXT_PUBLIC_*`.
- التطبيق يستخدم جلسة المستخدم + RLS للكتابة/القراءة.
- معالجة الذكاء الاصطناعي تتم على الخادم عبر Server Actions فقط.
