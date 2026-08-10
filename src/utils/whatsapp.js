import { WHATSAPP_NUMBER } from '../config.js'

function formatCurrency(n) {
  return `₹${Number(n).toLocaleString('en-IN')}`
}

export function buildOrderMessage({ customer, items, subtotal, deliveryCharge, total }) {
  const lines = []

  lines.push('Hello Narayani Boutique! 🌸')
  lines.push('')
  lines.push('I would like to place an order.')
  lines.push('')
  lines.push('*CUSTOMER DETAILS*')
  lines.push('')
  lines.push(`Name: ${customer.fullName}`)
  lines.push(`Phone: ${customer.mobile}`)
  if (customer.whatsapp && customer.whatsapp !== customer.mobile) {
    lines.push(`WhatsApp: ${customer.whatsapp}`)
  }
  if (customer.email) lines.push(`Email: ${customer.email}`)
  lines.push(`Address: ${customer.house}, ${customer.area}`)
  lines.push(`City: ${customer.city}`)
  lines.push(`State: ${customer.state}`)
  lines.push(`Pincode: ${customer.pincode}`)
  lines.push('')
  lines.push('*ORDER DETAILS*')
  lines.push('')

  items.forEach((item, idx) => {
    lines.push(`${idx + 1}. ${item.name}`)
    lines.push(`   Quantity: ${item.quantity}`)
    lines.push(`   Price: ${formatCurrency(item.price)}`)
    lines.push(`   Total: ${formatCurrency(item.price * item.quantity)}`)
    lines.push('')
  })

  lines.push(`Subtotal: ${formatCurrency(subtotal)}`)
  lines.push(
    deliveryCharge === 0 ? 'Delivery: FREE' : `Delivery: ${formatCurrency(deliveryCharge)}`
  )
  lines.push(`TOTAL: ${formatCurrency(total)}`)

  if (customer.notes) {
    lines.push('')
    lines.push('Order Notes:')
    lines.push(customer.notes)
  }

  lines.push('')
  lines.push('Thank you ❤️')

  return lines.join('\n')
}

export function getWhatsAppOrderUrl(orderData) {
  const message = buildOrderMessage(orderData)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function getWhatsAppGeneralUrl(prefilledText = "Hello Narayani Boutique! I'd like to know more about your Rakhis.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilledText)}`
}
