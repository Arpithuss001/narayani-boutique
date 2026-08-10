import React from 'react'
import { Package, ClipboardList, IndianRupee, AlertTriangle, XCircle } from 'lucide-react'
import { useProducts } from '../utils/ProductsContext.jsx'
import { useOrders } from '../utils/OrdersContext.jsx'

export default function AdminDashboard() {
  const { products } = useProducts()
  const { orders } = useOrders()

  const totalProducts = products.length
  const totalOrders = orders.length
  const totalSales = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.total, 0)
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length
  const outOfStock = products.filter((p) => p.stock <= 0).length

  const stats = [
    { label: 'Total Products', value: totalProducts, icon: Package, color: 'bg-blush text-maroon' },
    { label: 'Total Orders', value: totalOrders, icon: ClipboardList, color: 'bg-gold/20 text-gold-dark' },
    { label: 'Total Sales', value: `₹${totalSales.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'bg-green-100 text-green-700' },
    { label: 'Low Stock', value: lowStock, icon: AlertTriangle, color: 'bg-amber-100 text-amber-700' },
    { label: 'Out of Stock', value: outOfStock, icon: XCircle, color: 'bg-red-100 text-red-700' },
  ]

  const recentOrders = orders.slice(0, 5)

  return (
    <div>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-maroon mb-6">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-ivory rounded-2xl p-5 shadow-soft">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${color}`}>
              <Icon size={18} />
            </div>
            <p className="text-2xl font-semibold text-ink">{value}</p>
            <p className="text-xs text-ink/50 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-ivory rounded-2xl p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold text-ink mb-4">Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-ink/50">No orders yet. Orders placed on the store will show up here.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink/50 border-b border-maroon/10">
                  <th className="py-2 pr-4">Order ID</th>
                  <th className="py-2 pr-4">Customer</th>
                  <th className="py-2 pr-4">Total</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-maroon/5 last:border-0">
                    <td className="py-2.5 pr-4 font-mono text-xs">{o.id}</td>
                    <td className="py-2.5 pr-4">{o.customer.fullName}</td>
                    <td className="py-2.5 pr-4">₹{o.total}</td>
                    <td className="py-2.5 pr-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-blush text-maroon">{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
