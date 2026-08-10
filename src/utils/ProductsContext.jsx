import React, { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc, getDoc, writeBatch } from 'firebase/firestore'
import { initialProducts } from '../data/products.js'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      if (snapshot.empty) {
        // Automatically populate with initialProducts if database is empty
        resetToSampleData()
      } else {
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setProducts(productsData)
      }
    }, (error) => {
      console.error("Error fetching products:", error)
    })
    
    return () => unsubscribe()
  }, [])

  const addProduct = async (product) => {
    try {
      const id = 'p' + Date.now()
      const newProduct = { ...product, id }
      await setDoc(doc(db, 'products', id), newProduct)
      return newProduct
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  const updateProduct = async (id, updates) => {
    try {
      const productRef = doc(db, 'products', id)
      await updateDoc(productRef, updates)
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id))
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const decrementStock = async (items) => {
    try {
      const batch = writeBatch(db)
      items.forEach(item => {
        const productRef = doc(db, 'products', item.id)
        const currentProduct = products.find(p => p.id === item.id)
        if (currentProduct) {
          const newStock = Math.max(0, currentProduct.stock - item.quantity)
          batch.update(productRef, { stock: newStock })
        }
      })
      await batch.commit()
    } catch (error) {
      console.error("Error decrementing stock:", error)
    }
  }

  const resetToSampleData = async () => {
    try {
      const batch = writeBatch(db)
      initialProducts.forEach(product => {
        const productRef = doc(db, 'products', product.id)
        batch.set(productRef, product)
      })
      await batch.commit()
    } catch (error) {
      console.error("Error resetting sample data:", error)
    }
  }

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
