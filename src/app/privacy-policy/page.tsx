'use client';

import { useEffect } from "react";
import Script from "next/script";
import { trackViewPrivacy } from "@/lib/gtm";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    trackViewPrivacy();
  }, []);

  return (
    <>
      {/* Breadcrumb Schema - Structured Data */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'الرئيسية',
                item: 'https://botifiy.com'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'سياسة الخصوصية',
                item: 'https://botifiy.com/privacy-policy'
              }
            ]
          })
        }}
      />

      <div className="legal-page flex min-h-screen flex-col">
        <Header />
      <main className="legal-main flex-1 px-4 md:px-6">
        <article className="legal-document mx-auto max-w-5xl">
          <header className="legal-document-header">
          <span className="legal-eyebrow">الخصوصية وحماية البيانات</span>
          <h1 className="legal-title">
            سياسة الخصوصية لمنصة بوتيفاي
          </h1>
          <p className="legal-updated-at">
            آخر تحديث: 7 يوليو 2025
          </p>
          </header>
          <p className="legal-intro">
            <strong>مهم:</strong> نُقدِّم هذه السياسة بصيغة مبسَّطة تُساعدك
            على معرفة كيف نتعامل مع بياناتك. يُرجى قراءتها بعناية، وإذا كان
            لديك أي استفسار تواصل معنا عبر الواتساب الرسمي&nbsp;
            <a
              href="https://wa.me/201098169094"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              201098169094
            </a>
          </p>
          <hr />

          <div className="legal-content">
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. من نحن</h2>
              <p>
                بوتيفاي هي منصة SaaS متخصّصة في أتمتة التسويق وخدمة العملاء عبر
                واتساب. نعتمد على مكتبة Baileys للتكامل مع واتساب ( غير الرسمية )
                بهدف خفض التكلفة وتسهيل الإعداد، مع الالتزام بأعلى معايير الأمان
                لحماية بياناتك وبيانات عملائك.
              </p>
            </div>

            <hr className="my-8" />

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                2. ما البيانات التي نجمعها؟
              </h2>
              <ul className="space-y-4 list-disc list-inside">
                <li>
                  <strong>بيانات الحساب:</strong> تشمل الاسم، البريد الإلكتروني،
                  رقم الهاتف، كلمة المرور (بشكل مشفّر)، وخطة الاشتراك. نستخدم
                  هذه البيانات لإنشاء حسابك وتقديم الخدمة لك بشكل كامل.
                </li>
                <li>
                  <strong>بيانات واتساب:</strong> مثل أرقام واتساب التي قمت
                  بربطها، محتوى الرسائل (نصوص، صور، حالة)، ومعرفات جهات
                  الاتصال. تُستخدم لتشغيل الأتمتة، الردود التلقائية، الحملات،
                  وتحليل المشاعر.
                </li>
                <li>
                  <strong>بيانات الاستخدام:</strong> مثل سجلات الدخول، الصفحات
                  التي تزورها داخل المنصة، نوع المتصفح، عنوان الـ IP، وأداء
                  النظام. نستخدمها لتحسين الخدمة، مراقبة الأداء، واكتشاف
                  النشاطات المشبوهة أو الاحتيالية.
                </li>
                <li>
                  <strong>بيانات الدفع:</strong> نقوم بتخزين معرف معاملات الدفع،
                  وآخر 4 أرقام من بطاقتك، وحالة الدفع فقط. تُستخدم لمعالجة
                  المدفوعات وإصدار الفواتير.
                </li>
                <li>
                  <strong>ملفات الدعم:</strong> مثل لقطات الشاشة أو سجلات
                  الأخطاء التي ترسلها لنا أثناء طلب الدعم. نستخدمها لمساعدتك
                  بشكل أسرع في حال واجهتك مشكلة فنية.
                </li>
              </ul>
              <p className="legal-note legal-note-neutral">
                <strong>ملاحظة:</strong> رسائل واتساب يتم نقلها عبر تشفيرٍ من
                طرف إلى طرف (E2EE). نقوم بفك تشفير الرسائل على الخادم فقط
                لاستخدامها في الأتمتة والتحليلات ثم نخزّن المحتوى الضروري أو
                التحليلات المشتقّة في قاعدة البيانات. يمكنك حذف أي رسالة أو
                محادثة متى شئت.
              </p>
            </div>
            <hr className="my-8" />

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                3. كيف نستخدم بياناتك؟
              </h2>
              <ol className="space-y-2 list-decimal list-inside">
                <li>
                  <strong>تقديم الخدمة:</strong> تشغيل الردود التلقائية، الحملات،
                  التحليلات، وخدمات الأتمتة.
                </li>
                <li>
                  <strong>تحسين المنتج:</strong> تحليل استخدام المنصة وحلّ
                  الأخطاء وتطوير ميزات جديدة.
                </li>
                <li>
                  <strong>الأمان:</strong> اكتشاف النشاطات المشبوهة ومنع إساءة
                  الاستخدام والاحتيال.
                </li>
                <li>
                  <strong>الاتصالات:</strong> إرسال إشعارات النظام، تنبيهات
                  الاستخدام، ورسائل التسويق المسموح بها.
                </li>
                <li>
                  <strong>الالتزامات القانونية:</strong> الامتثال للأنظمة (مثل
                  GDPR، قانون حماية البيانات المصري، وقوانين الخصوصية الخليجية).
                </li>
              </ol>
            </div>
            <hr className="my-8" />

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                4. مع من نشارك بياناتك؟
              </h2>
              <ul className="space-y-4 list-disc list-inside">
                <li>
                  <strong>Supabase:</strong> نستخدمه لاستضافة قاعدة البيانات
                  وتخزين الملفات الخاصة بك بشكل آمن. جميع البيانات يتم تشفيرها
                  باستخدام AES-256 ويتم نقلها عبر اتصال آمن (HTTPS).
                </li>
                <li>
                  <strong>مزودو الدفع (مثل Stripe أو PayPal):</strong> نشارك معهم
                  بيانات الدفع الضرورية فقط بهدف معالجة المدفوعات وتأكيد
                  الاشتراكات. هؤلاء المزودون ملتزمون بمعايير الأمان العالمية
                  (PCI-DSS).
                </li>
                <li>
                  <strong>مزودو البريد والرسائل:</strong> نستخدمهم لإرسال تنبيهات
                  النظام ورسائل التسويق التي وافقت عليها. الاتصالات تتم عبر
                  تشفير TLS لضمان الأمان.
                </li>
                <li>
                  <strong>أدوات التحليلات (مثل Google Analytics):</strong> نستفيد
                  منها لفهم كيفية استخدام المنصة وتحسينها، دون تتبع هويتك
                  الشخصية. غالبًا ما يتم إخفاء عنوان الـIP للحفاظ على الخصوصية.
                </li>
                <li>
                  <strong>جهات إنفاذ القانون:</strong> قد نضطر لمشاركة بعض
                  البيانات إذا طُلِب منا ذلك قانونيًا وبشكل رسمي. وفي هذه
                  الحالة، نلتزم بأضيق حدود الإفصاح الممكنة لحماية خصوصيتك.
                </li>
              </ul>
              <p className="legal-note legal-note-danger">
                <strong>لا نبيع بياناتك لأي طرف ثالث تحت أي ظرف.</strong>
              </p>
            </div>
            <hr className="my-8" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                5. الاحتفاظ بالبيانات
              </h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <strong>حسابك:</strong> طوال فترة الاشتراك + 30 يومًا بعد
                  الإلغاء (للسماح بالاستعادة فقط).
                </li>
                <li>
                  <strong>رسائل واتساب:</strong> النظام يحتفظ بها بحد اقصي 7 ايام
                  ويتم حذفها بشكل تلقائي.
                </li>
                <li>
                  <strong>السجلات التقنية:</strong> من 30 إلى 180 يومًا لأغراض
                  الأمان والتحليل.
                </li>
              </ul>
              <p className="mt-4">
                عند طلب الحذف سنزيل أو نُهمِّش البيانات خلال 30 يوم عمل، ما لم
                يتطلّب القانون فترة احتفاظ أطول.
              </p>
            </div>

            <hr className="my-8" />

            <div>
              <h2 className="text-2xl font-semibold mb-4">6. الأمان</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>تشفير TLS 1.3 لجميع الاتصالات.</li>
                <li>تشفير AES-256 للبيانات المخزَّنة.</li>
                <li>
                  طبقات وصول مبنية على صلاحيات دقيقة (RLS) في Supabase.
                </li>
              </ul>
            </div>
            <hr className="my-8" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                7. ملفات تعريف الارتباط (Cookies) والتتبع
              </h2>
              <p>
                نستخدم ملفات كوكيز أساسية للجلسة وأخرى تحليلية لتحسين تجربة
                المستخدم. يمكنك إدارة أو حذف الكوكيز من إعدادات متصفحك. تعطيل
                بعضها قد يؤثر على وظائف المنصة.
              </p>
            </div>
            <hr className="my-8" />

            <div>
              <h2 className="text-2xl font-semibold mb-4">8. حقوقك</h2>
              <p>
                وفقًا لقوانين الخصوصية المعمول بها (GDPR، إلخ) يحق لك:
              </p>
              <ol className="space-y-2 list-decimal list-inside mt-2">
                <li>الوصول إلى بياناتك.</li>
                <li>تصحيح بيانات غير دقيقة.</li>
                <li>طلب الحذف (“الحق في المحو”).</li>
                <li>تقييد المعالجة أو الاعتراض عليها.</li>
                <li>نقل البيانات بصيغة قابلة للقراءة آليًا.</li>
              </ol>
              <p className="mt-4">
                يمكنك تنفيذ معظم هذه الحقوق من لوحة التحكم أو بمراسلة الدعم عبر
                الواتساب الرسمي&nbsp;
                <a
                  href="https://wa.me/201098169094"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  201098169094
                </a>
              </p>
            </div>

            <hr className="my-8" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                9. التغييرات على هذه السياسة
              </h2>
              <p>
                قد نحدِّث هذه السياسة دوريًا. سنخطرك عبر البريد الإلكتروني٫
                الواتساب أو إشعار داخل التطبيق قبل أن تصبح التعديلات نافذة.
                استمرارك في استخدام بوتيفاي بعد تاريخ النفاذ يعني موافقتك على
                السياسة المعدَّلة.
              </p>
            </div>
            <hr className="my-8" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                10. التواصل معنا
              </h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>البريد الإلكتروني: wacare@botifiy.com</li>
                <li>عبر الواتساب الرسمي&nbsp;
                <a
                  href="https://wa.me/201098169094"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  201098169094
                </a></li>
              </ul>
              <p className="mt-4">
                نلتزم بالرد على جميع الاستفسارات المتعلقة بالخصوصية خلال 14
                يومًا كحد أقصى.
              </p>
            </div>
            <hr className="my-8" />
            <p className="legal-closing">
              باستخدامك بوتيفاي، فإنك تقرّ بأنك قرأت وفهمت سياسة الخصوصية هذه
              وتوافق على جمع واستخدام ومشاركة معلوماتك كما هو مبيَّن أعلاه.
            </p>
          </div>
        </article>
      </main>
      <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicyPage; 
