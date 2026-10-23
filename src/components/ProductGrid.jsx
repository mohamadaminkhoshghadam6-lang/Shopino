import ProductCard from './ProductCard'

export default function ProductGrid({ products, onClearFilters }) {
  if (products.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl p-[1px]">
        {/* حاشیهٔ گرادیانی */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10" />

        <div className="relative flex flex-col items-center gap-3 overflow-hidden rounded-[15px] bg-gray-950/80 px-6 py-16 text-center backdrop-blur-xl">
          {/* هاله‌های نورانی */}
          <div className="pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-0 h-40 w-40 rounded-full bg-fuchsia-500/15 blur-3xl" />

          {/* آیکون در دایرهٔ شیشه‌ای */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-4xl shadow-lg shadow-black/30">
            <span className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-brand-500/30 to-fuchsia-500/30 opacity-60 blur-xl" />
            <span className="relative animate-pulse">🔍</span>
          </div>

          <p className="mt-2 text-lg font-extrabold text-white">
            محصولی یافت نشد
          </p>
          <p className="max-w-sm text-sm leading-6 text-gray-400">
            فیلترها یا عبارت جستجو را تغییر دهید تا نتایج بیشتری ببینید.
          </p>

          {onClearFilters && (
            <button
              onClick={onClearFilters}
              type="button"
              className="group/btn relative mt-3 overflow-hidden rounded-xl bg-gradient-to-l from-brand-500 to-fuchsia-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-600/30 transition hover:brightness-110 active:scale-95"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
              <span className="relative">پاک کردن فیلترها</span>
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* شبکهٔ پس‌زمینه محو */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15] [background-image:linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {products.map((p, i) => (
          <div
            key={p.id}
            className="animate-[fadeUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${Math.min(i, 12) * 60}ms` }}
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  )
}