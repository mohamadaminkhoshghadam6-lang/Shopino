import { useState } from 'react'

const columns = [
  {
    title: 'دسته‌بندی‌ها',
    links: ['الکترونیک', 'مد و پوشاک', 'خانه و آشپزخانه', 'کتاب و لوازم‌تحریر'],
  },
  {
    title: 'خدمات مشتریان',
    links: ['پیگیری سفارش', 'شرایط بازگشت', 'روش‌های پرداخت', 'سوالات متداول'],
  },
  {
    title: 'درباره شاپینو',
    links: ['داستان ما', 'فرصت‌های شغلی', 'وبلاگ', 'تماس با ما'],
  },
]

const socials = [
  { name: 'اینستاگرام', icon: '📸', href: '#' },
  { name: 'تلگرام', icon: '✈️', href: '#' },
  { name: 'توییتر', icon: '🐦', href: '#' },
  { name: 'یوتیوب', icon: '▶️', href: '#' },
]

const badges = [
  { icon: '🔒', label: 'پرداخت امن' },
  { icon: '🚚', label: 'ارسال سریع' },
  { icon: '↩️', label: '۷ روز بازگشت' },
  { icon: '✅', label: 'ضمانت اصالت' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 4000)
  }

  return (
    <footer
      id="footer"
      className="relative mt-20 overflow-hidden bg-gray-900 text-gray-300"
    >
      {/* گرادیان تزئینی بالا */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-brand-500 via-fuchsia-500 to-amber-400" />

      {/* هاله‌های نورانی پس‌زمینه */}
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-brand-600/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-fuchsia-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* ===== نوار خبرنامه ===== */}
        <div className="grid gap-6 border-b border-white/10 py-12 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-2xl font-extrabold text-white">
              از تخفیف‌ها جا نمون 📬
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              با عضویت در خبرنامه، اولین نفر از تخفیف‌ها و محصولات جدید باخبر شو.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل خود را وارد کنید"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-brand-500 focus:bg-white/10"
            />
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-l from-brand-500 to-fuchsia-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition hover:brightness-110 active:scale-95"
            >
              {subscribed ? '✓ عضو شدی!' : 'عضویت'}
            </button>
          </form>
        </div>

        {/* ===== ستون‌های اصلی ===== */}
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-5">
          {/* برند */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛍️</span>
              <span className="text-xl font-extrabold text-white">شاپینو</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-400">
              شاپینو یک فروشگاه آنلاین مدرن است که تجربه‌ای سریع، امن و لذت‌بخش
              از خرید را برای شما فراهم می‌کند. از محصولات باکیفیت تا پشتیبانی
              ۲۴/۷، همه چیز اینجاست.
            </p>

            {/* شبکه‌های اجتماعی */}
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  title={s.name}
                  aria-label={s.name}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-lg ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-brand-600 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ستون‌های لینک */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-bold text-white">{col.title}</h4>
              <ul className="space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-1 text-gray-400 transition hover:text-brand-400"
                    >
                      <span className="h-1 w-1 rounded-full bg-gray-600 transition group-hover:bg-brand-400" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ===== نشان‌های اعتماد ===== */}
        <div className="grid grid-cols-2 gap-3 border-t border-white/10 py-8 md:grid-cols-4">
          {badges.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-3 rounded-xl bg-white/5 p-4 ring-1 ring-white/10"
            >
              <span className="text-2xl">{b.icon}</span>
              <span className="text-sm font-medium text-gray-300">
                {b.label}
              </span>
            </div>
          ))}
        </div>

        {/* ===== نوار پایانی ===== */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-gray-500 md:flex-row">
          <p>© ۲۰۲۵ شاپینو — تمامی حقوق محفوظ است.</p>

          {/* امضای سازنده */}
          <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10">
            <span className="text-gray-400">
              ساخته شده با
            
              توسط
            </span>
            <span className="font-bold text-white">
  محمد امین خوش قدم
</span>
          </div>

          <div className="flex gap-4">
            <a href="#" className="transition hover:text-white">
              حریم خصوصی
            </a>
            <a href="#" className="transition hover:text-white">
              قوانین و مقررات
            </a>
            <a href="#" className="transition hover:text-white">
              کوکی‌ها
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}