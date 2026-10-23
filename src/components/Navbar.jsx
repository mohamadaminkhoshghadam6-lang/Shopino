import { useEffect, useRef, useState } from 'react'
import { useCart } from '../context/Cartcontext'

const navLinks = [
  { label: 'محصولات', href: '#products' },
  { label: 'ویژگی‌ها', href: '#features' },
  { label: 'تماس', href: '#footer' },
]

export default function Navbar({ onOpenCart }) {
  const { totalCount } = useCart()

  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#products')
  const [progress, setProgress] = useState(0)

  const lastY = useRef(0)
  const cartRef = useRef(null)

  // اسکرول: progress + hide/show + scrolled
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const docH =
        document.documentElement.scrollHeight - window.innerHeight || 1
      setProgress(Math.min(100, (y / docH) * 100))
      setScrolled(y > 8)
      setHidden(y > 120 && y > lastY.current)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // هایلایت فعال بر اساس دید بخش‌ها
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive('#' + e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  // بستن منو با Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // spotlight دکمه سبد خرید
  const onCartMove = (e) => {
    const el = cartRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-transform duration-500 ${
          hidden ? '-translate-y-[130%]' : 'translate-y-0'
        }`}
      >
        <div className="mx-auto max-w-7xl px-3 pt-3">
          {/* حاشیه گرادیانی چرخان دور نوبار */}
          <div className="relative rounded-2xl p-[1px]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute -inset-[200%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,theme(colors.brand.500)_90deg,theme(colors.fuchsia.500)_180deg,theme(colors.amber.400)_270deg,transparent_360deg)] opacity-70" />
            </div>

            <div
              className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gray-950/80 backdrop-blur-2xl transition-all duration-300 ${
                scrolled
                  ? 'shadow-2xl shadow-black/50'
                  : 'shadow-lg shadow-black/20'
              }`}
            >
              {/* نوار پیشرفت اسکرول */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-white/5">
                <div
                  className="h-full bg-gradient-to-l from-brand-500 via-fuchsia-500 to-amber-400 transition-[width] duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* هاله‌های نورانی */}
              <div className="pointer-events-none absolute -top-20 -right-10 h-48 w-48 rounded-full bg-brand-500/25 blur-3xl animate-pulse" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl animate-pulse [animation-delay:1.5s]" />

              <div className="relative flex items-center justify-between gap-3 px-3 py-2.5 sm:px-4">
                {/* برند با تیلت */}
                <Brand />

                {/* لینک‌های دسکتاپ */}
                <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
                  {navLinks.map((item) => {
                    const isActive = active === item.href
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setActive(item.href)}
                        className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition ${
                          isActive
                            ? 'text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {isActive && (
                          <span className="absolute inset-0 rounded-full bg-gradient-to-l from-brand-500/90 to-fuchsia-500/90 shadow-lg shadow-brand-600/40" />
                        )}
                        <span className="relative">{item.label}</span>
                      </a>
                    )
                  })}
                </nav>

                {/* اکشن‌ها */}
                <div className="flex items-center gap-2">
                  <button
                    ref={cartRef}
                    onClick={onOpenCart}
                    onMouseMove={onCartMove}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-l from-brand-500 to-fuchsia-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition hover:brightness-110 active:scale-95"
                  >
                    {/* spotlight دنبال‌کننده موس */}
                    <span
                      className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          'radial-gradient(120px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.35), transparent 60%)',
                      }}
                    />
                    <span className="relative flex items-center gap-2">
                      <CartIcon />
                      <span className="hidden sm:inline">سبد خرید</span>
                      <Badge count={totalCount} />
                    </span>
                  </button>

                  <button
                    onClick={() => setOpen((v) => !v)}
                    aria-label="منو"
                    aria-expanded={open}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
                  >
                    <span className="relative block h-4 w-5">
                      <span
                        className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                          open ? 'top-1.5 rotate-45' : 'top-0'
                        }`}
                      />
                      <span
                        className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                          open ? 'opacity-0' : 'opacity-100'
                        }`}
                      />
                      <span
                        className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
                          open ? 'top-1.5 -rotate-45' : 'top-3'
                        }`}
                      />
                    </span>
                  </button>
                </div>
              </div>

              {/* منوی موبایل */}
              <div
                className={`grid overflow-hidden transition-all duration-300 md:hidden ${
                  open
                    ? 'grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="min-h-0">
                  <nav className="flex flex-col gap-1 border-t border-white/10 bg-black/20 p-3 backdrop-blur">
                    {navLinks.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setActive(item.href)
                          setOpen(false)
                        }}
                        className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                          active === item.href
                            ? 'bg-gradient-to-l from-brand-500/90 to-fuchsia-500/90 text-white'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="h-24" />
    </>
  )
}

/* ---------- زیرکامپوننت‌ها ---------- */

function Brand() {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(400px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <a
      ref={ref}
      href="#"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group flex items-center gap-2.5 transition-transform duration-150 will-change-transform"
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-fuchsia-500 text-xl shadow-lg shadow-brand-600/40 transition group-hover:-translate-y-0.5">
        🛍️
        <span className="absolute -inset-1 rounded-xl bg-gradient-to-br from-brand-500/40 to-fuchsia-500/40 opacity-0 blur transition group-hover:opacity-100" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="bg-gradient-to-l from-brand-400 via-fuchsia-400 to-amber-300 bg-clip-text text-lg font-extrabold tracking-tight text-transparent">
          شاپینو
        </span>
        <span className="text-[10px] font-medium text-gray-500">
          خرید سریع و امن
        </span>
      </span>
    </a>
  )
}

function CartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
    </svg>
  )
}

function Badge({ count }) {
  if (!count) return null
  return (
    <span
      key={count} // باعث ری‌مونت و انیمیشن تغییر عدد می‌شود
      className="relative flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-extrabold text-white ring-2 ring-gray-950 animate-[pop_.3s_ease-out]"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-rose-500/60" />
      <span className="relative">{count}</span>
    </span>
  )
}