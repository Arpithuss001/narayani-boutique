import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, MessageCircle, Mail, MapPin } from 'lucide-react'
import { STORE_INFO } from '../config.js'
import { getWhatsAppGeneralUrl } from '../utils/whatsapp.js'

export default function Footer() {
  return (
    <footer className="bg-maroon-dark text-cream mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl text-gold-light mb-2">{STORE_INFO.name}</h3>
          <p className="text-sm text-cream/70 leading-relaxed">{STORE_INFO.tagline}</p>
          <div className="flex items-center gap-2 mt-4 text-cream/70 text-sm">
            <MapPin size={16} className="text-gold shrink-0" />
            <span>{STORE_INFO.address}</span>
          </div>
        </div>

        <div>
          <h4 className="uppercase text-xs tracking-[0.2em] text-gold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li><Link to="/" className="hover:text-gold-light transition-colors">Home</Link></li>
            <li><Link to="/shop" className="hover:text-gold-light transition-colors">Shop</Link></li>
            <li><Link to="/about" className="hover:text-gold-light transition-colors">About</Link></li>
            <li><Link to="/cart" className="hover:text-gold-light transition-colors">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="uppercase text-xs tracking-[0.2em] text-gold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-cream/80">
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-gold" /> {STORE_INFO.email}
            </li>
            <li>
              <a
                href={getWhatsAppGeneralUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gold-light transition-colors"
              >
                <MessageCircle size={14} className="text-gold" /> WhatsApp Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="uppercase text-xs tracking-[0.2em] text-gold mb-4">Follow Us</h4>
          <div className="flex gap-3">
            <a
              href={STORE_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-maroon-dark transition-colors"
            >
              <Instagram size={18} />
            </a>
            <a
              href={getWhatsAppGeneralUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-maroon-dark transition-colors"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="gold-divider" />
      <p className="text-center text-xs text-cream/50 py-5">
        © {new Date().getFullYear()} {STORE_INFO.name}. Handcrafted with love for every bond.
      </p>
    </footer>
  )
}
