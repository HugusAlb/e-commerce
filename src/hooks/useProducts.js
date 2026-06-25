import { useState, useEffect } from 'react'
import { fetchProducts } from '../services/productsService'

export function useProducts(limit) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProducts(limit)
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [limit])

  return { products, loading, error, clearError: () => setError(null) }
}
