import React, { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

let idCounter = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (message, type = 'success') => {
      const id = ++idCounter
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => removeToast(id), 3200)
    },
    [removeToast]
  )

  const icons = {
    success: <CheckCircle2 size={20} className="text-green-600 shrink-0" />,
    error: <XCircle size={20} className="text-red-600 shrink-0" />,
    info: <Info size={20} className="text-maroon shrink-0" />,
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-fadeUp flex items-start gap-2 bg-ivory border border-gold/30 shadow-card rounded-xl px-4 py-3"
            role="status"
          >
            {icons[t.type]}
            <p className="text-sm text-ink flex-1">{t.message}</p>
            <button
              onClick={() => removeToast(t.id)}
              aria-label="Dismiss notification"
              className="text-ink/40 hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
