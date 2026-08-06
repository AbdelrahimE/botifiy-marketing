# إعداد صفحة طلب تفعيل بوتيفاي

## 1. Supabase

نفّذ ملف `supabase/migrations/202607130001_create_leads.sql` مرة واحدة من Supabase SQL Editor.
ثم نفّذ `supabase/migrations/202608050001_add_lead_attribution_and_consent.sql` قبل نشر
نسخة الموقع التي تحتوي Meta Pixel وConversions API.
المشروع يستخدم `SUPABASE_URL` و`SUPABASE_ANON_KEY` الموجودين بالفعل في `.env`، ولا يحتاج إلى Service Role Key.

التصميم الأمني يعتمد على:

- تفعيل RLS وForce RLS على جدول `leads`.
- منع أي وصول مباشر للجدول من `anon` و`authenticated`.
- السماح فقط بتنفيذ RPC باسم `submit_lead`، وفيها validation وsanitization وrate limiting وidempotency.

### بوابة التحقق من واتساب قبل الحفظ

قبل `submit_lead` يستدعي الخادم Edge Function باسم `qualify-lead-whatsapp`. هذه
الدالة لا تستخدم endpoint فحص منفصل؛ بل ترسل رسالة الترحيب نفسها عبر Botifiy،
والبنية التحتية تتحقق من تسجيل الرقم على WhatsApp قبل الإرسال. لا يستمر الحفظ أو
Meta CAPI أو Google Sheets إلا بعد نجاح الإرسال ووجود `whatsappMessageId`.

لا تضيف البوابة أي Widget أو خطوة مرئية إلى الفورم، ولا تحتاج Secret جديدًا في
مشروع التسويق. يستدعي الخادم الدالة باستخدام `SUPABASE_ANON_KEY` الموجود أصلًا؛
وهو مفتاح عام وليس Botifiy API Key أو Service Role Key.

المتغيرات السرية الموجودة مسبقًا داخل Supabase وتستخدمها الدالة:

- `SUPABASE_SERVICE_ROLE_KEY`
- `LEAD_WHATSAPP_MESSAGE_TEMPLATE_BASE64`
- إعدادات مرسل Botifiy الحالية أو القيم المخزنة في `app_settings`
- `tenant_api_key` المخزن في `botifiy_tenant_credentials`

انشر الدالتين بعد تحديث مشروع Supabase؛ الثانية تغير مفتاح منع التكرار ليعتمد على
`submissionKey` والرقم معًا، وبذلك يستطيع Trigger تحديث أعمدة حالة الرسالة دون
إرسالها مرة ثانية، مع السماح للعميل بتصحيح الرقم الخاطئ في المحاولة التالية:

```bash
supabase functions deploy qualify-lead-whatsapp
supabase functions deploy send-lead-whatsapp --no-verify-jwt
```

الدالة مضبوطة على `verify_jwt = true` وتقبل payload محدودًا ورسالة ثابتة من داخل
Edge Function فقط. كما تطبق حد الرقم الموجود قبل الإرسال، وتبقى حدود Botifiy API
فعالة. إذا كان الرقم غير مسجل تعود `422` قبل الحفظ. أما تعطل الفحص أو انقطاع
المثيل أو بقاء الإرسال في حالة processing فيعود `503` ولا يُصنّف الرقم على أنه
خاطئ.

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
- `meta_sent`
- `meta_skipped`
- `meta_skipped_no_consent`
- `meta_failed`
- `whatsapp_qualified`
- `whatsapp_not_registered`
- `whatsapp_unavailable`

لا تُكتب أسماء العملاء أو أرقامهم في logs.

## 5. Meta Pixel وConversions API

> **ملاحظة للمطورين — قرار المنتج بتاريخ 5 أغسطس 2026:** واجهة الموافقة محفوظة
> بالكامل لكنها معطلة حاليًا عبر `CONSENT_UI_ENABLED = false` لأن الحملات في هذه
> المرحلة تستهدف الدول العربية فقط، ولتجنب إضافة خطوة تعطل رحلة الـLead. في هذا
> الوضع تعمل التحليلات وMeta افتراضيًا. لا تحذف كود الموافقة؛ غيّر المفتاح إلى
> `true` إذا تغير نطاق الاستهداف أو المتطلبات القانونية أو سياسة المنتج.

أضف متغيرات البيئة التالية في بيئة النشر. لا تضع Access Token داخل متغير يبدأ
بـ`NEXT_PUBLIC_` ولا داخل GTM:

```env
NEXT_PUBLIC_META_PIXEL_ID=1387649563296613
META_PIXEL_ID=1387649563296613
META_CAPI_ACCESS_TOKEN=ضع_التوكن_الصادر_من_Events_Manager
META_GRAPH_API_VERSION=v25.0
```

أثناء الاختبار فقط، أضف `META_TEST_EVENT_CODE` من شاشة Test Events. احذفه قبل
تشغيل الحملات الفعلية حتى لا تظل أحداث الإنتاج موسومة كأحداث اختبار.

يتم إرسال حدث `Lead` من الخادم بعد نجاح Supabase. وإذا أُعيد تفعيل بوابة الموافقة
لاحقًا، فلن يُرسل الحدث إلا عند السماح بقياس الإعلانات.
يستخدم الخادم والمتصفح نفس `leadId` كـ`event_id` لمنع ازدواج الحدث.
