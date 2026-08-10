import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'

import AdminLogin from './admin/AdminLogin.jsx'
import AdminLayout from './admin/AdminLayout.jsx'
import AdminDashboard from './admin/AdminDashboard.jsx'
import AdminProducts from './admin/AdminProducts.jsx'
import AdminOrders from './admin/AdminOrders.jsx'
import RequireAdminAuth from './admin/RequireAdminAuth.jsx'

function StoreLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StoreLayout><Home /></StoreLayout>} />
      <Route path="/shop" element={<StoreLayout><Shop /></StoreLayout>} />
      <Route path="/product/:id" element={<StoreLayout><ProductDetails /></StoreLayout>} />
      <Route path="/cart" element={<StoreLayout><Cart /></StoreLayout>} />
      <Route path="/checkout" element={<StoreLayout><Checkout /></StoreLayout>} />
      <Route path="/about" element={<StoreLayout><About /></StoreLayout>} />

      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <RequireAdminAuth>
            <AdminLayout><AdminDashboard /></AdminLayout>
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/products"
        element={
          <RequireAdminAuth>
            <AdminLayout><AdminProducts /></AdminLayout>
          </RequireAdminAuth>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <RequireAdminAuth>
            <AdminLayout><AdminOrders /></AdminLayout>
          </RequireAdminAuth>
        }
      />

      <Route path="*" element={<StoreLayout><NotFound /></StoreLayout>} />
    </Routes>
  )
}
