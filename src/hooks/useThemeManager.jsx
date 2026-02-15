import { useAppStore } from '@/zustand'
import { useEffect, useState } from 'react'

export const useThemeManager = () => {
  const theme = useAppStore((s) => s.theme)

  const [systemTheme, setSystemTheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => setSystemTheme(e.matches ? 'dark' : 'light')

    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [])

  const activeTheme = theme === 'system' ? systemTheme : theme

  return { activeTheme }
}
