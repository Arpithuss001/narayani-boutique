// Small wrapper around localStorage with JSON (de)serialization and safe fallbacks.

export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch (err) {
    console.error(`Failed to read "${key}" from storage`, err)
    return fallback
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error(`Failed to save "${key}" to storage`, err)
  }
}

export const STORAGE_KEYS = {
  PRODUCTS: 'nb_products',
  CART: 'nb_cart',
  ORDERS: 'nb_orders',
  ADMIN_SESSION: 'nb_admin_session',
}
