import { useEffect } from 'react'
import { useCart } from '../context/Cartcontext'

const faPrice = (n) => n.toLocaleString('fa-IR')

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, removeFromCart, totalPrice, clearCart } = useCart()

  // بستن با Escape + قفل اسکرول بدنه
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  const totalItems = items.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      {/* بک‌دراپ */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="سبد خرید"
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col overflow-hidden border-l border-white/10 bg-gray-950/95 text-gray-300 shadow-2xl shadow-black/50 backdrop-blur-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* خط گرادیانی سمت چپ */}
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-brand-500 via-fuchsia-500 to-amber-400 opacity-70" />

        {/* هاله‌های نورانی */}
        <div className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" />

        {/* هدر */}
        <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-fuchsia-500 text-lg shadow-lg shadow-brand-600/30">
              🛒
            </span>
            <div>
              <h2 className="text-base font-extrabold text-white">سبد خرید</h2>
              <p className="text-[11px] text-gray-500">
                {totalItems > 0 ? `${faPrice(totalItems)} قلم کالا` : 'خالی'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white"
            aria-label="بستن"
          >
            <CloseIcon />
          </button>
        </div>

        {/* محتوا */}
        <div className="relative flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-4xl">
                <span className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-brand-500/30 to-fuchsia-500/30 opacity-60 blur-xl" />
                <span className="relative animate-pulse">🛒</span>
              </div>
              <p className="font-bold text-white">سبد خرید خالی است</p>
              <p className="max-w-[16rem] text-sm text-gray-500">
                محصولی برای خرید انتخاب کنید تا اینجا نمایش داده شود.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((i) => (
                <li
                  key={i.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <div className="flex items-center gap-3">
                    {/* تصویر */}
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 text-3xl">
                      <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500/10 to-fuchsia-500/10 opacity-0 transition group-hover:opacity-100" />
                      <span className="relative transition group-hover:scale-110">
                        {i.image}
                      </span>
                    </div>

                    {/* اطلاعات */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-white">
                        {i.title}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {faPrice(i.price)} تومان
                      </p>

                      {/* کنترل تعداد */}
                      <div className="mt-2 inline-flex items-center gap-1 rounded-lg border border-white/10 bg-gray-900/60 p-1">
                        <button
                          onClick={() => updateQty(i.id, i.qty - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
                          disabled={i.qty <= 1}
                          aria-label="کاهش تعداد"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm font-bold text-white">
                          {faPrice(i.qty)}
                        </span>
                        <button
                          onClick={() => updateQty(i.id, i.qty + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 transition hover:bg-white/10 hover:text-white"
                          aria-label="افزایش تعداد"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* جمع ردیف + حذف */}
                    <div className="flex flex-col items-end justify-between self-stretch">
                      <button
                        onClick={() => removeFromCart(i.id)}
                        className="rounded-lg p-1.5 text-gray-500 transition hover:bg-rose-500/10 hover:text-rose-400"
                        aria-label="حذف"
                      >
                        <TrashIcon />
                      </button>
                      <span className="text-xs font-bold text-brand-300">
                        {faPrice(i.price * i.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* فوتر */}
        <div className="relative border-t border-white/10 bg-gray-950/80 p-4">
          {/* ریز جمع */}
          <div className="mb-3 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-gray-500">
              <span>تعداد اقلام</span>
              <span className="font-semibold text-gray-300">
                {faPrice(totalItems)} عدد
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">جمع کل</span>
              <span className="bg-gradient-to-l from-brand-400 to-fuchsia-400 bg-clip-text text-xl font-extrabold text-transparent">
                {faPrice(totalPrice)}
                <span className="mr-1 text-xs font-normal text-gray-500">
                  تومان
                </span>
              </span>
            </div>
          </div>

          <button
            disabled={items.length === 0}
            className="group/pay relative w-full overflow-hidden rounded-xl bg-gradient-to-l from-brand-500 to-fuchsia-500 py-3 text-sm font-extrabold text-white shadow-lg shadow-brand-600/30 transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            onClick={() => {
              alert('سفارش شما ثبت شد ✅')
              clearCart()
              onClose()
            }}
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/pay:translate-x-full" />
            <span className="relative flex items-center justify-center gap-2">
              <LockIcon />
              تکمیل خرید
            </span>
          </button>

          <p className="mt-2 text-center text-[10px] text-gray-600">
            پرداخت امن • ۷ روز ضمانت بازگشت
          </p>
        </div>
      </aside>
    </>
  )
}

/* ---------- آیکون‌ها ---------- */

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}