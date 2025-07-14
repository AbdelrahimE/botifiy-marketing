'use client'

import { CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const testimonials = [
  {
    name: " Mohammed Sawaf",
    role: "صاحب متجر إلكتروني",
    rating: 5,
    quote: "بالبداية كان في شوية لخبطة وما كنت فاهم كل شي بس بصراحة الدعم عندكم وقف معاي خطوة بخطوة. أكثر شي عجبني هو الشات بوت لانه اختصر علي وقت كثير في الرد علي العملا .. يعني بصراحة منصة بوتيفاي فعلاً فارقة معاي في الشغل"
  },
  {
    name: "Eng. Fatima Ali",
    role: "Head of Marketing",
    rating: 5,
    quote: "يعطيكم العافية يا شباب دعمكم ممتاز وسريع وحليتوا المشكلة بدون تعقيد استمروا الخدمة ممتازة"
  },
  {
    name: "الاستاذ يوسف",
    role: "صاحب مطعم مشاوي",
    rating: 5,
    quote: "المنصة ماشية معايا تمام من يوم بدات خصوصا سيستم الحملات والجدولة ريحني بصراحة عشان بقدر ابعت الرسايل في اوقات مناسب للزباين عندي"
  },
  {
    name: "Sarah Abdullah",
    role: "Social Media Specialist",
    rating: 5,
    quote: "اول مرة استخدم برنامج تسويق واتساب واحس بكل شي واضح من لوحة التحكم لحد الاحصائيات عجبتني التفاصيل الصغيره يعطيكم العافية يا شباب"
  },
  {
      name: "Mohamed Al-Hassan",
      role: "Head of Operations",
      rating: 5,
      quote: "المنصة جدا ممتازة خصوصا خاصية توزيع الحملة على أكثر من رقم. هذي سهلت علي كثير وقللت خطر الحظر ابدعتوا"
  },
  {
      name: "الاستاذة نورة",
      role: "صاحبة براند ملابس",
      rating: 5,
      quote: "تفاصيل النظام فعلا متعوب عليها من الردود التلقائية لقوالب الرسايل كل شيء يخدم البزنس صح .. يعطيكم الف عافيه على الاحترافيه"
  },
  {
      name: "Mr. Ahmed Al-Bardawili",
      role: "Tech Support Lead",
      rating: 5,
      quote: "احلي حاجة هو قسم اللايف شات ريحني انا والتيم جدا جدا جدا ... وكل شيء واضح وسلس سهلتوا علينا المتابعة جدا"
  },
  {
      name: "الاستاذ عبدالله قاسم",
      role: "Digital Marketing Manager",
      rating: 5,
      quote: "ميزة تحليل المشاعر بالذكاء الاصطناعي غيرت شغلنا حرفيا صرت اعرف من اول نظرة مين مبسوط ومين متضايق بدون ما اضطر افتح كل محادثة لحالها خصوصا وإحنا يجينا مئات الرسائل يوميا. شغلكم صراحة نظيف ومتقن وتستاهلون كل الشكر على المجهود 👏"
  }
]

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="embla__slide flex-shrink-0 min-w-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
    <div 
      className="group relative bg-primary/10 backdrop-blur-lg border border-green-300/30 rounded-2xl p-4 sm:p-6 hover:bg-primary/15 hover:border-green-300/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-200/20 h-full mx-2 sm:mx-2"
      style={{
        background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.15) 0%, rgba(96, 222, 46, 0.05) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-200/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <CardContent className="relative z-10 p-4 sm:p-8 flex flex-col h-full">
        <div className="flex items-center gap-1 mb-4 justify-start">
            {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
            ))}
        </div>
        <blockquote className="text-gray-800 text-base sm:text-lg leading-relaxed mb-6 flex-grow text-right">
            &quot;{testimonial.quote}&quot;
        </blockquote>
        <div className="flex items-center gap-4 justify-start">
            <div className="text-right">
                <div className="font-bold text-primary-dark text-base sm:text-lg">{testimonial.name}</div>
                <div className="text-primary-dark/80 text-sm">{testimonial.role}</div>
            </div>
        </div>
      </CardContent>
    </div>
  </div>
);

export function TestimonialsSection() {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      direction: 'rtl',
      slidesToScroll: 1,
      containScroll: false,
      dragFree: false,
      skipSnaps: false,
    },
    [
      Autoplay({ 
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: false,
      })
    ]
  );

  return (
    <section className="pt-20 pb-10 overflow-hidden" dir="rtl">
      <div className="max-w-full">
        <div className="text-center mb-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
            شركاؤنا يشاركون قصص نجاحهم
            </h2>
            <p className="text-xl text-primary-dark/80 max-w-3xl mx-auto">
            آراء حقيقية من شركات استفادت من بوتيفاي لتطوير أعمالها والتواصل مع عملائها بفعالية أكبر.
            </p>
        </div>

        <div className="embla w-full" ref={emblaRef}>
          <div className="embla__container flex">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
