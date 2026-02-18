import React, { useEffect } from 'react'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { useThemeManager } from '../hooks/useThemeManager'

export default function ThemeProvider({ children }) {
  const { activeTheme } = useThemeManager()

  useEffect(() => {
    const root = document.documentElement

    root.classList.add('theme-transition')

    const timeout = setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 350)

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
