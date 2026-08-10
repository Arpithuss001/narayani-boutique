import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ClipboardList, LogOut, Menu, X, Store } from 'lucide-react'
import { saveToStorage, STORAGE_KEYS } from '../utils/storage.js'

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ClipboardList },
]

export default function AdminLayout({ children }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    saveToStorage(STORAGE_KEYS.ADMIN_SESSION, false)
    navigate('/admin')
  }

  const SidebarContent = () => (
    <>
      <div className="px-5 py-6">
        <Link to="/admin/dashboard" className="font-display text-xl font-semibold text-gold-light">
          Narayani Admin
        </Link>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? 'bg-gold text-maroon-dark' : 'text-cream/80 hover:bg-cream/10'
              }`
            }
          >
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 pb-6 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-cream/80 hover:bg-cream/10"
        >
          <Store size={18} /> View Store
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-cream/80 hover:bg-cream/10"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-maroon-dark flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-maroon-dark flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <header className="md:hidden flex items-center justify-between bg-maroon-dark text-cream px-4 py-4">
          <span className="font-display text-lg font-semibold">Narayani Admin</span>
          <button onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </header>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  )
}
