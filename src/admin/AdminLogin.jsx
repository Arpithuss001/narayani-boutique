import React, { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { Lock, User, ArrowRight } from 'lucide-react'
import { ADMIN_CREDENTIALS } from '../config.js'
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/storage.js'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const isAuthed = loadFromStorage(STORAGE_KEYS.ADMIN_SESSION, false)
  if (isAuthed) return <Navigate to="/admin/dashboard" replace />

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      username.trim() === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      saveToStorage(STORAGE_KEYS.ADMIN_SESSION, true)
      navigate('/admin/dashboard')
    } else {
      setError('Invalid username or password.')
    }
  }

  return (
    <div className="min-h-screen bg-maroon-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-ivory rounded-2xl shadow-card p-8">
        <div className="text-center mb-6">
          <span className="text-4xl">🪢</span>
          <h1 className="font-display text-2xl font-semibold text-maroon mt-2">Narayani Boutique</h1>
          <p className="text-sm text-ink/50">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1.5">Username</label>
            <div className="relative">
              <User size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-maroon/15 outline-none text-sm focus:border-gold"
                placeholder="admin"
                autoFocus
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-maroon/15 outline-none text-sm focus:border-gold"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-maroon hover:bg-maroon-dark text-ivory px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Login <ArrowRight size={17} />
          </button>
        </form>

        <p className="text-xs text-ink/40 text-center mt-5">
          Default: <span className="font-mono">admin</span> / <span className="font-mono">admin123</span>
          <br />Change these in <span className="font-mono">src/config.js</span>
        </p>
        <Link to="/" className="block text-center text-xs text-maroon/70 hover:text-maroon mt-4">
          ← Back to Store
        </Link>
      </div>
    </div>
  )
}
