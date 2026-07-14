'use client';

import { useEffect } from "react";
import Script from "next/script";
import { trackViewTerms } from "@/lib/gtm";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const TermsOfUsePage = () => {
  useEffect(() => {
    trackViewTerms();
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
                name: 'شروط الاستخدام',
                item: 'https://botifiy.com/terms-of-use'
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
          <span className="legal-eyebrow">الشروط والأحكام</span>
          <h1 className="legal-title">
            شروط الاستخدام لمنصة بوتيفاي
          </h1>
          <p className="legal-updated-at">
             آخر تحديث: 7 يوليو 2025
          </p>
          </header>
          <p className="legal-intro">
            مرحبًا بك في بوتيفاي! باستخدامك لمنصتنا، فإنك توافق على الالتزام
            بهذه الشروط. يرجى قراءتها بعناية، وفي حال لم توافق عليها، يجب عليك
            التوقف عن استخدام المنصة فورًا.
          </p>
          <hr />

          <div className="legal-content">
            <div>
              <h2 className="text-2xl font-semibold mb-4">1. من نحن؟</h2>
              <p>
                بوتيفاي هي منصة SaaS متخصصة في تقديم أدوات أتمتة وتسويق عبر
                واتساب، باستخدام مكتبة Baileys لدمج حسابات واتساب غير رسمية.
                نهدف إلى تسهيل إدارة المحادثات، الحملات، وتحسين تجربة خدمة
                العملاء بذكاء وسرعة.
              </p>
            </div>

            <hr className="my-8" />

            <div>
              <h2 className="text-2xl font-semibold mb-4">2. أهلية الاستخدام</h2>
              <p>لا يجوز لك استخدام منصة بوتيفاي إذا:</p>
              <ul className="space-y-2 list-disc list-inside mt-2">
                <li>كنت دون سن 18 عامًا أو غير قادر قانونيًا على إبرام العقود.</li>
                <li>تم حظر حسابك سابقًا بسبب انتهاك الشروط.</li>
                <li>
                  تستخدم المنصة لأغراض محظورة أو تنتهك القوانين المحلية أو
                  الدولية.
                </li>
              </ul>
            </div>

            <hr className="my-8" />

            <div>
              <h2 className="text-2xl font-semibold mb-4">3. حساب المستخدم</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <strong>المسؤولية:</strong> أنت مسؤول عن الحفاظ على سرية
                  بيانات تسجيل الدخول وعدم مشاركتها مع الآخرين.
                </li>
                <li>
                  <strong>الاستخدام الصحيح:</strong> لا يجوز استخدام حسابك
                  لإرسال رسائل عشوائية (Spam) أو التلاعب بالحملات أو الاحتيال
                  على النظام.
                </li>
                <li>
                  <strong>إلغاء الحساب:</strong> يحق لنا إيقاف أو حذف حسابك في
                  حال ثبوت مخالفة الشروط أو إساءة الاستخدام، دون إشعار مسبق.
                </li>
              </ul>
            </div>
            <hr className="my-8" />

            <div>
              <h2 className="text-2xl font-semibold mb-4">4. استخدام المنصة</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  يُسمح لك باستخدام بوتيفاي فقط للأغراض المشروعة والمتوافقة مع
                  القانون.
                </li>
                <li>
                  يُمنع إعادة بيع أو تأجير المنصة أو أي من خدماتها بدون إذن خطي
                  مسبق.
                </li>
                <li>
                  لا يجوز محاولة فك شيفرة أو إعادة ترجمة أو استنساخ الشيفرة
                  المصدرية أو البنية التقنية للمنصة.
                </li>
              </ul>
            </div>
            <hr className="my-8" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                5. المحتوى والرسائل
              </h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <strong>الملكية:</strong> تظل جميع الحقوق في محتوى واتساب
                  ورسائل العملاء ملكًا للمستخدم.
                </li>
                <li>
                  <strong>الموافقة:</strong> باستخدامك المنصة، فإنك تُقر بأنك
                  حصلت على الموافقات القانونية اللازمة للتواصل مع عملائك عبر
                  واتساب.
                </li>
                <li>
                  <strong>الحذف:</strong> يمكنك حذف بياناتك أو رسائلك في أي وقت
                  من خلال لوحة التحكم او عبر التواصل مع فريق الدعم.
                </li>
              </ul>
            </div>

            <hr className="my-8" />

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                6. حدود المسؤولية
              </h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  نحن نعمل على تقديم الخدمة كما هي (As-Is) دون أي ضمان صريح أو
                  ضمني.
                </li>
                <li>
                  لا نتحمل مسؤولية الأضرار الناتجة عن سوء الاستخدام، انقطاع
                  الخدمة تماما من خلال Meta، أو اختراقات خارج إرادتنا.
                </li>
                <li>استخدامك للمنصة يتم على مسؤوليتك الخاصة.</li>
              </ul>
            </div>
            <hr className="my-8" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                7. الملكية الفكرية
              </h2>
              <p>
                جميع الحقوق الفكرية والتصميمية والتقنية الخاصة بمنصة بوتيفاي،
                بما في ذلك الشعار، الواجهة، والرموز البرمجية، هي ملكٌ حصري لـ
                MAVERK LLC. لا يجوز نسخ أو استخدام أي جزء من المنصة بدون إذن
                كتابي مسبق.
              </p>
            </div>
            <hr className="my-8" />

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                8. الدفع والاشتراك
              </h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  تُعرض جميع الخطط والرسوم بوضوح قبل الاشتراك. تحتسب الرسوم
                  شهريًا أو سنويًا حسب اختيارك.
                </li>
                <li>
                  لا تُسترد المبالغ المدفوعة إلا في حال وجود خلل تقني مُثبت
                  يمنع استخدام المنصة.
                </li>
                <li>
                  يمكننا تعديل الأسعار مع إشعار مسبق قبل 7 أيام على الأقل.
                </li>
              </ul>
            </div>
            <hr className="my-8" />

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                9. إنهاء الاستخدام
              </h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  يمكنك إغلاق حسابك في أي وقت عبر التواصل مع الدعم عبر
                  الواتساب.
                </li>
                <li>
                  نحن نحتفظ بالحق في تعليق أو إنهاء الوصول للمنصة كليًا أو
                  جزئيًا إذا انتهكت الشروط.
                </li>
                <li>
                  بعد إنهاء الحساب، سيتم حذف بياناتك خلال فترة لا تتجاوز 30
                  يومًا، إلا إذا طُلِب خلاف ذلك قانونيًا.
                </li>
              </ul>
            </div>

            <hr className="my-8" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                10. التعديلات على الشروط
              </h2>
              <p>
                قد نقوم بتحديث شروط الاستخدام من وقت لآخر. سنقوم بإعلامك بأي
                تغيير كبير عبر البريد الإلكتروني٫ الواتساب أو داخل المنصة.
                استمرارك في استخدام الخدمة بعد التعديلات يعني قبولك للشروط
                الجديدة.
              </p>
            </div>
            <hr className="my-8" />
            <div>
              <h2 className="text-2xl font-semibold mb-4">12. التواصل معنا</h2>
              <p>
                إذا كان لديك أي استفسار بخصوص شروط الاستخدام، يرجى التواصل معنا
                عبر:
              </p>
              <ul className="space-y-2 list-disc list-inside mt-2">
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
            </div>
            <hr className="my-8" />
            <p className="legal-closing">
              باستخدامك لمنصة بوتيفاي، فإنك توافق على هذه الشروط وتلتزم بها.
              نُقدّر ثقتك بنا ونعمل باستمرار على تحسين الخدمة بما يحقق لك أفضل
              تجربة استخدام.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
    </>
  );
};

export default TermsOfUsePage; 
