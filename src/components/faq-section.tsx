'use client';

import { useState } from 'react';
import { ChevronDown, Code2, Smartphone, Gem, Shield, Copy, HelpCircle, Headset, FileDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    icon: Code2,
    question: "هل لازم أكون مبرمج علشان أستخدم المنصة؟",
    answer: "لا أبدًا، كل شيء عندنا سهل ومصمم لرواد الأعمال وأصحاب المشاريع. تربط رقمك في ثواني وتبدأ على طول."
  },
  {
    icon: Smartphone,
    question: "هل منصة بوتيفاي تشتغل على WhatsApp الرسمي؟",
    answer: "لا، نستخدم مكتبة Baileys الآمنة. ما تحتاج WhatsApp API من Meta — بس رقم واتساب عادي وشغال."
  },
  {
    icon: Gem,
    question: "ما الفرق بين الخطة المجانية والخطط المدفوعة؟",
    answer: "الخطة المجانية تعطيك 50 رسالة شهريًا لتجربة الأقسام. الخطط المدفوعة تفتح لك عدد أكبر من الرسائل، أكثر من رقم، حملات، شات بوت متطور، وتحليلات ذكية."
  },
  {
    icon: Shield,
    question: "هل ممكن ينحظر رقم الواتساب؟",
    answer: "✅ بشكل عام، استخدام أدوات تسويق مع واتساب فيه احتمال بسيط للحظر – وهذا طبيعي إذا تم الاستخدام بشكل خاطئ. \n\n لكن لا تقلق، في بوتيفاي وفرنا لك حماية متقدمة تقلل المخاطر لأقصى حد: \n\n • تقدر تربط بروكسي خاص برقمك \n • عندك جدولة ذكية للحملات \n • نمنع التكرار والإرسال العشوائي تلقائيًا \n • نقدم لك إرشادات واضحة لأفضل ممارسات الإرسال \n\n ⚠️ تنبيه مهم: \n لو أرسلت كميات ضخمة من الرسائل لناس ما يعرفونك أو بدون تفاعل سابق — ممكن واتساب يشوفها نشاط مشبوه. \n عشان كدا ننصح دومًا بالبداية مع جمهور تعرفه أو مستهدف بشكل سليم، ومع الوقت تبني سمعة رقمك تدريجيًا. \n\n 💡 خلاصة القول: المنصة جاهزة تحميك، بس الاستخدام الذكي عليك 😉"
  },
  {
    icon: Copy,
    question: "هل أقدر أستخدم أكثر من رقم واتساب؟",
    answer: "نعم، حسب خطتك. بعض الخطط تسمح بـ 2 أو 4 أرقام مرتبطة، تقدر ترسل من كل رقم بشكل فردي او تترك المنصة تبدل الارسال بينهم بشكل تلقائي وتتبع النتائج."
  },
  {
    icon: HelpCircle,
    question: "هل أقدر أطلب استرجاع بعد الدفع؟",
    answer: "نؤمن تمامًا بحقك كمستخدم، لكن بما إن خدمات المنصة تبدأ مباشرة بعد الاشتراك، فالاسترجاع غير متاح طالما المنصة تعمل بشكل طبيعي وما فيه توقف كامل في الخدمة (مثل توقف مكتبة Baileys تمامًا). فريقنا دايمًا جاهز يساعدك ويحل أي مشكلة تواجهك بسرعة وبكل ود 💚"
  },
  {
    icon: Headset,
    question: "هل فيه دعم فني مباشر؟",
    answer: "نعم، عندنا دعم عربي سريع عن طريق الواتساب. وخطط الشركات تحصل على دعم مخصص."
  },
  {
    icon: FileDown,
    question: "هل أقدر أصدر تقارير أو بيانات العملاء؟",
    answer: "نعم. كل المحادثات، جهات الاتصال، والتقارير تقدر تصدّرها بصيغة CSV بسهولة."
  }
];

const FaqItem = ({ faq, isOpen, onToggle }: { faq: typeof faqs[0], isOpen: boolean, onToggle: () => void }) => (
    <div className="border-b border-gray-200 dark:border-gray-800 last-of-type:border-none">
        <button
            onClick={onToggle}
            className="flex items-center justify-between w-full p-6 text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-lg"
        >
            <div className="flex items-center gap-4">
                <div className="bg-[#cff5c0] dark:bg-green-900/50 p-2 rounded-full">
                    <faq.icon className="h-5 w-5 text-[#4BC625] dark:text-green-400" />
                </div>
                <span className="text-lg font-semibold text-primary-dark dark:text-white">{faq.question}</span>
            </div>
            <ChevronDown
                className={cn('h-6 w-6 text-gray-500 transition-transform duration-300 shrink-0', isOpen && 'transform rotate-180')}
            />
        </button>
        <div
            className={cn('overflow-hidden transition-[max-height] duration-500 ease-in-out', {
                'max-h-0': !isOpen,
                'max-h-[500px]': isOpen, // A large enough value, adjust if needed
            })}
        >
            <div className="p-6 pt-0 pr-20">
                <p className="text-primary-dark/90 dark:text-gray-300 whitespace-pre-line text-right leading-loose">{faq.answer}</p>
            </div>
        </div>
    </div>
);

export function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 sm:py-24 bg-white dark:bg-transparent">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary-dark dark:text-white">
                     عندك استفسارات؟ جهّزنا لك هنا الأجوبة
                    </h2>
                    <p className="mt-4 text-lg text-primary-dark/80 dark:text-gray-400 max-w-2xl mx-auto">
                        إجابات على أكثر الأسئلة التي تصلنا. إذا لم تجد سؤالك، تواصل معنا مباشرة.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-800/50 overflow-hidden">
                    {faqs.map((faq, index) => (
                        <FaqItem
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
} 