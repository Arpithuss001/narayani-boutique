import React from 'react'
import { Navigate } from 'react-router-dom'
import { loadFromStorage, STORAGE_KEYS } from '../utils/storage.js'

export default function RequireAdminAuth({ children }) {
  const isAuthed = loadFromStorage(STORAGE_KEYS.ADMIN_SESSION, false)
  if (!isAuthed) {
    return <Navigate to="/admin" replace />
  }
  return children
}
