import { useRef, useState } from 'react'
import { useCart } from '../context/Cartcontext'

const faPrice = (n) => n.toLocaleString('fa-IR')

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const cardRef = useRef(null)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  // هالهٔ دنبال‌کنندهٔ موس
  const onMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const hasDiscount = product.oldPrice && product.oldPrice > product.price
  const discount = hasDiscount
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      className="group relative overflow-hidden rounded-2xl p-[1px] transition hover:-translate-y-1"
    >
      {/* حاشیهٔ گرادیانی که با هاور روشن می‌شود */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 opacity-70 transition group-hover:from-brand-500/60 group-hover:via-fuchsia-500/40 group-hover:to-amber-400/40" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] bg-gray-950/80 backdrop-blur-xl">
        {/* هالهٔ نورانی دنبال‌کنندهٔ موس */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(200px circle at var(--mx,50%) var(--my,50%), rgba(56,189,248,0.15), transparent 60%)',
          }}
        />

        {/* تصویر */}
        <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-gray-800/60 to-gray-900/60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.18),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(217,70,239,0.16),transparent_50%)] opacity-0 transition duration-500 group-hover:opacity-100" />
          <span className="relative text-6xl drop-shadow-[0_8px_24px_rgba(56,189,248,0.25)] transition duration-500 group-hover:scale-110 group-hover:-rotate-3">
            {product.image}
          </span>

          {/* بج امتیاز */}
          <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2 py-1 text-xs font-semibold text-amber-300 backdrop-blur">
            <span>⭐</span>
            <span>{product.rating}</span>
          </span>

          {/* بج تخفیف */}
          {hasDiscount && (
            <span className="absolute top-3 left-3 rounded-full bg-gradient-to-l from-rose-500 to-orange-400 px-2 py-1 text-xs font-extrabold text-white shadow-lg shadow-rose-500/30">
              {discount}٪ تخفیف
            </span>
          )}
        </div>

        {/* بدنه */}
        <div className="relative flex flex-1 flex-col gap-3 p-4">
          <div>
            <h3 className="font-bold text-white transition group-hover:text-brand-300">
              {product.title}
            </h3>
            <p className="mt-1 text-xs text-gray-500">{product.category}</p>
          </div>

          <div className="mt-auto flex items-end justify-between gap-2">
            <div className="flex flex-col">
              {hasDiscount && (
                <span className="text-xs text-gray-500 line-through">
                  {faPrice(product.oldPrice)}
                </span>
              )}
              <div className="bg-gradient-to-l from-brand-400 to-fuchsia-400 bg-clip-text text-lg font-extrabold text-transparent">
                {faPrice(product.price)}
                <span className="mr-1 text-xs font-normal text-gray-500">
                  تومان
                </span>
              </div>
            </div>

            <button
              onClick={handleAdd}
              type="button"
              className={`group/btn relative overflow-hidden rounded-xl px-3.5 py-2 text-sm font-bold text-white shadow-lg transition active:scale-95 ${
                added
                  ? 'bg-emerald-500 shadow-emerald-500/30'
                  : 'bg-gradient-to-l from-brand-500 to-fuchsia-500 shadow-brand-600/30 hover:brightness-110'
              }`}
            >
              {/* درخشش هاور */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
              <span className="relative flex items-center gap-1.5">
                {added ? (
                  <>
                    <CheckIcon />
                    <span>افزوده شد</span>
                  </>
                ) : (
                  <>
                    <PlusIcon />
                    <span>افزودن</span>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- آیکون‌ها ---------- */

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}