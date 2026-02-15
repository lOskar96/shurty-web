import React from 'react'
import { useAppStore } from '../../zustand'
import { DesktopOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Select } from 'antd'

const ThemeSwitcher = () => {
  const theme = useAppStore((s) => s.theme)
  const setTheme = useAppStore((s) => s.setTheme)

  return (
    <Select
      className="h-8"
      value={theme}
      onChange={setTheme}
      style={{ width: 140 }}
      menuItemSelectedIcon={
        theme === 'dark' ? (
          <MoonOutlined />
        ) : theme === 'light' ? (
          <SunOutlined />
        ) : (
          <DesktopOutlined />
        )
      }
      options={[
        { label: 'Sistema', value: 'system', icon: <DesktopOutlined /> },
        { label: 'Claro', value: 'light', icon: <SunOutlined /> },
        { label: 'Oscuro', value: 'dark', icon: <MoonOutlined /> }
      ]}
    />
  )
}

export default ThemeSwitcher
