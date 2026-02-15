import { useState, useCallback } from 'react'
import { useAppStore } from '@/zustand'

const useApiFetch = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { logout } = useAppStore()

  const URL_BASE = import.meta.env.VITE_API_URL

  const fetchData = useCallback(
    async ({ url, options = {} }) => {
      setLoading(true)
      setError(null)

      try {
        const headers = {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
        const res = await fetch(URL_BASE + url, {
          ...options,
          body: JSON.stringify(options.body),
          headers,
          credentials: 'include'
        })
        res.statusText === 'Unauthorized' && logout()
        const data = await res.json()

        if (!res.ok) throw data
        return data
      } catch (err) {
        setError(err)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [URL_BASE]
  )

  return { fetchData, loading, error }
}

export default useApiFetch
