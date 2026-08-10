import React, { createContext, useContext, useEffect, useState } from 'react'
import { initialProducts } from '../data/products.js'
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './storage.js'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() =>
    loadFromStorage(STORAGE_KEYS.PRODUCTS, initialProducts)
  )

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PRODUCTS, products)
  }, [products])

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: 'p' + Date.now(),
    }
    setProducts((prev) => [newProduct, ...prev])
    return newProduct
  }

  const updateProduct = (id, updates) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const decrementStock = (items) => {
    setProducts((prev) =>
      prev.map((p) => {
        const item = items.find((i) => i.id === p.id)
        if (!item) return p
        return { ...p, stock: Math.max(0, p.stock - item.quantity) }
      })
    )
  }

  const resetToSampleData = () => setProducts(initialProducts)

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        decrementStock,
        resetToSampleData,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider')
  return ctx
}
