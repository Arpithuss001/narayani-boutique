export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    })
  }

  try {
    const { amount, currency = 'INR' } = req.body

    if (!amount || amount <= 0) {
      return res.status(400).json({
        error: 'Invalid amount',
      })
    }

    const keyId = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId || !keySecret) {
      return res.status(500).json({
        error: 'Razorpay keys are not configured',
      })
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64')

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: Math.round(Number(amount) * 100),
        currency,
        receipt: `rakhi_${Date.now()}`,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.description || 'Failed to create Razorpay order',
      })
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      error: 'Something went wrong while creating payment order',
    })
  }
}
