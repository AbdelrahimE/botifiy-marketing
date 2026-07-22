"use client"

import { useState } from "react"
import Image from "next/image"
import { Clock3, Play, Rocket } from "lucide-react"

const demoVideoId = "kdRa9KeMcKM"

export function DemoVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  const playVideo = () => {
    setIsPlaying(true)
  }

  return (
    <section id="demo-video" className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-[#F0FFF4] via-white to-[#F8FFF9] py-12 sm:scroll-mt-24 sm:py-14">
      <div className="relative z-10 max-w-container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3 leading-tight">
            شاهد كيف تتحول محادثة واتساب إلى رحلة بيع كاملة
          </h2>
          <p className="text-base md:text-xl text-text-secondary leading-relaxed mb-6">
            في أقل من دقيقة، شاهد كيف يفهم بوتيفاي نية العميل، يعرض له الخيارات المناسبة، ثم يتابعه تلقائيًا داخل واتساب.
          </p>

          <div className="relative mx-auto max-w-[860px] overflow-hidden rounded-2xl border-2 border-primary bg-primary-dark shadow-lg shadow-primary/30 drop-shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/25">
            <div className="relative aspect-video w-full">
              {isPlaying ? (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${demoVideoId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&color=white`}
                  title="الفيديو التعريفي لمنصة بوتيفاي"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={playVideo}
                  className="group absolute inset-0 block h-full w-full overflow-hidden text-right focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-inset"
                  aria-label="تشغيل الفيديو التعريفي — أقل من دقيقة"
                >
                  <Image
                    src="/images/hero-section.webp"
                    alt="معاينة لواجهة منصة بوتيفاي"
                    fill
                    priority={false}
                    sizes="(max-width: 860px) 100vw, 860px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />

                  <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,52,4,0.08)_20%,rgba(11,52,4,0.22)_62%,rgba(11,52,4,0.82)_100%)] transition-colors duration-300 group-hover:bg-[linear-gradient(180deg,rgba(11,52,4,0.03)_20%,rgba(11,52,4,0.18)_62%,rgba(11,52,4,0.78)_100%)]" aria-hidden="true" />

                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-bold text-primary-dark shadow-md backdrop-blur-sm sm:left-5 sm:top-5 sm:px-4 sm:py-2 sm:text-sm">
                    <Clock3 className="h-4 w-4 text-primary" aria-hidden="true" />
                    أقل من دقيقة
                  </span>

                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-primary text-primary-dark shadow-[0_10px_35px_rgba(11,52,4,0.45)] ring-8 ring-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#72ea41] group-hover:ring-white/45 sm:h-20 sm:w-20">
                      <Play className="h-7 w-7 fill-current sm:h-9 sm:w-9" aria-hidden="true" />
                    </span>
                  </span>

                  <span className="absolute inset-x-4 bottom-3 text-center text-white sm:inset-x-8 sm:bottom-5">
                    <span className="block text-base font-bold drop-shadow-md sm:text-xl">شاهد بوتيفاي وهو يعمل</span>
                    <span className="mt-0.5 hidden text-sm text-white/85 sm:block">اضغط للتشغيل — بدون مغادرة الصفحة</span>
                  </span>
                </button>
              )}
            </div>
          </div>

          <a
            href="/activate?source=demo-video"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#4BC625] bg-[#63dd32] px-5 py-3 text-base font-bold text-primary-dark shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#4BC625] hover:shadow-2xl"
          >
            <Rocket className="h-4 w-4" aria-hidden="true" />
            أريد نفس النظام لنشاطي
          </a>
        </div>
      </div>
    </section>
  )
}
