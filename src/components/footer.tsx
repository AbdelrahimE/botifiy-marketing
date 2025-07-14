export function Footer() {
  return (
    <footer className="bg-[#60DE2E]/20 py-6">
      <div className="max-w-container mx-auto px-6 text-center">
        {/* Legal Links */}
        <div className="flex justify-center items-center gap-6 mb-4">
          <a 
            href="/privacy-policy" 
            className="text-sm text-primary-dark hover:text-gray-800 transition-colors"
          >
            سياسة الخصوصية
          </a>
          <span className="text-primary-dark/50">•</span>
          <a 
            href="/terms-of-use" 
            className="text-sm text-primary-dark hover:text-gray-800 transition-colors"
          >
            شروط الاستخدام
          </a>
        </div>
        
        {/* Copyright */}
        <div className="text-sm text-primary-dark">
          © 2025 بوتيفاي. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  )
} 