"use client";
import { QrCode, Settings, BarChart3, CheckCircle, Clock, Zap } from "lucide-react";
import { trackClickSignup } from "@/lib/gtm";

export function HowItWorksSection() {
  const steps = [
    {
      icon: <QrCode className="w-8 h-8 text-white" />,
      title: "امسح QR Code واربط رقمك",
      subtitle: "في أقل من 30 ثانية",
      description: "فقط امسح الكود وسيتم ربط رقم الواتساب تلقائياً بدون أي تعقيدات",
      time: "30 ثانية",
      highlight: "فوري وآمن"
    },
    {
      icon: <Settings className="w-8 h-8 text-white" />,
      title: "فعّل الشات بوت أو جهّز حملتك",
      subtitle: "في 3 نقرات بسيطة",
      description: "اختر نوع الخدمة واضبط الإعدادات بسهولة، أو اطلق حملتك لـ 10,000 عميل",
      time: "دقيقتين",
      highlight: "بدون خبرة تقنية"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      title: "راقب النتائج والإحصائيات",
      subtitle: "في الوقت الفعلي",
      description: "تابع الأداء والنتائج مباشرة من لوحة التحكم مع تقارير مفصلة",
      time: "فوري",
      highlight: "تحديث مباشر"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-primary-dark relative overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>

        {/* Floating particles */}
        <div className="absolute top-32 left-1/4 w-3 h-3 bg-primary/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 right-1/4 w-2 h-2 bg-primary/25 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/2 left-1/6 w-4 h-4 bg-primary/20 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10 max-w-container mx-auto px-6">
        <div className="text-center mb-16">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-6 border border-white/20">
            <Zap className="w-3 h-3 text-primary animate-pulse" />
            <span>بساطة في التنفيذ</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            كيف تشتغل <span className="text-primary">بوتيفاي</span>؟
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            ثلاث خطوات بسيطة وتبقى جاهز لإدارة واتساب البيزنس بشكل احترافي
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Enhanced Timeline Line */}
          <div className="absolute top-1/2 left-6 right-6 h-1 bg-white/10 transform -translate-y-1/2 hidden md:block rounded-full">
            <div className="absolute inset-0 bg-primary rounded-full animate-pulse"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center group">
                {/* Enhanced Timeline Node */}
                <div className="relative z-20 inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full shadow-2xl mb-6 group-hover:scale-110 transition-all duration-500">
                  <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative z-10">
                    {step.icon}
                  </div>
                </div>

                {/* Enhanced Step Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-primary-dark rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-30 group-hover:scale-110 transition-all duration-300">
                  {index + 1}
                </div>

                {/* Time Badge */}
                <div className="inline-flex items-center gap-2 bg-primary/15 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium mb-4 border border-primary/20">
                  <Clock className="w-3 h-3" />
                  {step.time}
                </div>

                {/* Enhanced Content Card */}
                <div
                  className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Glass highlight effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-primary text-base font-bold mb-3">
                      {step.subtitle}
                    </p>
                    <p className="text-white/70 leading-relaxed mb-4 text-sm">
                      {step.description}
                    </p>

                    {/* Highlight Badge */}
                    <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-primary/30">
                      <CheckCircle className="w-3 h-3" />
                      {step.highlight}
                    </div>
                  </div>

                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <a
              href="https://app.botifiy.com/auth"
              className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm text-white px-6 py-3 rounded-full text-base font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              onClick={() => trackClickSignup && trackClickSignup('how-it-works-section')}
            >
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-primary-dark font-bold text-sm">←</span>
              </div>
              <span>جاهز تبدأ الرحلة؟</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}