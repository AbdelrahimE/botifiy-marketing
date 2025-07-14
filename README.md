# Botifiy Marketing Website

موقع Botifiy التسويقي - منصة أتمتة واتساب بالكلمات المفتاحية

## التقنيات المستخدمة

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** مع دعم RTL
- **shadcn/ui** للمكونات
- **Inter** خط المشروع

## المميزات

- ✅ دعم كامل للغة العربية (RTL)
- ✅ تصميم متجاوب (mobile-first)
- ✅ ألوان وتصميم Botifiy المخصص
- ✅ مكونات shadcn/ui محسنة
- ✅ تحسين لمحركات البحث (SEO)

## التثبيت والتشغيل

### 1. تثبيت المكتبات

```bash
npm install
```

### 2. تشغيل المشروع محلياً

```bash
npm run dev
```

الموقع سيكون متاحاً على [http://localhost:3000](http://localhost:3000)

### 3. بناء المشروع للإنتاج

```bash
npm run build
npm start
```

## هيكل المشروع

```
src/
├── app/
│   ├── globals.css          # الأنماط العامة مع دعم RTL
│   ├── layout.tsx           # التخطيط الرئيسي مع RTL
│   └── page.tsx             # الصفحة الرئيسية
├── components/
│   ├── ui/                  # مكونات shadcn/ui
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── hero-section.tsx     # قسم البطل
│   ├── features-section.tsx # قسم المميزات
│   ├── testimonials-section.tsx # قسم آراء العملاء
│   ├── cta-section.tsx      # قسم الدعوة للعمل
│   └── footer.tsx           # التذييل
└── lib/
    └── utils.ts             # مساعدات عامة
```

## الألوان المخصصة

```css
--primary: #60DE2E          /* الأخضر الأساسي */
--primary-dark: #0B3404     /* الأخضر الداكن */
--primary-light: #E7FBD9    /* الأخضر الفاتح */
--surface-alt: #F5FFF1      /* خلفية بديلة */
--text-primary: #0B3404     /* النص الأساسي */
--text-secondary: #325327   /* النص الثانوي */
```

## الأوامر المفيدة

```bash
# تشغيل المشروع
npm run dev

# بناء المشروع
npm run build

# تشغيل الإنتاج
npm start

# فحص الأخطاء
npm run lint
```

## ملاحظات مهمة

- الموقع مصمم بالكامل للغة العربية مع دعم RTL
- جميع النصوص والمحتوى باللغة العربية كما هو محدد في `info.json`
- التصميم مستوحى من موقع Crisp مع ألوان Botifiy المخصصة
- يستخدم shadcn/ui للمكونات مع تخصيصات Botifiy

## الدعم

للحصول على المساعدة أو الإبلاغ عن مشاكل، يرجى التواصل مع فريق Botifiy. 