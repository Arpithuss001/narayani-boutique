import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Eye } from 'lucide-react'
import { useCart } from '../utils/CartContext.jsx'
import { useToast } from './ToastContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const outOfStock = product.stock <= 0
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  const handleAdd = (e) => {
    e.preventDefault()
    if (outOfStock) return
    addToCart(product, 1)
    showToast(`${product.name} added to cart`, 'success')
  }

  return (
    <div className="group relative bg-ivory rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 thread-corner">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-blush/40">
          <img
            src={product.images?.[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-maroon text-ivory text-xs font-semibold px-2.5 py-1 rounded-full shadow-soft">
              {discount}% OFF
            </span>
          )}
          {outOfStock && (
            <span className="absolute inset-0 bg-ink/50 flex items-center justify-center text-ivory text-sm font-semibold tracking-wide">
              OUT OF STOCK
            </span>
          )}
          {product.featured && !outOfStock && (
            <span className="absolute top-3 right-3 bg-gold text-ivory text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full">
              Featured
            </span>
          )}

          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex">
            <button
              onClick={handleAdd}
              disabled={outOfStock}
              className="flex-1 bg-maroon hover:bg-maroon-dark disabled:bg-ink/30 text-ivory text-sm font-medium py-2.5 flex items-center justify-center gap-1.5"
            >
              <ShoppingBag size={15} /> Add to Cart
            </button>
            <span className="w-px bg-ivory/20" />
            <span className="flex-1 bg-maroon/90 hover:bg-maroon-dark text-ivory text-sm font-medium py-2.5 flex items-center justify-center gap-1.5">
              <Eye size={15} /> Details
            </span>
          </div>
        </div>

        <div className="p-4">
          <p className="text-[11px] uppercase tracking-wider text-gold-dark font-medium mb-1">
            {product.category}
          </p>
          <h3 className="font-display text-lg font-semibold text-ink leading-snug line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-maroon font-semibold">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-ink/40 text-sm line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <p className={`text-xs mt-1 ${outOfStock ? 'text-red-600' : 'text-green-700'}`}>
            {outOfStock ? 'Out of stock' : product.stock <= 5 ? `Only ${product.stock} left` : 'In stock'}
          </p>
        </div>
      </Link>
    </div>
  )
}
