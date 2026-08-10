import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useOrders, ORDER_STATUSES } from '../utils/OrdersContext.jsx'

const statusColors = {
  New: 'bg-blue-100 text-blue-700',
  Confirmed: 'bg-purple-100 text-purple-700',
  Packed: 'bg-amber-100 text-amber-700',
  Shipped: 'bg-indigo-100 text-indigo-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
}

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useOrders()
  const [expanded, setExpanded] = useState(null)

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-maroon mb-6">Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-ivory rounded-2xl shadow-soft py-16 text-center">
          <p className="text-4xl mb-3">📦</p>
          <p className="text-ink/50 text-sm">No orders yet. Orders placed on the store will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => {
            const isOpen = expanded === o.id
            return (
              <div key={o.id} className="bg-ivory rounded-2xl shadow-soft overflow-hidden">
                <button
                  onClick={() => setExpanded(isOpen ? null : o.id)}
                  className="w-full flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="font-mono text-xs text-ink/40">{o.id}</span>
                    <span className="font-medium text-ink">{o.customer.fullName}</span>
                    <span className="text-sm text-ink/50">{o.customer.mobile}</span>
                    <span className="text-sm text-ink/50">
                      {new Date(o.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-maroon">₹{o.total}</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[o.status] || 'bg-gray-100 text-gray-700'}`}>
                      {o.status}
                    </span>
                    {isOpen ? <ChevronUp size={18} className="text-ink/40" /> : <ChevronDown size={18} className="text-ink/40" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-maroon/10 px-5 py-4 grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-gold-dark font-semibold mb-2">
                        Delivery Address
                      </h4>
                      <p className="text-sm text-ink/70 leading-relaxed">
                        {o.customer.house}, {o.customer.area}<br />
                        {o.customer.city}, {o.customer.state} - {o.customer.pincode}
                      </p>
                      {o.customer.email && <p className="text-sm text-ink/70 mt-1">Email: {o.customer.email}</p>}
                      {o.customer.notes && (
                        <p className="text-sm text-ink/70 mt-2 italic">Notes: {o.customer.notes}</p>
                      )}

                      <h4 className="text-xs uppercase tracking-wider text-gold-dark font-semibold mt-4 mb-2">
                        Update Status
                      </h4>
                      <select
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                        className="px-3 py-2 rounded-lg border border-maroon/15 text-sm outline-none focus:border-gold"
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-gold-dark font-semibold mb-2">
                        Items
                      </h4>
                      <div className="space-y-2">
                        {o.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-ink/70">{item.name} × {item.quantity}</span>
                            <span className="font-medium">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                      <div className="gold-divider my-3" />
                      <div className="flex justify-between text-sm text-ink/70">
                        <span>Subtotal</span><span>₹{o.subtotal}</span>
                      </div>
                      <div className="flex justify-between text-sm text-ink/70">
                        <span>Delivery</span><span>{o.deliveryCharge === 0 ? 'FREE' : `₹${o.deliveryCharge}`}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-maroon mt-1">
                        <span>Total</span><span>₹{o.total}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
