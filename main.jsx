import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ToastProvider } from './components/ToastContext.jsx'
import { CartProvider } from './utils/CartContext.jsx'
import { ProductsProvider } from './utils/ProductsContext.jsx'
import { OrdersProvider } from './utils/OrdersContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <ProductsProvider>
          <OrdersProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </OrdersProvider>
        </ProductsProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
