import useApiFetch from '@/hooks/useApiFetch'
import { useAppStore } from '@/zustand'
import { LinkOutlined, SettingOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react'
import Settings from './Settings'
import Links from './Links'

const items = [
  {
    label: 'Links',
    key: 'links',
    icon: <LinkOutlined className="hover:rotate-8 duration-300" />
  },
  {
    label: 'Ajustes',
    key: 'settings',
    icon: <SettingOutlined className="hover:rotate-8 duration-300" />
  }
]

const MenuHandler = () => {
  const [current, setCurrent] = useState('links')
  const { fetchData } = useApiFetch()
  const setUrls = useAppStore((s) => s.setUrls)

  const handleMenuClick = (e) => {
    setCurrent(e.key)
  }

  const renderItem = () => {
    if (current === 'links') {
      return <Links />
    } else if (current === 'settings') {
      return <Settings />
    }
  }

  useEffect(() => {
    const fetchUrls = async () => {
      const response = await fetchData({
        url: '/',
        options: { method: 'GET' }
      })
      setUrls(response)
    }

    fetchUrls()
  }, [fetchData, setUrls])

  return (
    <div className="flex flex-col">
      <div className="sticky top-16 z-49">
        <Menu
          className="bg-transparent backdrop-blur-sm backdrop-brightness-100"
          style={{ backgroundColor: 'transparent' }}
          onClick={handleMenuClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </div>
      <div className="p-4">{renderItem()}</div>
    </div>
  )
}
export default MenuHandler
