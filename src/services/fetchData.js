import { useAppStore } from '@/zustand'

const fetchData = async ({ url, options = {} }) => {
  const URL_BASE = import.meta.env.VITE_API_URL

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  }

  const res = await fetch(URL_BASE + url, {
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
    headers,
    credentials: 'include'
  })

  if (res.status === 401) useAppStore.getState().logout()

  const data = await res.json()
  if (!res.ok) throw data

  return data
}

export default fetchData
