import { LinkOutlined, SettingOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import Settings from './Settings'
import Links from './Links'
import { useAppStore } from '@/zustand'

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
  const nav = useAppStore((s) => s.nav)
  const setNav = useAppStore((s) => s.setNav)

  const handleMenuClick = (e) => {
    setNav(e.key)
  }

  const renderItem = () => {
    if (nav === 'links') {
      return <Links />
    } else if (nav === 'settings') {
      return <Settings />
    }
  }

  return (
    <div className="flex flex-col">
      <div className="sticky top-16 z-49">
        <Menu
          className="bg-transparent backdrop-blur-sm backdrop-brightness-100"
          style={{ backgroundColor: 'transparent' }}
          onClick={handleMenuClick}
          selectedKeys={[nav]}
          mode="horizontal"
          items={items}
        />
      </div>
      <div className="p-4">{renderItem()}</div>
    </div>
  )
}
export default MenuHandler
