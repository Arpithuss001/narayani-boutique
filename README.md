# Narayani Boutique — Rakhi E-commerce Website

A complete, working Rakhi shopping website with product browsing, cart, WhatsApp checkout,
and an admin panel for managing products and orders. Built with React, Vite, and Tailwind CSS.

## 1. Before you run it — configure your WhatsApp number

Open `src/config.js` and replace the placeholder with your real WhatsApp number
(country code + number, no `+`, no spaces):

```js
export const WHATSAPP_NUMBER = '91XXXXXXXXXX'  // e.g. '919876543210'
```

In the same file you can also change your **admin login** (default `admin` / `admin123`),
delivery charge rules, and footer/social links.

## 2. Run it locally

```bash
npm install
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

- Store: `http://localhost:5173/`
- Admin panel: `http://localhost:5173/admin`

## 3. How it works

- All product, cart, and order data is stored in your browser's `localStorage` —
  no backend or database required to run it immediately.
- Product images uploaded through the Admin Panel are also stored in the browser
  (as base64) for this demo version. Because localStorage is per-browser, images
  and data added on one device/browser won't appear on another. For a permanent,
  multi-device store, connect a backend like Supabase or Firebase later — the code
  is structured (see `src/utils/ProductsContext.jsx`, `OrdersContext.jsx`) so you
  can swap the localStorage calls for real API calls without restructuring the app.
- Clicking **"Place Order on WhatsApp"** builds a complete order message and opens
  WhatsApp (`wa.me`) with it pre-filled, so the order lands directly in your chat.

## 4. Deploy to Vercel (easiest option)

1. Create a free account at [vercel.com](https://vercel.com) and a free
   [GitHub](https://github.com) account if you don't have one.
2. Push this project folder to a new GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Narayani Boutique website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/narayani-boutique.git
   git push -u origin main
   ```
3. On Vercel, click **Add New → Project**, import your GitHub repo, and click **Deploy**.
   Vercel auto-detects the Vite settings (Build Command: `npm run build`,
   Output Directory: `dist`) — you don't need to change anything.
4. Your site will be live at a `*.vercel.app` URL within a minute.

That's it — your Rakhi store is live! 🪢

## Project Structure

```
src/
  components/    Navbar, Footer, ProductCard, Toast notifications, decorative motif
  pages/         Home, Shop, ProductDetails, Cart, Checkout, About, NotFound
  admin/         Admin login, layout, dashboard, product & order management
  data/          Sample product catalogue
  utils/         Cart/Products/Orders state (Context + localStorage), WhatsApp message builder
  config.js      WhatsApp number, admin credentials, delivery rules — edit this first
```
