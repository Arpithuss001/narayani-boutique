import React from 'react'
import { Link } from 'react-router-dom'
import RakhiMotif from '../components/RakhiMotif.jsx'
import { MessageCircle, ShoppingBag } from 'lucide-react'
import { getWhatsAppGeneralUrl } from '../utils/whatsapp.js'

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
      <div className="grid md:grid-cols-[1fr_220px] gap-10 items-center mb-14">
        <div className="text-center md:text-left">
          <p className="uppercase tracking-[0.25em] text-xs text-gold-dark font-semibold">Our Story</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-maroon mt-2 mb-5">
            About Narayani Boutique
          </h1>
          <p className="text-ink/70 leading-relaxed mb-4">
            Narayani Boutique was born from a simple belief — that the thread tied on Raksha Bandhan
            should be as meaningful as the promise it carries. What started as a small collection made
            for family and friends has grown into a boutique loved by siblings across the country.
          </p>
          <p className="text-ink/70 leading-relaxed">
            Every Rakhi we offer is chosen and finished with care, blending traditional craftsmanship
            with contemporary design. Whether it's a humble Mauli thread or a statement Kundan piece,
            our promise stays the same: quality you can feel, and a bond worth celebrating.
          </p>
        </div>
        <div className="hidden md:flex justify-center">
          <RakhiMotif className="w-40 animate-sway" style={{ transformOrigin: 'top center' }} />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-14">
        {[
          { title: 'Handpicked', desc: 'Every design curated for quality and beauty.' },
          { title: 'Made with Care', desc: 'Thoughtfully packed for a special unboxing.' },
          { title: 'For Every Bond', desc: 'Traditional to premium — something for everyone.' },
        ].map((v) => (
          <div key={v.title} className="bg-ivory rounded-2xl p-6 shadow-soft text-center">
            <h3 className="font-display text-lg font-semibold text-maroon mb-1.5">{v.title}</h3>
            <p className="text-sm text-ink/60">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-blush/40 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-maroon mb-3">
          Ready to find the perfect Rakhi?
        </h2>
        <p className="text-ink/60 mb-6">Browse our collection or reach out to us directly on WhatsApp.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-dark text-ivory px-6 py-3 rounded-full font-medium shadow-card transition-colors"
          >
            <ShoppingBag size={17} /> Shop Now
          </Link>
          <a
            href={getWhatsAppGeneralUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-maroon text-maroon hover:bg-maroon hover:text-ivory px-6 py-3 rounded-full font-medium transition-colors"
          >
            <MessageCircle size={17} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
