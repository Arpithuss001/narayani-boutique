import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../utils/CartContext.jsx'
import { STORE_INFO } from '../config.js'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=all', label: 'Categories' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-baseline gap-2 group" onClick={() => setOpen(false)}>
            <span className="font-display text-2xl md:text-3xl font-semibold text-maroon tracking-wide group-hover:text-maroon-dark transition-colors">
              {STORE_INFO.name}
            </span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-gold-dark">
              Boutique
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `text-sm tracking-wide font-medium transition-colors relative py-1 ${
                    isActive ? 'text-maroon' : 'text-ink/70 hover:text-maroon'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-3 py-2 rounded-full border border-maroon/20 hover:border-gold transition-colors"
              aria-label={`Cart with ${itemCount} items`}
            >
              <ShoppingBag size={18} className="text-maroon" />
              <span className="hidden sm:inline text-sm font-medium text-maroon">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-ivory text-[11px] font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-soft">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 text-maroon"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gold/20 bg-ivory">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-base border-b border-gold/10 last:border-0 ${
                    isActive ? 'text-maroon font-semibold' : 'text-ink/80'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
