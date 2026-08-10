import React, { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import { useProducts } from '../utils/ProductsContext.jsx'
import { CATEGORIES } from '../data/products.js'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
]

export default function Shop() {
  const { products } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || 'all')
  const [sort, setSort] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setCategory(cat)
  }, [searchParams])

  const filtered = useMemo(() => {
    let result = [...products]

    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      )
    }

    if (category !== 'all') {
      result = result.filter((p) => p.category === category)
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        result.sort((a, b) => (b.featured === true) - (a.featured === true))
    }

    return result
  }, [products, query, category, sort])

  const handleCategoryChange = (cat) => {
    setCategory(cat)
    setSearchParams(cat === 'all' ? {} : { category: cat })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="text-center mb-8">
        <p className="uppercase tracking-[0.25em] text-xs text-gold-dark font-semibold">Full Collection</p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-maroon mt-2">Shop Rakhis</h1>
      </div>

      {/* Search + Sort bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Rakhis by name..."
            className="w-full pl-11 pr-4 py-3 rounded-full border border-maroon/15 bg-ivory focus:border-gold outline-none text-sm"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-3 rounded-full border border-maroon/15 bg-ivory text-sm outline-none focus:border-gold"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              Sort: {o.label}
            </option>
          ))}
        </select>
        <button
          onClick={() => setShowFilters((s) => !s)}
          className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-maroon/15 bg-ivory text-sm"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        {/* Category filter sidebar */}
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="bg-ivory rounded-2xl p-5 shadow-soft sticky top-24">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="font-display text-lg font-semibold text-ink">Categories</h3>
              <button onClick={() => setShowFilters(false)} className="md:hidden text-ink/50">
                <X size={18} />
              </button>
            </div>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    category === 'all' ? 'bg-maroon text-ivory' : 'hover:bg-blush/50 text-ink/80'
                  }`}
                >
                  All Rakhis
                </button>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      category === cat ? 'bg-maroon text-ivory' : 'hover:bg-blush/50 text-ink/80'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product grid */}
        <div>
          <p className="text-sm text-ink/50 mb-4">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-ivory rounded-2xl shadow-soft">
              <p className="text-4xl mb-3">🔍</p>
              <h3 className="font-display text-xl text-ink font-semibold mb-1">No Rakhis found</h3>
              <p className="text-sm text-ink/50">Try a different search term or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
