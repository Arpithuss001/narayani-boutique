import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './storage.js'
import { DELIVERY_CHARGE, FREE_DELIVERY_THRESHOLD } from '../config.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadFromStorage(STORAGE_KEYS.CART, []))

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CART, items)
  }, [items])

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0],
          quantity,
        },
      ]
    })
  }

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
  }

  const clearCart = () => setItems([])

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : DELIVERY_CHARGE
  const total = subtotal + deliveryCharge
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        deliveryCharge,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
