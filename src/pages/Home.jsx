import React from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, ShoppingBag, Gem, Sparkles, PackageCheck, Truck, Quote } from 'lucide-react'
import RakhiMotif from '../components/RakhiMotif.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useProducts } from '../utils/ProductsContext.jsx'
import { CATEGORIES } from '../data/products.js'
import { getWhatsAppGeneralUrl } from '../utils/whatsapp.js'

const categoryIcons = {
  Traditional: '🪢',
  Designer: '🎨',
  Premium: '💎',
  Kids: '🧸',
  Rudraksha: '📿',
  Kundan: '✨',
  Combo: '🎁',
  Handmade: '🧵',
}

const whyChooseUs = [
  { icon: Gem, title: 'Premium Quality', desc: 'Every Rakhi is crafted from finest materials, checked for quality before it reaches you.' },
  { icon: Sparkles, title: 'Beautiful Designs', desc: 'From traditional Mauli to designer Kundan — a curated collection for every taste.' },
  { icon: PackageCheck, title: 'Carefully Packed', desc: 'Each order is wrapped with care in protective, festive packaging.' },
  { icon: MessageCircle, title: 'Easy WhatsApp Ordering', desc: 'No confusing checkouts — place your order in one tap over WhatsApp.' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Quick, reliable delivery so your Rakhi reaches on time, every time.' },
]

const reviews = [
  { name: 'Ananya S.', text: 'The Rakhi was even more beautiful in person. Packaging felt so premium — my brother loved it!', rating: 5 },
  { name: 'Rohit M.', text: 'Ordering on WhatsApp was so simple. Got a confirmation within minutes. Highly recommend Narayani Boutique.', rating: 5 },
  { name: 'Priya K.', text: 'Loved the Kundan Rakhi — the quality is far better than what I expected for the price.', rating: 5 },
  { name: 'Devansh R.', text: 'Fast delivery and the combo set for my sister and brother-in-law was perfect. Will order again next year.', rating: 4 },
]

export default function Home() {
  const { products } = useProducts()
  const featured = products.slice(0, 8)

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blush/50 via-cream to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 md:pt-20 md:pb-28 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative z-10 text-center md:text-left animate-fadeUp">
            <p className="uppercase tracking-[0.3em] text-xs text-gold-dark font-semibold mb-4">
              Celebrate the Bond of Love
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-maroon leading-[1.1]">
              Narayani Boutique
            </h1>
            <p className="font-display italic text-xl sm:text-2xl text-maroon-light mt-3">
              "Tie a Little Love Around Every Wrist."
            </p>
            <p className="text-ink/70 mt-5 max-w-md mx-auto md:mx-0 leading-relaxed">
              Discover beautiful Rakhis crafted to celebrate the timeless bond between siblings.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-dark text-ivory px-7 py-3.5 rounded-full font-medium shadow-card transition-colors"
              >
                <ShoppingBag size={18} /> Shop Rakhis
              </Link>
              <a
                href={getWhatsAppGeneralUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-maroon text-maroon hover:bg-maroon hover:text-ivory px-7 py-3.5 rounded-full font-medium transition-colors"
              >
                <MessageCircle size={18} /> Order on WhatsApp
              </a>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full bg-gold/10 blur-2xl" />
            <RakhiMotif className="w-52 sm:w-64 md:w-80 drop-shadow-xl animate-sway" style={{ transformOrigin: 'top center' }} />
          </div>
        </div>
        <div className="gold-divider" />
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-10">
            <p className="uppercase tracking-[0.25em] text-xs text-gold-dark font-semibold">Handpicked</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-maroon mt-2">Featured Rakhis</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/shop" className="text-maroon font-medium underline underline-offset-4 hover:text-gold-dark">
              View All Rakhis →
            </Link>
          </div>
        </section>
      )}

      {/* SHOP BY CATEGORY */}
      <section className="bg-maroon-dark py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="uppercase tracking-[0.25em] text-xs text-gold font-semibold">Curated Collections</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-cream mt-2">Shop By Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to={`/shop?category=${encodeURIComponent(cat)}`}
                className="group bg-cream/5 hover:bg-gold/90 border border-gold/30 rounded-2xl p-6 text-center transition-colors"
              >
                <span className="text-3xl block mb-2">{categoryIcons[cat] || '🪢'}</span>
                <span className="text-cream group-hover:text-maroon-dark font-medium text-sm tracking-wide">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.25em] text-xs text-gold-dark font-semibold">Our Promise</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-maroon mt-2">Why Choose Us</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {whyChooseUs.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-ivory rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-blush flex items-center justify-center mb-4">
                <Icon size={22} className="text-maroon" />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink mb-1.5">{title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-blush/40 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="uppercase tracking-[0.25em] text-xs text-gold-dark font-semibold">Our Story</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-maroon mt-2 mb-6">
            About Narayani Boutique
          </h2>
          <p className="text-ink/70 leading-relaxed">
            Narayani Boutique was born from a simple belief — that the thread tied on Raksha Bandhan
            should be as meaningful as the promise it carries. Each Rakhi in our collection is chosen
            and finished with care, blending traditional craftsmanship with contemporary design, so
            every sibling finds a piece that feels made just for them. From humble Mauli threads to
            statement Kundan pieces, we celebrate every kind of bond, every kind of love.
          </p>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-10">
          <p className="uppercase tracking-[0.25em] text-xs text-gold-dark font-semibold">Loved By Customers</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-maroon mt-2">Customer Reviews</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="bg-ivory rounded-2xl p-6 shadow-soft relative">
              <Quote size={26} className="text-gold/40 mb-3" />
              <p className="text-sm text-ink/70 leading-relaxed mb-4">"{r.text}"</p>
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold text-maroon">{r.name}</span>
                <span className="text-gold text-sm">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
