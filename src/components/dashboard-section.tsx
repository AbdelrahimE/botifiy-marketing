"use client"

import { Monitor, MessageSquare, Activity, Files } from "lucide-react"
import { CardContent } from "@/components/ui/card"

export function DashboardSection() {
  const features = [
    {
      icon: <Monitor className="w-8 h-8 text-primary" />,
      title: "نظّم ارقامك بسهولة",
      description: "استيراد وتنظيف تلقائي يوفر وقتك",
      metric: "100%",
      metricLabel: "تنظيف تلقائي"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "استهلاك الرسائل",
      description: "تتبع عدد الرسائل المرسلة",
      metric: "50K+",
      metricLabel: "رسالة/شهر"
    },
    {
      icon: <Activity className="w-8 h-8 text-primary" />,
      title: "الحملات النشطة",
      description: "إدارة ومتابعة الحملات الجارية",
      metric: "10",
      metricLabel: "حملة نشطة"
    },
    {
      icon: <Files className="w-8 h-8 text-primary" />,
      title: "الملفات المرفوعة",
      description: "إدارة جميع الملفات والوسائط",
      metric: "500MB",
      metricLabel: "مساحة مستخدمة"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-white to-primary/5 relative overflow-hidden">
      {/* Background Glass Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-400/6 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/4 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            لوحة تحكم متكاملة
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            مراقبة شاملة لجميع أنشطة واتساب البيزنس من مكان واحد
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(96, 222, 46, 0.3)',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(96, 222, 46, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              }}
            >
              {/* Liquid Glass Shine Effect */}
              <div 
                className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(96, 222, 46, 0.05) 100%)',
                  animation: 'shine 2s ease-in-out infinite',
                }}
              ></div>

              {/* Reflection Elements */}
              <div 
                className="absolute top-2 left-2 right-2 h-8 rounded-t-[18px] opacity-30"
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)',
                }}
              ></div>

              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(96, 222, 46, 0.15) 0%, rgba(96, 222, 46, 0.08) 100%)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(96, 222, 46, 0.2)',
                    }}
                  >
                    {feature.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{feature.metric}</div>
                    <div className="text-xs text-text-secondary">{feature.metricLabel}</div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) rotate(45deg); }
          50% { transform: translateX(100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
      `}</style>
    </section>
  )
} 