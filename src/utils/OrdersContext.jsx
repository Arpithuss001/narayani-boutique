import React, { createContext, useContext, useEffect, useState } from 'react'
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from './storage.js'

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
  const [orders, setOrders] = useState(() => loadFromStorage(STORAGE_KEYS.ORDERS, []))

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ORDERS, orders)
  }, [orders])

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: 'NB' + Date.now().toString().slice(-8),
      date: new Date().toISOString(),
      status: 'New',
    }
    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }

  const updateOrderStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
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
