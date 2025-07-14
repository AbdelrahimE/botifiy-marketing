import { Check, Globe, Phone, MessageSquare, Bot, BarChart, Shield } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Globe className="w-6 h-6 text-primary-dark" />,
      title: "تدعم اللغة العربية بالكامل",
      description: "واجهة مترجمة وحلول تقنية مصممة للعالم العربي"
    },
    {
      icon: <Phone className="w-6 h-6 text-primary-dark" />,
      title: "تربط أكتر من رقم واتساب بكل سهولة",
      description: "إدارة عدة حسابات من مكان واحد"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary-dark" />,
      title: "حملات جماعية بدون تعقيد",
      description: "أرسل لآلاف العملاء بضغطة زر واحدة"
    },
    {
      icon: <Bot className="w-6 h-6 text-primary-dark" />,
      title: "شات بوت ذكي يرد عنك 24/7",
      description: "ردود تلقائية متقدمة تعمل على مدار الساعة"
    },
    {
      icon: <BarChart className="w-6 h-6 text-primary-dark" />,
      title: "تحليل مشاعر العملاء بالذكاء الاصطناعي",
      description: "لفهم مشاعر العملاء وتحسين الخدمة"
    },
    {
      icon: <Shield className="w-6 h-6 text-primary-dark" />,
      title: "بدون الحاجة لأي API رسمي من Meta",
      description: "حل مستقل وآمن بدون تعقيدات"
    }
  ]

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-primary/5 via-green-50/50 to-primary/10 relative overflow-hidden">
      {/* Background Glass Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            ليش بوتيفاي؟
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            كل المميزات اللي محتاجها لإدارة واتساب البيزنس بشكل احترافي
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-primary/10 backdrop-blur-lg border border-green-300/30 rounded-2xl p-6 hover:bg-primary/15 hover:border-green-300/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-green-200/20"
              style={{
                background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.15) 0%, rgba(96, 222, 46, 0.05) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
            >
              {/* Glass highlight effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-200/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-primary/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 border border-green-300/20">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-[#0B3404] text-lg leading-tight">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-[#0B3404]/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 