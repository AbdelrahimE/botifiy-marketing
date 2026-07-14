import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#F0FFF4] via-white to-[#F8FFF9] px-4 text-center">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>

      <div className="relative z-10">
        <h1 className="text-6xl font-bold text-primary md:text-9xl">
          404
        </h1>
        <h2 className="mt-4 mb-6 text-2xl font-bold text-text-primary md:text-4xl">
          الصفحة غير موجودة
        </h2>
        <p className="mx-auto mb-8 max-w-md text-lg text-text-secondary">
          عفواً، الصفحة التي تبحث عنها غير موجودة. ربما تم حذفها أو أن الرابط
          الذي اتبعته غير صحيح.
        </p>
        <Link
          href="/"
          className="inline-block transform rounded-2xl border-2 border-[#4BC625] bg-[#63dd32] px-8 py-3 text-lg font-bold text-[#0B3404] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#4BC625] hover:shadow-2xl"
        >
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </div>
  )
} 