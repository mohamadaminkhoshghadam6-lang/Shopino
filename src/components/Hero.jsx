import { useEffect, useRef } from 'react'

export default function Hero() {
  const statsRef = useRef(null)

  // تیلت ملایم گروه کارت‌ها با موس
  const onMove = (e) => {
    const el = statsRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
  }
  const onLeave = () => {
    if (statsRef.current) statsRef.current.style.transform = ''
  }

  return (
    <section className="relative my-8 overflow-hidden rounded-3xl border border-white/10 bg-gray-950 px-6 py-14 text-white shadow-2xl shadow-black/40 md:px-14 md:py-20">
      {/* خط گرادیانی بالا */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-brand-500 via-fuchsia-500 to-amber-400" />

      {/* هاله‌های نورانی متحرک */}
      <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-brand-500/25 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse [animation-delay:1.5s]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-3xl animate-pulse [animation-delay:3s]" />

      {/* شبکهٔ محو پس‌زمینه */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />

      <div className="relative grid items-center gap-10 md:grid-cols-2">
        {/* متن */}
        <div>
          <p className="group mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            <span className="text-gray-300">تخفیف ویژه تابستان</span>
            <span>🔥</span>
          </p>

          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            خرید آسان،{' '}
            <span className="bg-gradient-to-l from-brand-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
              تحویل سریع
            </span>
          </h1>

          <p className="mt-4 max-w-md text-gray-400 md:text-lg">
            هزاران محصول باکیفیت با ضمانت اصالت و ارسال رایگان برای سفارش‌های
            بالای ۵۰۰ هزار تومان.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {/* دکمه اصلی */}
            <a
              href="#products"
              className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-l from-brand-500 to-fuchsia-500 px-6 py-3 font-bold text-white shadow-lg shadow-brand-600/30 transition hover:brightness-110 active:scale-95"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
              <span className="relative flex items-center gap-2">
                مشاهده محصولات
                <span className="transition group-hover/btn:-translate-x-1">←</span>
              </span>
            </a>

            {/* دکمه ثانویه */}
            <a
              href="#features"
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-gray-200 backdrop-blur transition hover:border-white/25 hover:bg-white/10 hover:text-white"
            >
              چرا ما؟
            </a>
          </div>
        </div>

        {/* کارت‌های آماری */}
        <div
          ref={statsRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="hidden justify-self-end transition-transform duration-200 will-change-transform md:block"
        >
          <div className="grid grid-cols-2 gap-4 text-center">
            {[
              { n: '+۲۵۰۰', t: 'محصول', icon: '📦' },
              { n: '+۴۰ هزار', t: 'مشتری', icon: '👥' },
              { n: '۴.۹', t: 'امتیاز', icon: '⭐' },
              { n: '۲۴/۷', t: 'پشتیبانی', icon: '💬' },
            ].map((s, i) => (
              <div
                key={s.t}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {/* درخشش هاور */}
                <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-500/0 via-fuchsia-500/0 to-amber-400/0 opacity-0 transition group-hover:from-brand-500/20 group-hover:via-fuchsia-500/10 group-hover:to-amber-400/20 group-hover:opacity-100" />

                <div className="relative text-2xl">{s.icon}</div>
                <div className="relative mt-2 bg-gradient-to-l from-white to-gray-300 bg-clip-text text-2xl font-extrabold text-transparent">
                  {s.n}
                </div>
                <div className="relative mt-1 text-sm text-gray-400">{s.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}