# مد (bAI)

منصة توزيع: **الموزّع الموجود يستلم الطلب ويوصله**، و**مد تأخذ عمولة من كل صفقة**.

مبنية على Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Supabase.

## نموذج العمل

1. عبر **bAI** يُسجَّل الطلب ويُسند لموزّع
2. **الموزّع الموجود** يستلم الطلب ويوصله للعميل
3. **مد** تحتسب عمولة تلقائية (افتراضياً 5%) من قيمة كل صفقة

## المزايا

- مصادقة Supabase مع حماية `/dashboard` و `/orders` و `/distributors`
- **لوحة إدارة** `/admin` لكل الصفقات والموزّعين وعمولات المنصة
- إدارة الموزّعين والصفقات وعمولة مد
- رفع فواتير اختياري (`/upload`) مع استخراج بالذكاء الاصطناعي
- RLS بحيث يرى كل مستخدم بياناته فقط
- إشعار خصوصية البيانات

## البنية

```text
app/
  dashboard/ orders/ distributors/ upload/
  login/ signup/ privacy/
components/
  marketplace/ auth/ invoices/ ...
supabase/
  schema.sql        # invoices + storage
  marketplace.sql   # distributors + deals + commission
```

## الإعداد المحلي

```bash
cp .env.example .env.local
npm install
```

املأ `.env.local` ثم في Supabase SQL Editor نفّذ بالترتيب:

1. `supabase/schema.sql`
2. `supabase/marketplace.sql`
3. `supabase/admin.sql`

رقِّ حسابك إلى مدير:

```sql
update public.profiles set role = 'admin' where email = 'your@email.com';
```

وأضف نفس البريد في `ADMIN_EMAILS` داخل `.env.local`.

```bash
npm run dev
```

## مسار الاستخدام

1. سجّل دخولاً
2. أضف موزّعاً من `/distributors`
3. أنشئ طلباً من `/orders` وأسنِده للموزّع
4. حدّث الحالة: بدء التوصيل → تم التسليم
5. راقب عمولة مد من لوحة التحكم
6. إن كنت مديراً: افتح `/admin` لمتابعة كل المنصة

## نشر Vercel

راجع قسم النشر في النسخة السابقة من الدليل: أضف متغيرات البيئة، حدّث Auth URLs في Supabase، ونفّذ سكربتات SQL على مشروع الإنتاج.
