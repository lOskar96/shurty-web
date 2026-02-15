import { Button } from 'antd'
import ThemeSwitcher from './ThemeSwitcher'
import LoginRegisterModal from './LoginRegisterModal'
import { useState } from 'react'
import UserAvatar from './UserAvatar'
import { useAppStore } from '@/zustand'
import { Image } from 'antd'
import Logo from '@/assets/images/shurty.png'
import { useNavigate } from 'react-router'

const Header = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const user = useAppStore((s) => s.user)
  return (
    <header className="flex justify-between items-center w-full h-16 border-b-2 border-transparent max-sm:pl-2 max-sm:pr-2 sm:pl-4 sm:pr-4 backdrop-blur-sm backdrop-brightness-100 sticky top-0 z-50">
      <img
        className="hover:cursor-pointer"
        src={Logo}
        preview={{ open: false }}
        width={100}
        onClick={() => navigate('/')}
      />
      <div className="flex gap-4 items-center">
        <ThemeSwitcher />
        {!user ? (
          <Button type="primary" onClick={() => setOpen(true)}>
            Iniciar Sesión
          </Button>
        ) : (
          <UserAvatar />
        )}
      </div>
      <LoginRegisterModal
        open={open}
        handleOk={() => setOpen(false)}
        handleCancel={() => setOpen(false)}
      />
    </header>
  )
}

export default Header
