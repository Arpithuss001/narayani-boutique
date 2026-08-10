import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../utils/CartContext.jsx'
import { FREE_DELIVERY_THRESHOLD } from '../config.js'

export default function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal, deliveryCharge, total } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-5">🛍️</div>
        <h1 className="font-display text-3xl font-semibold text-maroon mb-2">Your cart is empty</h1>
        <p className="text-ink/60 mb-8">Looks like you haven't added any Rakhis yet. Let's fix that.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-dark text-ivory px-7 py-3.5 rounded-full font-medium shadow-card transition-colors"
        >
          <ShoppingBag size={18} /> Start Shopping
        </Link>
      </div>
    )
  }

  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-maroon mb-8 text-center">
        Your Cart
      </h1>

      {remainingForFreeDelivery > 0 && (
        <div className="bg-gold/15 border border-gold/40 text-maroon-dark text-sm text-center rounded-xl py-2.5 px-4 mb-8">
          Add items worth ₹{remainingForFreeDelivery} more to get{' '}
          <span className="font-semibold">FREE delivery</span>!
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-ivory rounded-2xl p-4 shadow-soft items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <Link
                  to={`/product/${item.id}`}
                  className="font-display font-semibold text-ink hover:text-maroon block truncate"
                >
                  {item.name}
                </Link>
                <p className="text-maroon font-semibold mt-1">₹{item.price}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-maroon/20 rounded-full">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-maroon hover:bg-blush/50 rounded-l-full"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-maroon hover:bg-blush/50 rounded-r-full"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-ink/40 hover:text-red-600 p-2"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="hidden sm:block font-semibold text-ink w-20 text-right">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-ivory rounded-2xl p-6 shadow-soft h-fit sticky top-24">
          <h2 className="font-display text-xl font-semibold text-ink mb-4">Order Summary</h2>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-ink/70">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-ink/70">
              <span>Delivery</span>
              <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
            </div>
            <div className="gold-divider my-2" />
            <div className="flex justify-between text-lg font-semibold text-maroon">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-maroon hover:bg-maroon-dark text-ivory px-6 py-3.5 rounded-full font-medium shadow-card transition-colors"
          >
            Proceed to Checkout <ArrowRight size={18} />
          </button>
          <Link
            to="/shop"
            className="block text-center text-sm text-maroon/80 hover:text-maroon mt-4"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
