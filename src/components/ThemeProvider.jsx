import React, { useEffect } from 'react'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { useThemeManager } from '../hooks/useThemeManager'

export default function ThemeProvider({ children }) {
  const { activeTheme } = useThemeManager()

  useEffect(() => {
    const root = document.documentElement

    // Añadir clase de transición
    root.classList.add('theme-transition')

    // Quitar después de 300ms (duración de la transición CSS)
    const timeout = setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 350)

    // Aplicar tema tailwind
    root.classList.remove('light', 'dark')
    root.classList.add(activeTheme)

    return () => clearTimeout(timeout)
  }, [activeTheme])

  return (
    <ConfigProvider
      theme={{
        algorithm:
          activeTheme === 'dark'
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm
      }}
    >
      {children}
    </ConfigProvider>
  )
}
