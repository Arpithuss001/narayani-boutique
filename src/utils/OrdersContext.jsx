import React, { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot, addDoc, updateDoc, doc, query, orderBy } from 'firebase/firestore'

const OrdersContext = createContext(null)

export const ORDER_STATUSES = [
  'New',
  'Confirmed',
  'Packed',
  'Shipped',
  'Delivered',
  'Cancelled',
]

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('date', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setOrders(ordersData)
    }, (error) => {
      console.error("Error fetching orders:", error)
    })
    
    return () => unsubscribe()
  }, [])

  const addOrder = async (order) => {
    try {
      const newOrder = {
        ...order,
        date: new Date().toISOString(),
        status: 'New',
      }
      await addDoc(collection(db, 'orders'), newOrder)
      return newOrder
    } catch (error) {
      console.error("Error adding order:", error)
      throw error
    }
  }

  const updateOrderStatus = async (id, status) => {
    try {
      const orderRef = doc(db, 'orders', id)
      await updateDoc(orderRef, { status })
    } catch (error) {
      console.error("Error updating order status:", error)
    }
  }

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const ctx = useContext(OrdersContext)
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider')
  return ctx
}
