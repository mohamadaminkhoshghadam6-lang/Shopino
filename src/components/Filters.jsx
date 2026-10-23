import { categories } from '../data/products'

export default function Filters({
  category,
  setCategory,
  query,
  setQuery,
  sort,
  setSort,
  resultCount,
}) {
  const allCategory = categories[0] // فرض: اولین آیتم «همه» است؛ در غیر این صورت خودت تعیین کن
  const isFiltering =
    query.trim() !== '' || sort !== 'default' || category !== allCategory

  return (
    <section id="products" className="mb-6">
      <div className="relative overflow-hidden rounded-2xl p-[1px]">
        {/* حاشیهٔ گرادیانی */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/10" />

        <div className="relative overflow-hidden rounded-[15px] bg-gray-950/80 backdrop-blur-xl">
          {/* هاله‌های نورانی */}
          <div className="pointer-events-none absolute -top-20 -right-10 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-fuchsia-500/15 blur-3xl" />

          <div className="relative flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5">
            {/* چیپ‌های دسته‌بندی */}
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => {
                const isActive = category === c
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    type="button"
                    className={`group/chip relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'text-white shadow-lg shadow-brand-600/30'
                        : 'border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 bg-gradient-to-l from-brand-500 to-fuchsia-500" />
                    )}
                    {!isActive && (
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover/chip:translate-x-full" />
                    )}
                    <span className="relative">{c}</span>
                  </button>
                )
              })}
            </div>

            {/* جستجو و مرتب‌سازی */}
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* جستجو */}
              <div className="group relative">
                <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition group-focus-within:text-brand-400">
                  <SearchIcon />
                </span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="جستجوی محصول..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pr-10 pl-9 text-sm text-white placeholder-gray-500 outline-none transition focus:border-brand-500/60 focus:bg-white/10 focus:ring-2 focus:ring-brand-500/20 sm:w-64"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="پاک کردن جستجو"
                    className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full p-1 text-gray-500 transition hover:bg-white/10 hover:text-white"
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>

              {/* مرتب‌سازی */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 py-2 pr-9 pl-4 text-sm text-gray-200 outline-none transition hover:bg-white/10 focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/20 sm:w-auto"
                >
                  <option value="default" className="bg-gray-900">مرتب‌سازی: پیش‌فرض</option>
                  <option value="price-asc" className="bg-gray-900">ارزان‌ترین</option>
                  <option value="price-desc" className="bg-gray-900">گران‌ترین</option>
                  <option value="rating" className="bg-gray-900">بالاترین امتیاز</option>
                </select>
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">
                  <ChevronIcon />
                </span>
              </div>
            </div>
          </div>

          {/* نوار پایین: شمارنده + پاک کردن فیلتر */}
          <div className="relative flex items-center justify-between gap-3 border-t border-white/10 px-4 py-2.5 md:px-5">
            <p className="flex items-center gap-2 text-xs text-gray-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-400" />
              </span>
              <span className="font-semibold text-white">{resultCount}</span>
              محصول یافت شد
            </p>

            {isFiltering && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setSort('default')
                  setCategory(allCategory)
                }}
                className="group/clear flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-gray-400 transition hover:bg-white/5 hover:text-rose-300"
              >
                <CloseIcon />
                <span>پاک کردن فیلترها</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- آیکون‌ها ---------- */

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}