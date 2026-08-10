// Sample product catalogue for Narayani Boutique.
// Images use a free placeholder image service (picsum.photos) seeded per-product
// so each product gets a consistent, unique-looking image with no API key required.
// Replace `images` with your own product photo URLs any time via the Admin Panel.

export const CATEGORIES = [
  'Traditional',
  'Designer',
  'Premium',
  'Kids',
  'Rudraksha',
  'Kundan',
  'Combo',
  'Handmade',
]

const img = (seed) => `https://picsum.photos/seed/${seed}/700/700`

export const initialProducts = [
  {
    id: 'p1',
    name: 'Royal Pearl Rakhi',
    price: 299,
    originalPrice: 399,
    category: 'Premium',
    description:
      'An elegant Rakhi adorned with lustrous faux pearls set on a rich maroon thread base. A timeless choice that feels as special as the bond it celebrates.',
    images: [img('royal-pearl-1'), img('royal-pearl-2')],
    stock: 24,
    featured: true,
  },
  {
    id: 'p2',
    name: 'Golden Rudraksha Rakhi',
    price: 249,
    originalPrice: 329,
    category: 'Rudraksha',
    description:
      'A sacred Rudraksha bead paired with gold-toned accents on a soft silk thread. Blends spirituality and elegance for a meaningful Raksha Bandhan.',
    images: [img('rudraksha-1'), img('rudraksha-2')],
    stock: 30,
    featured: true,
  },
  {
    id: 'p3',
    name: 'Designer Peacock Rakhi',
    price: 199,
    originalPrice: 259,
    category: 'Designer',
    description:
      'Inspired by the grace of the peacock, this hand-finished Rakhi features vibrant enamel work and delicate metal detailing.',
    images: [img('peacock-1'), img('peacock-2')],
    stock: 18,
    featured: true,
  },
  {
    id: 'p4',
    name: 'Premium Kundan Rakhi',
    price: 449,
    originalPrice: 599,
    category: 'Kundan',
    description:
      'Exquisite Kundan stones set in an intricate floral motif. A statement piece for siblings who deserve nothing but the finest.',
    images: [img('kundan-1'), img('kundan-2')],
    stock: 12,
    featured: true,
  },
  {
    id: 'p5',
    name: 'Traditional Mauli Rakhi',
    price: 99,
    originalPrice: 129,
    category: 'Traditional',
    description:
      'The classic sacred red-and-gold Mauli thread Rakhi, simple and auspicious, rooted in age-old tradition.',
    images: [img('mauli-1'), img('mauli-2')],
    stock: 50,
    featured: false,
  },
  {
    id: 'p6',
    name: 'Kids Cartoon Rakhi',
    price: 129,
    originalPrice: 169,
    category: 'Kids',
    description:
      'A playful, colourful Rakhi featuring a cheerful cartoon charm — made to bring a big smile to your little brother.',
    images: [img('kids-cartoon-1'), img('kids-cartoon-2')],
    stock: 40,
    featured: false,
  },
  {
    id: 'p7',
    name: 'Silver Charm Rakhi',
    price: 279,
    originalPrice: 349,
    category: 'Designer',
    description:
      'A sleek silver-toned charm Rakhi with a minimalist, modern silhouette for the contemporary sibling.',
    images: [img('silver-charm-1'), img('silver-charm-2')],
    stock: 22,
    featured: false,
  },
  {
    id: 'p8',
    name: 'Royal Brocade Rakhi',
    price: 349,
    originalPrice: 449,
    category: 'Premium',
    description:
      'Woven brocade fabric wrapped in regal maroon and gold, finished with a tasselled edge for a truly royal look.',
    images: [img('brocade-1'), img('brocade-2')],
    stock: 15,
    featured: false,
  },
  {
    id: 'p9',
    name: 'Floral Designer Rakhi',
    price: 219,
    originalPrice: 279,
    category: 'Designer',
    description:
      'Hand-painted floral motifs on a delicate base, bringing a fresh, feminine touch to festive tradition.',
    images: [img('floral-1'), img('floral-2')],
    stock: 28,
    featured: false,
  },
  {
    id: 'p10',
    name: 'Handmade Thread Rakhi',
    price: 149,
    originalPrice: 189,
    category: 'Handmade',
    description:
      'Lovingly hand-braided thread Rakhi made by local artisans — every knot tells a story of craftsmanship.',
    images: [img('handmade-1'), img('handmade-2')],
    stock: 35,
    featured: true,
  },
  {
    id: 'p11',
    name: 'Bhaiya Bhabhi Combo',
    price: 399,
    originalPrice: 499,
    category: 'Combo',
    description:
      'A beautifully paired Rakhi set for brother and sister-in-law — one regal Rakhi and one elegant Lumba, packed together.',
    images: [img('combo-1'), img('combo-2')],
    stock: 20,
    featured: true,
  },
  {
    id: 'p12',
    name: 'Elegant Stone Rakhi',
    price: 259,
    originalPrice: 329,
    category: 'Designer',
    description:
      'A refined Rakhi featuring a single statement stone at its centre, framed by fine metal filigree work.',
    images: [img('stone-1'), img('stone-2')],
    stock: 0,
    featured: false,
  },
]
