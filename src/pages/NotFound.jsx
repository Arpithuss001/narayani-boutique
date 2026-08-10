import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl mb-5">🪢</p>
      <h1 className="font-display text-3xl font-semibold text-maroon mb-2">Page Not Found</h1>
      <p className="text-ink/60 mb-8">The page you're looking for doesn't exist or has moved.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-dark text-ivory px-7 py-3.5 rounded-full font-medium shadow-card transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
