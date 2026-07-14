# دليل إعداد واختبار أحداث GTM وGA4 قبل النشر

هذا الدليل يشرح كيفية تجهيز Google Tag Manager، ثم اختبار كل أحداث المشروع محليًا، والتأكد من وصولها إلى Google Analytics 4 قبل نشر النسخة الجديدة في بيئة الإنتاج.

## 1. النتيجة المطلوبة

يجب أن تكون الأحداث النهائية كما يلي:

| الحدث | النوع | وقت الإرسال | البيانات الإضافية |
|---|---|---|---|
| `page_view` | تلقائي من Google tag | عند تحميل الصفحة، وعند تغير الصفحة إذا كان Enhanced Measurement مفعّلًا | بيانات الصفحة المعتادة |
| `view_home` | مخصص | عند ظهور الصفحة الرئيسية | لا يوجد |
| `view_privacy` | مخصص | عند ظهور صفحة سياسة الخصوصية | لا يوجد |
| `view_terms` | مخصص | عند ظهور صفحة شروط الاستخدام | لا يوجد |
| `click_activation` | مخصص | عند الضغط على زر التفعيل الموجود داخل قائمة الموبايل | `location: "header-mobile"` |
| `generate_lead` | مخصص وتحويل رئيسي | بعد نجاح حفظ نموذج طلب التفعيل في الخادم | `selected_plan` و`source` |

الأحداث التالية محذوفة ويجب ألا تظهر في الكود أو `dataLayer` أو GTM Preview أو GA4:

- `click_signup`
- `play_demo_video`
- `click_plan`

> `gtm.js` و`gtm.dom` و`gtm.load` أحداث نظامية ينشئها GTM بنفسه، وليست أحداثًا تسويقية خاصة بالمشروع.

## 2. أماكن إطلاق الأحداث في المشروع

### `view_home`

- المسار: `/`
- يتم إطلاقه مرة عند تركيب الصفحة الرئيسية في المتصفح.
- القيمة المتوقعة:

```js
{ event: "view_home" }
```

### `view_privacy`

- المسار: `/privacy-policy`
- القيمة المتوقعة:

```js
{ event: "view_privacy" }
```

### `view_terms`

- المسار: `/terms-of-use`
- القيمة المتوقعة:

```js
{ event: "view_terms" }
```

### `click_activation`

- المسار الذي يبدأ منه الاختبار: `/`
- يظهر داخل قائمة الموبايل.
- يتم إطلاقه قبل الانتقال إلى `/activate?source=header-mobile`.
- القيمة المتوقعة:

```js
{
  event: "click_activation",
  location: "header-mobile"
}
```

### `generate_lead`

- المسار: `/activate`
- لا يتم إطلاقه لمجرد فتح النموذج أو الضغط على زر الإرسال.
- يتم إطلاقه فقط إذا انتهى طلب `POST /api/leads` بنجاح وأعاد الخادم `{ ok: true }`.
- لا يرسل الاسم أو رقم واتساب أو نوع النشاط إلى GTM.
- القيمة المتوقعة، على سبيل المثال:

```js
{
  event: "generate_lead",
  selected_plan: "النمو",
  source: "header-mobile"
}
```

القيم الممكنة لـ`selected_plan` هي:

- `الإطلاق`
- `النمو`
- `الهيمنة`
- `General` عند عدم اختيار خطة

## 3. تجهيز نسخة GTM غير منشورة للاختبار

لا تنشر تغييرات GTM في هذه المرحلة. أنشئ Workspace أو Version جديدة واختبرها باستخدام Preview أولًا.

### 3.1 أخذ نسخة احتياطية

1. افتح الحاوية `GTM-5WFNXVRS`.
2. انتقل إلى **Admin > Export Container**.
3. صدّر النسخة المنشورة الحالية واحفظ ملف JSON للرجوع إليه عند الحاجة.
4. أنشئ Workspace واضح الاسم، مثل `analytics-cleanup-before-new-site`.

### 3.2 حذف `traffic_type=internal`

هذه القيمة ليست موجودة في ملفات المشروع؛ هي إعداد داخل Google tag في حاوية GTM.

1. افتح **Tags**.
2. افتح Google tag المرتبط بالمعرف `G-5X8G4W9VM2`.
3. افتح **Configuration settings** أو **Shared event settings** حسب واجهة GTM الظاهرة.
4. ابحث عن السطر:

```text
traffic_type = internal
```

5. احذف السطر بالكامل، وليس القيمة فقط.
6. احفظ Tag دون نشر الحاوية.

بعد الحذف يجب ألا تحتوي طلبات GA4 على `traffic_type=internal` أو `ep.traffic_type=internal`.

### 3.3 تنظيف الأحداث القديمة من Trigger

الحاوية القديمة تستمع إلى بعض الأحداث المحذوفة. افتح Custom Event Trigger المستخدم مع GA4 Event tag ثم:

1. احذف `click_signup` من التعبير.
2. احذف `click_plan` من التعبير.
3. تأكد من عدم وجود `play_demo_video` في أي Trigger آخر.
4. إذا كانت الحاوية مشتركة مع تطبيق Botifiy الرئيسي، لا تحذف أحداث التطبيق مثل `login_success` أو `connect_whatsapp` قبل التأكد من أن التطبيق لا يحتاجها.

يمكن إنشاء Trigger مستقل للموقع التسويقي باستخدام التعبير المنتظم التالي:

```regex
^(view_home|view_privacy|view_terms|click_activation|generate_lead)$
```

وفعّل خيار **Use regex matching**.

### 3.4 إنشاء Data Layer Variables

من **Variables > User-Defined Variables > New** أنشئ المتغيرات التالية بنوع **Data Layer Variable** وData Layer Version 2:

| اسم مقترح داخل GTM | Data Layer Variable Name |
|---|---|
| `DLV - location` | `location` |
| `DLV - selected_plan` | `selected_plan` |
| `DLV - source` | `source` |

متغير `location` موجود بالفعل في الحاوية الحالية، لذلك راجعه بدل إنشاء نسخة مكررة.

يمكن حذف `plan_name` و`billing_period` من إعدادات Tag الخاصة بالموقع التسويقي بعد التأكد من أن أي تطبيق آخر يستخدم الحاوية نفسها لا يعتمد عليهما.

### 3.5 إعداد GA4 Event tag

استخدم GA4 Event tag بحيث تكون الإعدادات:

- Measurement ID: `G-5X8G4W9VM2`
- Event Name: متغير الحدث المدمج `{{Event}}`
- Trigger: الـCustom Event Trigger الذي يحتوي الأحداث الخمسة المخصصة

أضف Event Parameters:

| Parameter Name | Value |
|---|---|
| `location` | `{{DLV - location}}` |
| `selected_plan` | `{{DLV - selected_plan}}` |
| `source` | `{{DLV - source}}` |

في الأحداث التي لا تحتوي أحد هذه المتغيرات، يجب ألا تُرسل قيمة قديمة من حدث سابق. افحص القيم في GTM Preview لكل حدث. إذا لاحظت بقاء قيمة قديمة، استخدم Tags منفصلة أو Parameters مخصصة لكل نوع حدث.

## 4. تشغيل المشروع محليًا

من مجلد المشروع:

```bash
npm install
npm run dev
```

ثم افتح:

```text
http://localhost:3000
```

إذا كان المنفذ 3000 مستخدمًا، استخدم الرابط الذي يعرضه Next.js في الطرفية.

لاختبار `generate_lead` يجب أن تكون متغيرات Supabase في `.env` صحيحة. Google Sheets اختياري ولا يمنع نجاح الطلب إذا كان Supabase يعمل.

استخدم بيانات اختبار واضحة، مثل اسم يبدأ بكلمة `TEST`، ولا تستخدم رقم عميل حقيقي. إذا كانت البيئة المحلية مرتبطة بقاعدة الإنتاج، احذف سجل الاختبار بعد الانتهاء.

## 5. مراقبة `dataLayer` من أدوات المطور

افتح Chrome DevTools ثم تبويب **Console** ونفّذ:

```js
window.dataLayer
```

لعرض الأحداث فقط:

```js
window.dataLayer.filter(
  (item) => item && typeof item === "object" && "event" in item,
)
```

للبحث عن حدث بعينه:

```js
window.dataLayer.filter((item) => item?.event === "generate_lead")
```

يمكن مراقبة أي `push` جديد مباشرة أثناء بقاء الصفحة مفتوحة:

```js
const originalDataLayerPush = window.dataLayer.push.bind(window.dataLayer)

window.dataLayer.push = (...items) => {
  console.log("dataLayer.push", ...items)
  return originalDataLayerPush(...items)
}
```

هذا التغيير مؤقت داخل جلسة المتصفح ويختفي عند تحديث الصفحة.

## 6. ربط GTM Preview بالمشروع المحلي

1. من GTM اضغط **Preview**.
2. أدخل رابط المشروع المحلي، مثل `http://localhost:3000`.
3. فعّل خيار تضمين Debug Signal إذا ظهر.
4. اضغط **Connect**.
5. تأكد أن نافذة الموقع تعرض علامة اتصال Tag Assistant.
6. اترك نافذة Tag Assistant مفتوحة أثناء تنفيذ الاختبارات.

لكل حدث يجب فحص ثلاثة أقسام:

- **Data Layer**: اسم الحدث والبيانات المرسلة من الكود.
- **Tags Fired**: يجب أن يظهر GA4 Event tag.
- **Tags Not Fired**: استخدمها لتشخيص شرط Trigger إذا لم يعمل Tag.

## 7. اختبار كل حدث خطوة بخطوة

### 7.1 اختبار `view_home`

1. افتح `/` مباشرة أو حدّث الصفحة تحديثًا كاملًا.
2. في Tag Assistant ابحث عن `view_home`.
3. افتح تبويب Data Layer وتأكد أن الكائن يحتوي `event: "view_home"`.
4. تأكد أن GA4 Event tag ظهر في Tags Fired.
5. تأكد أن `page_view` التلقائي موجود بشكل منفصل ولا يتم استخدامه بدل `view_home`.

في وضع `next dev` قد يشغّل React بعض Effects مرتين أثناء التطوير للمساعدة في اكتشاف المشكلات. للحكم على التكرار النهائي، أعد الاختبار في وضع البناء الشبيه بالإنتاج الموضح لاحقًا.

### 7.2 اختبار `view_privacy`

1. افتح `/privacy-policy` مباشرة.
2. تأكد من ظهور `view_privacy` في Data Layer وTag Assistant.
3. تأكد أن GA4 Event tag يعمل مرة واحدة في وضع الإنتاج المحلي.
4. تأكد أن الحدث لا يحمل `location` أو `selected_plan` أو `source` من حدث سابق.

### 7.3 اختبار `view_terms`

1. افتح `/terms-of-use` مباشرة.
2. تأكد من ظهور `view_terms`.
3. تأكد أن GA4 Event tag يعمل.
4. تأكد من عدم وجود Parameters قديمة ملتصقة بالحدث.

### 7.4 اختبار `click_activation` على الموبايل

1. افتح الصفحة الرئيسية.
2. من DevTools فعّل Device Toolbar واختر شاشة عرض أقل من `768px`.
3. من تبويب Network فعّل **Preserve log** حتى لا تضيع السجلات بعد الانتقال.
4. افتح زر القائمة ذي أيقونة الثلاثة خطوط.
5. اضغط زر **اطلب تفعيل بوتيفاي** الموجود داخل القائمة المفتوحة، وليس زر التفعيل الظاهر في رأس الصفحة خارج القائمة.
6. تأكد أن الرابط انتقل إلى:

```text
/activate?source=header-mobile
```

7. في Tag Assistant تأكد من ظهور:

```js
{
  event: "click_activation",
  location: "header-mobile"
}
```

8. تأكد أن GA4 Event tag يعمل على الحدث.
9. كرر الاختبار مرة واحدة فقط وتأكد أن كل ضغطة تنتج حدثًا واحدًا.

### 7.5 اختبار `generate_lead`

1. افتح أحد الروابط التالية لاختبار الخطة والمصدر:

```text
/activate?plan=growth&source=header-mobile
```

أو:

```text
/activate?plan=launch&utm_source=manual-test
```

2. افتح Network وفعّل Preserve log.
3. املأ كل الحقول الإلزامية ببيانات اختبار صالحة.
4. اضغط زر إرسال الطلب.
5. ابحث في Network عن `POST /api/leads`.
6. يجب أن تكون الاستجابة ناجحة ويكون جسمها متضمنًا `ok: true`.
7. يجب أن تظهر رسالة نجاح النموذج.
8. بعد نجاح الخادم فقط، ابحث في Tag Assistant عن `generate_lead`.
9. عند استخدام `plan=growth&source=header-mobile` يجب أن تكون القيم:

```js
{
  event: "generate_lead",
  selected_plan: "النمو",
  source: "header-mobile"
}
```

10. تأكد أن GA4 Event tag يعمل مرة واحدة.
11. تأكد أن الاسم ورقم واتساب وبقية بيانات النموذج غير موجودة في Data Layer أو طلب GA4.

### 7.6 اختبار فشل النموذج

هذا الاختبار يضمن ألا تُسجل Leads غير محفوظة:

1. أرسل نموذجًا ناقصًا أو اجعل طلب `/api/leads` يفشل في بيئة اختبار آمنة.
2. تأكد من ظهور رسالة الخطأ المناسبة.
3. تأكد من عدم ظهور `generate_lead` في Tag Assistant.
4. تأكد من عدم إرسال GA4 Event لهذا الطلب.

## 8. اختبارات سلبية للأحداث المحذوفة

نفذ الإجراءات التالية وتأكد أن الأحداث القديمة لا تظهر:

| الإجراء | ما يجب ألا يظهر |
|---|---|
| الضغط على أزرار التفعيل العادية في Hero أو FAQ أو الأقسام الأخرى | `click_signup` |
| تشغيل الفيديو التعريفي | `play_demo_video` |
| الضغط على أي خطة سعرية | `click_plan` |

داخل Console نفّذ:

```js
window.dataLayer.filter((item) =>
  ["click_signup", "play_demo_video", "click_plan"].includes(item?.event),
)
```

النتيجة المتوقعة:

```js
[]
```

وابحث عن الأسماء الثلاثة داخل GTM Workspace وتأكد أنها غير موجودة في Triggers أو Tags الخاصة بالموقع التسويقي.

## 9. فحص طلبات GA4 من Network

في DevTools افتح Network وابحث باستخدام أحد الفلاتر:

```text
collect
```

أو:

```text
g/collect
```

افتح طلب GA4 وتحقق من:

- `tid` يساوي `G-5X8G4W9VM2`.
- اسم الحدث ظاهر في `en`، مثل `en=generate_lead`.
- `click_activation` يحتوي `location=header-mobile`، وغالبًا يظهر باسم `ep.location`.
- `generate_lead` يحتوي `selected_plan` و`source`، وغالبًا يظهران مع بادئة `ep.`.
- لا يوجد الاسم أو رقم واتساب أو أي بيانات شخصية.
- لا توجد القيمة `traffic_type=internal` في Query String أو Payload.

إذا ظهر الحدث في Data Layer ولم يظهر طلب Network، فالمشكلة في GTM Trigger أو Tag.

إذا ظهر طلب Network ولم يظهر الحدث داخل GA4 DebugView، افحص Measurement ID و`debug_mode` وفلترات GA4.

## 10. التحقق داخل GA4 DebugView

1. افتح GA4 Property المرتبطة بـ`G-5X8G4W9VM2`.
2. انتقل إلى **Admin > DebugView**.
3. ابدأ جلسة GTM Preview ونفذ الأحداث واحدة تلو الأخرى.
4. انتظر قليلًا ثم تأكد من ظهور:

```text
view_home
view_privacy
view_terms
click_activation
generate_lead
```

5. افتح `click_activation` وتأكد من `location = header-mobile`.
6. افتح `generate_lead` وتأكد من `selected_plan` و`source`.
7. تأكد من عدم ظهور الأحداث القديمة.
8. تأكد أن الأحداث لا تحمل `traffic_type = internal`.

بعد نجاح الاختبارات، اجعل `generate_lead` فقط Key Event من **Admin > Events/Key events** إذا كان الهدف هو قياس طلبات التفعيل المكتملة. لا تعتبر `click_activation` تحويلًا مكتملًا؛ هو مجرد ضغط على زر.

إذا كنت تحتاج استخدام `location` أو `selected_plan` أو `source` في التقارير والاستكشافات، أنشئ لها Event-scoped Custom Dimensions داخل GA4.

## 11. اختبار نسخة محلية شبيهة بالإنتاج

بعد نجاح الاختبار في وضع التطوير، أوقف الخادم ثم شغّل:

```bash
npm run build
npm run start
```

أعد الاختبارات الخمسة الأساسية. هذه المرحلة مهمة للتأكد من:

- عدم تكرار أحداث `view_*` بسبب سلوك التطوير.
- عمل التنقل بين صفحات Next.js بعد البناء.
- عدم وجود أخطاء TypeScript أو Build.
- عمل نموذج التفعيل وحدث `generate_lead` بعد البناء.

## 12. أوامر فحص الكود قبل النشر

شغّل:

```bash
npm run lint
npm run build
```

ثم تأكد أن الأحداث المحذوفة غير موجودة في المصدر:

```bash
rg -n "click_signup|play_demo_video|click_plan" src
```

النتيجة الصحيحة: لا توجد نتائج.

وتأكد من الأحداث الحالية:

```bash
rg -n "view_home|view_privacy|view_terms|click_activation|generate_lead" src
```

## 13. قائمة القبول النهائية قبل النشر

- [ ] لا توجد مراجع لـ`click_signup` في `src`.
- [ ] لا توجد مراجع لـ`play_demo_video` في `src`.
- [ ] لا توجد مراجع لـ`click_plan` في `src`.
- [ ] `view_home` يصل إلى GTM وGA4.
- [ ] `view_privacy` يصل إلى GTM وGA4.
- [ ] `view_terms` يصل إلى GTM وGA4.
- [ ] زر قائمة الموبايل يرسل `click_activation` مرة واحدة.
- [ ] `click_activation` يحمل `location=header-mobile`.
- [ ] نجاح النموذج يرسل `generate_lead` مرة واحدة.
- [ ] فشل النموذج لا يرسل `generate_lead`.
- [ ] `generate_lead` يحمل `selected_plan` و`source` الصحيحين.
- [ ] لا تصل أي بيانات شخصية إلى GTM أو GA4.
- [ ] لا يوجد `traffic_type=internal` في طلبات GA4.
- [ ] Measurement ID في الطلبات هو `G-5X8G4W9VM2`.
- [ ] `generate_lead` مضبوط كـKey Event داخل GA4.
- [ ] `npm run lint` ينجح.
- [ ] `npm run build` ينجح.
- [ ] كل الاختبارات تنجح في `npm run start`، وليس في وضع التطوير فقط.

## 14. ترتيب النشر المقترح

1. احتفظ برقم آخر GTM Version يعمل حاليًا.
2. أكمل GTM Preview على المشروع المحلي.
3. اختبر Build محليًا باستخدام `npm run build` و`npm run start`.
4. جهز GTM Version الجديدة دون نشر مبكر.
5. انشر GTM Version الجديدة والمشروع الجديد في نافذة زمنية متقاربة.
6. بعد النشر افتح الموقع الحقيقي في GTM Preview وأعد Smoke Test للأحداث الخمسة.
7. تحقق من Network وGA4 DebugView وRealtime.
8. إذا فشل حدث أساسي، ارجع إلى GTM Version السابقة وإصدار الموقع السابق حتى يتم تشخيص السبب.

بهذا الترتيب يكون التحقق قد تم على مستوى الكود، وData Layer، وGTM، وطلبات الشبكة، ثم GA4 نفسه قبل اعتماد النسخة الجديدة.
