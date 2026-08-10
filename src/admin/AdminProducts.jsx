import React, { useState } from 'react'
import { Plus, Pencil, Trash2, Star, X, Upload, Info } from 'lucide-react'
import { useProducts } from '../utils/ProductsContext.jsx'
import { useToast } from '../components/ToastContext.jsx'
import { CATEGORIES } from '../data/products.js'

const emptyForm = {
  name: '',
  price: '',
  originalPrice: '',
  category: CATEGORIES[0],
  description: '',
  stock: '',
  featured: false,
  images: [],
}

function ProductFormModal({ product, onClose, onSave }) {
  const [form, setForm] = useState(
    product
      ? { ...product, price: String(product.price), originalPrice: String(product.originalPrice), stock: String(product.stock) }
      : emptyForm
  )

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result)
            reader.readAsDataURL(file)
          })
      )
    ).then((dataUrls) => {
      setForm((f) => ({ ...f, images: [...f.images, ...dataUrls] }))
    })
  }

  const removeImage = (idx) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.price || !form.originalPrice || !form.stock) return
    onSave({
      ...form,
      price: Number(form.price),
      originalPrice: Number(form.originalPrice),
      stock: Number(form.stock),
      images: form.images.length > 0 ? form.images : ['https://picsum.photos/seed/placeholder/700/700'],
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-ivory rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-maroon/10 sticky top-0 bg-ivory">
          <h2 className="font-display text-xl font-semibold text-maroon">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="text-ink/40 hover:text-ink">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1.5">Product Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-maroon/15 outline-none text-sm focus:border-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1.5">Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2.5 rounded-xl border border-maroon/15 outline-none text-sm focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1.5">Original Price (₹) *</label>
              <input
                type="number"
                name="originalPrice"
                value={form.originalPrice}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2.5 rounded-xl border border-maroon/15 outline-none text-sm focus:border-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1.5">Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-maroon/15 outline-none text-sm focus:border-gold"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/70 mb-1.5">Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2.5 rounded-xl border border-maroon/15 outline-none text-sm focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1.5">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-maroon/15 outline-none text-sm focus:border-gold resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/70 mb-1.5">Product Images</label>
            <div className="flex flex-wrap gap-3 mb-3">
              {form.images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20">
                  <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              <label className="w-20 h-20 border-2 border-dashed border-maroon/20 rounded-lg flex items-center justify-center cursor-pointer hover:border-gold text-ink/40 hover:text-gold-dark">
                <Upload size={18} />
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            <p className="flex items-start gap-1.5 text-xs text-ink/40">
              <Info size={13} className="shrink-0 mt-0.5" />
              Images are stored locally in your browser for this demo version. For a live store, connect
              cloud image storage (e.g. Supabase/Firebase) so images persist across devices.
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm text-ink/70">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="w-4 h-4 accent-maroon"
            />
            Mark as Featured
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-full border border-maroon/20 text-ink/70 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-maroon hover:bg-maroon-dark text-ivory px-6 py-3 rounded-full font-medium"
            >
              {product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const { showToast } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const openAddModal = () => {
    setEditingProduct(null)
    setModalOpen(true)
  }

  const openEditModal = (product) => {
    setEditingProduct(product)
    setModalOpen(true)
  }

  const handleSave = (data) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data)
      showToast('Product updated', 'success')
    } else {
      addProduct(data)
      showToast('Product added', 'success')
    }
    setModalOpen(false)
  }

  const confirmDelete = () => {
    deleteProduct(deleteTarget.id)
    showToast('Product deleted', 'success')
    setDeleteTarget(null)
  }

  const toggleFeatured = (p) => updateProduct(p.id, { featured: !p.featured })

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-maroon">Products</h1>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-dark text-ivory px-5 py-2.5 rounded-full font-medium text-sm"
        >
          <Plus size={17} /> Add Product
        </button>
      </div>

      <div className="bg-ivory rounded-2xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink/50 border-b border-maroon/10 bg-cream/40">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-maroon/5 last:border-0">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={p.images?.[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-medium text-ink line-clamp-1 max-w-[160px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-ink/60">{p.category}</td>
                  <td className="py-3 px-4">₹{p.price}</td>
                  <td className="py-3 px-4">
                    <span className={p.stock <= 0 ? 'text-red-600' : p.stock <= 5 ? 'text-amber-600' : 'text-green-700'}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => toggleFeatured(p)} aria-label="Toggle featured">
                      <Star
                        size={18}
                        className={p.featured ? 'fill-gold text-gold' : 'text-ink/20'}
                      />
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-2 rounded-lg hover:bg-blush/50 text-maroon"
                        aria-label="Edit product"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(p)}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                        aria-label="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && (
          <p className="text-center text-ink/50 py-10 text-sm">No products yet. Add your first Rakhi!</p>
        )}
      </div>

      {modalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-ivory rounded-2xl w-full max-w-sm p-6 shadow-card text-center">
            <h3 className="font-display text-lg font-semibold text-ink mb-2">Delete Product?</h3>
            <p className="text-sm text-ink/60 mb-6">
              Are you sure you want to delete "{deleteTarget.name}"? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2.5 rounded-full border border-maroon/20 text-ink/70 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
