export function Footer() {
  return (
    <footer className="bg-[#0d1e14] py-6">
      <div className="max-w-container mx-auto px-6 text-center">
        {/* Legal Links */}
        <div className="flex justify-center items-center gap-3 mb-4">
          <a
            href="/privacy-policy"
            className="text-sm text-white hover:text-primary/80 transition-colors"
          >
            سياسة الخصوصية
          </a>
          <span className="text-white/50">|</span>
          <a
            href="/terms-of-use"
            className="text-sm text-white hover:text-primary/80 transition-colors"
          >
            شروط الاستخدام
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-white">
          © 2026 بوتيفاي. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  )
} 