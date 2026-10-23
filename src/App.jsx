import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Filters from './components/Filters'
import ProductGrid from './components/ProductGrid'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import { products } from './data/products'

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [category, setCategory] = useState('همه')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('default')

  const filtered = useMemo(() => {
    let list = products
    if (category !== 'همه') {
      list = list.filter((p) => p.category === category)
    }
    if (query.trim()) {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    }
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [category, query, sort])

  return (
    <div className="min-h-screen bg-gray-950 text-gray-900">
      <Navbar onOpenCart={() => setCartOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 pb-16">
        <Hero />

        <Filters
          category={category}
          setCategory={setCategory}
          query={query}
          setQuery={setQuery}
          sort={sort}
          setSort={setSort}
          resultCount={filtered.length}
        />

        <ProductGrid products={filtered} />
      </main>

      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}