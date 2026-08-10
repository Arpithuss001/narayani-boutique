import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Zap, ChevronLeft } from 'lucide-react'
import { useProducts } from '../utils/ProductsContext.jsx'
import { useCart } from '../utils/CartContext.jsx'
import { useToast } from '../components/ToastContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products } = useProducts()
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const product = products.find((p) => p.id === id)
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4">🪢</p>
        <h1 className="font-display text-2xl font-semibold text-maroon mb-2">Product not found</h1>
        <p className="text-ink/60 mb-6">This Rakhi may have been removed or the link is incorrect.</p>
        <Link to="/shop" className="text-maroon underline underline-offset-4 font-medium">
          Back to Shop
        </Link>
      </div>
    )
  }

  const outOfStock = product.stock <= 0
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (outOfStock) return
    addToCart(product, quantity)
    showToast(`${quantity} × ${product.name} added to cart`, 'success')
  }

  const handleBuyNow = () => {
    if (outOfStock) return
    addToCart(product, quantity)
    navigate('/checkout')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-ink/60 hover:text-maroon mb-6"
      >
        <ChevronLeft size={16} /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-blush/40 shadow-soft">
            <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-maroon text-ivory text-xs font-semibold px-3 py-1.5 rounded-full">
                {discount}% OFF
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    activeImage === idx ? 'border-gold' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-wider text-gold-dark font-semibold mb-2">
            {product.category}
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-maroon mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-semibold text-maroon">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-ink/40 line-through">₹{product.originalPrice}</span>
                <span className="text-green-700 text-sm font-medium">Save {discount}%</span>
              </>
            )}
          </div>

          <p className="text-ink/70 leading-relaxed mb-6">{product.description}</p>

          <p className={`text-sm font-medium mb-6 ${outOfStock ? 'text-red-600' : 'text-green-700'}`}>
            {outOfStock ? 'Out of Stock' : `In Stock — ${product.stock} available`}
          </p>

          {!outOfStock && (
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-ink/70">Quantity</span>
              <div className="flex items-center border border-maroon/20 rounded-full">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-maroon hover:bg-blush/50 rounded-l-full"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="p-2.5 text-maroon hover:bg-blush/50 rounded-r-full"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-maroon text-maroon hover:bg-maroon hover:text-ivory disabled:opacity-40 disabled:cursor-not-allowed px-6 py-3.5 rounded-full font-medium transition-colors"
            >
              <ShoppingBag size={18} /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={outOfStock}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-maroon hover:bg-maroon-dark disabled:opacity-40 disabled:cursor-not-allowed text-ivory px-6 py-3.5 rounded-full font-medium shadow-card transition-colors"
            >
              <Zap size={18} /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-maroon mb-6 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
