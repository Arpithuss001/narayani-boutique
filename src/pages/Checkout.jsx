import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { useCart } from '../utils/CartContext.jsx'
import { useProducts } from '../utils/ProductsContext.jsx'
import { useOrders } from '../utils/OrdersContext.jsx'
import { useToast } from '../components/ToastContext.jsx'
import { getWhatsAppOrderUrl } from '../utils/whatsapp.js'

const initialForm = {
  fullName: '',
  mobile: '',
  whatsapp: '',
  email: '',
  house: '',
  area: '',
  city: '',
  state: '',
  pincode: '',
  notes: '',
}

const requiredFields = ['fullName', 'mobile', 'house', 'area', 'city', 'state', 'pincode']

export default function Checkout() {
  const { items, subtotal, deliveryCharge, total, clearCart } = useCart()
  const { decrementStock } = useProducts()
  const { addOrder } = useOrders()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-5xl mb-4">🧾</p>
        <h1 className="font-display text-2xl font-semibold text-maroon mb-2">Nothing to check out</h1>
        <p className="text-ink/60 mb-6">Your cart is empty. Add a few Rakhis before checking out.</p>
        <Link to="/shop" className="text-maroon underline underline-offset-4 font-medium">
          Go to Shop
        </Link>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: null }))
  }

  const validate = () => {
    const errs = {}
    requiredFields.forEach((f) => {
      if (!form[f].trim()) errs[f] = 'Required'
    })
    if (form.mobile && !/^\d{10}$/.test(form.mobile.trim())) {
      errs.mobile = 'Enter a valid 10-digit mobile number'
    }
    if (form.pincode && !/^\d{6}$/.test(form.pincode.trim())) {
      errs.pincode = 'Enter a valid 6-digit pincode'
    }
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      errs.email = 'Enter a valid email'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleWhatsAppOrder = () => {
  if (!validate()) {
    showToast('Please fill in all required fields correctly', 'error')
    return
  }

  const customer = {
    ...form,
    whatsapp: form.whatsapp.trim() || form.mobile.trim(),
  }

  const order = addOrder({
    customer,
    items,
    subtotal,
    deliveryCharge,
    total,
  })

  decrementStock(items)

  const url = getWhatsAppOrderUrl({
    customer,
    items,
    subtotal,
    deliveryCharge,
    total,
  })

  window.open(url, '_blank', 'noopener,noreferrer')

  clearCart()
  showToast(`Order ${order.id} placed! Complete it on WhatsApp.`, 'success')
  navigate('/')
}

const handleRazorpayPayment = async () => {
  if (!validate()) {
    showToast('Please fill in all required fields correctly', 'error')
    return
  }

  try {
    const scriptLoaded = await new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => reject(new Error('Razorpay failed to load'))
      document.body.appendChild(script)
    })

    if (!scriptLoaded) {
      throw new Error('Razorpay could not be loaded')
    }

    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: total,
      }),
    })

    const orderData = await response.json()

    if (!response.ok) {
      throw new Error(orderData.error || 'Could not create payment order')
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Narayani Boutique',
      description: 'Rakhi Order',
      order_id: orderData.orderId,

      prefill: {
        name: form.fullName,
        email: form.email,
        contact: form.mobile,
      },

      notes: {
        address: `${form.house}, ${form.area}, ${form.city}, ${form.state} - ${form.pincode}`,
      },

      theme: {
        color: '#7A1F2B',
      },

      handler: function (paymentResponse) {
        const customer = {
          ...form,
          whatsapp: form.whatsapp.trim() || form.mobile.trim(),
        }

        const order = addOrder({
          customer,
          items,
          subtotal,
          deliveryCharge,
          total,
          paymentId: paymentResponse.razorpay_payment_id,
          razorpayOrderId: paymentResponse.razorpay_order_id,
          paymentStatus: 'paid',
        })

        decrementStock(items)

        showToast(
          `Payment successful! Order ${order.id} confirmed.`,
          'success'
        )

        clearCart()
        navigate('/')
      },

      modal: {
        ondismiss: function () {
          showToast('Payment cancelled.', 'error')
        },
      },
    }

    const razorpay = new window.Razorpay(options)

    razorpay.on('payment.failed', function () {
      showToast('Payment failed. Please try again.', 'error')
    })

    razorpay.open()
  } catch (error) {
    console.error(error)
    showToast(
      error.message || 'Unable to start payment. Please try again.',
      'error'
    )
  }
}

    const customer = {
      ...form,
      whatsapp: form.whatsapp.trim() || form.mobile.trim(),
    }

    const order = addOrder({
      customer,
      items,
      subtotal,
      deliveryCharge,
      total,
    })

    decrementStock(items)

    const url = getWhatsAppOrderUrl({ customer, items, subtotal, deliveryCharge, total })
    window.open(url, '_blank', 'noopener,noreferrer')

    clearCart()
    showToast(`Order ${order.id} placed! Complete it on WhatsApp.`, 'success')
    navigate('/')
  }

  const fields = [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true, span: 2 },
    { name: 'mobile', label: 'Mobile Number', type: 'tel', required: true },
    { name: 'whatsapp', label: 'WhatsApp Number (if different)', type: 'tel' },
    { name: 'email', label: 'Email (optional)', type: 'email', span: 2 },
    { name: 'house', label: 'House / Flat No.', type: 'text', required: true, span: 2 },
    { name: 'area', label: 'Area / Street', type: 'text', required: true, span: 2 },
    { name: 'city', label: 'City', type: 'text', required: true },
    { name: 'state', label: 'State', type: 'text', required: true },
    { name: 'pincode', label: 'Pincode', type: 'text', required: true },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-maroon mb-8 text-center">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-[1fr_340px] gap-8">
        <div className="bg-ivory rounded-2xl p-6 shadow-soft">
          <h2 className="font-display text-xl font-semibold text-ink mb-5">Delivery Details</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.name} className={f.span === 2 ? 'sm:col-span-2' : ''}>
                <label className="block text-sm font-medium text-ink/70 mb-1.5">
                  {f.label} {f.required && <span className="text-maroon">*</span>}
                </label>
                <input
                  type={f.type}
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border bg-cream/40 outline-none text-sm focus:border-gold ${
                    errors[f.name] ? 'border-red-400' : 'border-maroon/15'
                  }`}
                  placeholder={f.label}
                />
                {errors[f.name] && (
                  <p className="text-xs text-red-600 mt-1">{errors[f.name]}</p>
                )}
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-ink/70 mb-1.5">Order Notes (optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="E.g. Please pack carefully, gift wrap, etc."
                className="w-full px-4 py-3 rounded-xl border border-maroon/15 bg-cream/40 outline-none text-sm focus:border-gold resize-none"
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-ivory rounded-2xl p-6 shadow-soft h-fit sticky top-24">
          <h2 className="font-display text-xl font-semibold text-ink mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-56 overflow-y-auto pr-1 mb-4 scrollbar-none">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-ink/70 truncate pr-2">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium shrink-0">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="gold-divider my-2" />
          <div className="space-y-2.5 text-sm mt-3">
            <div className="flex justify-between text-ink/70">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-ink/70">
              <span>Delivery</span>
              <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
            </div>
            <div className="gold-divider my-2" />
            <div className="flex justify-between text-lg font-semibold text-maroon">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>


          <button
  onClick={handleRazorpayPayment}
  className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-maroon hover:bg-maroon-dark text-ivory px-6 py-3.5 rounded-full font-semibold shadow-card transition-colors"
>
  💳 Pay Online with Razorpay
</button>

          <button
            onClick={handleWhatsAppOrder}
            className="w-full mt-6 inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-ivory px-6 py-3.5 rounded-full font-semibold shadow-card transition-colors"
          >
            <MessageCircle size={19} /> Place Order on WhatsApp
          </button>
          <p className="text-xs text-ink/40 text-center mt-3">
            You'll be redirected to WhatsApp to confirm your order with us.
          </p>
        </div>
      </div>
    </div>
  )
}
