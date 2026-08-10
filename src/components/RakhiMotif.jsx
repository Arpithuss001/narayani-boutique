import React from 'react'

// A hand-drawn-style SVG rakhi: a round pearl centrepiece on a braided thread,
// with a tassel hanging below. Used as the site's signature decorative motif.
export default function RakhiMotif({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 200 260"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* thread loop */}
      <path
        d="M40 60 C 20 90, 20 140, 40 165"
        stroke="#C99B3E"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M160 60 C 180 90, 180 140, 160 165"
        stroke="#C99B3E"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* central medallion */}
      <circle cx="100" cy="85" r="46" fill="#6E1423" />
      <circle cx="100" cy="85" r="46" fill="none" stroke="#C99B3E" strokeWidth="2.5" />
      <circle cx="100" cy="85" r="32" fill="none" stroke="#E4C77A" strokeWidth="1.5" />
      <circle cx="100" cy="85" r="10" fill="#E4C77A" />

      {/* petals around medallion */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const x = 100 + Math.cos(angle) * 40
        const y = 85 + Math.sin(angle) * 40
        return <circle key={i} cx={x} cy={y} r="5" fill="#F3D7DC" opacity="0.9" />
      })}

      {/* tassel strands */}
      {[70, 85, 100, 115, 130].map((x, i) => (
        <path
          key={i}
          d={`M${x} 165 L${x + (i % 2 === 0 ? -4 : 4)} 220`}
          stroke="#C99B3E"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}
      <circle cx="100" cy="165" r="6" fill="#C99B3E" />
    </svg>
  )
}
