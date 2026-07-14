# إعداد صفحة طلب تفعيل بوتيفاي

## 1. Supabase

نفّذ ملف `supabase/migrations/202607130001_create_leads.sql` مرة واحدة من Supabase SQL Editor.
المشروع يستخدم `SUPABASE_URL` و`SUPABASE_ANON_KEY` الموجودين بالفعل في `.env`، ولا يحتاج إلى Service Role Key.

التصميم الأمني يعتمد على:

- تفعيل RLS وForce RLS على جدول `leads`.
- منع أي وصول مباشر للجدول من `anon` و`authenticated`.
- السماح فقط بتنفيذ RPC باسم `submit_lead`، وفيها validation وsanitization وrate limiting وidempotency.

## 2. Google Sheets

1. أنشئ Google Sheet ثم انسخ المعرّف الموجود بين `/d/` و`/edit` في الرابط.
2. من Extensions > Apps Script، انسخ محتوى `integrations/google-apps-script.gs`.
3. من Project Settings > Script properties أضف:
   - `SPREADSHEET_ID`: معرّف الملف.
   - `SHEET_NAME`: اسم الصفحة، مثل `Leads` (اختياري).
   - `WEBHOOK_SECRET`: قيمة عشوائية طويلة.
4. اختر Deploy > New deployment > Web app، وشغّله بصلاحياتك واجعل الوصول `Anyone`.
5. أضف في بيئة النشر الخاصة بالموقع:

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
GOOGLE_SHEETS_WEBHOOK_SECRET=نفس_القيمة_العشوائية
```

لا يتم استدعاء Sheets إلا بعد نجاح Supabase. فشل Sheets يظهر في logs باسم
`google_sheets_failed` ولا يحوّل الطلب المحفوظ إلى فشل أمام العميل.

## 3. Cloudflare

لا يحتاج اكتشاف الدولة إلى إعداد إضافي. الصفحة تقرأ `CF-IPCountry` تلقائياً وتستخدم مصر
كقيمة احتياطية في التطوير المحلي. عنوان IP يُقرأ من `CF-Connecting-IP` ثم يُحفظ من الخادم.

## 4. Logs

كل سجلات المسار `/api/leads` بصيغة JSON وتحمل `service: "lead-capture"` مع أحداث واضحة:

- `supabase_saved`
- `supabase_failed`
- `google_sheets_synced`
- `google_sheets_failed`
- `validation_failed`
- `rate_limited`
- `honeypot_triggered`

لا تُكتب أسماء العملاء أو أرقامهم في logs.

