import { Avatar, Dropdown } from 'antd'
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  DashboardOutlined
} from '@ant-design/icons'
import { useAppStore } from '@/zustand'
import { useNavigate } from 'react-router'
import { useLogout } from '@/services/authService'

const items = [
  {
    key: 'home',
    label: 'Home',
    icon: <HomeOutlined />
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardOutlined />
  },
  {
    key: 'profile',
    label: 'Mi perfil',
    icon: <UserOutlined />
  },
  {
    key: 'logout',
    label: 'Cerrar sesión',
    icon: <LogoutOutlined />
  }
]

const UserAvatar = () => {
  const { user } = useAppStore()
  const { mutate } = useLogout()

  const navigate = useNavigate()

  const handleClick = ({ key }) => {
    if (key === 'home') {
      navigate('/')
    } else if (key === 'dashboard') {
      navigate('/dashboard')
    } else if (key === 'logout') {
      mutate()
      navigate('/')
    }
  }

  return (
    <Dropdown menu={{ items, onClick: handleClick }} trigger={['click']}>
      <Avatar
        size={48}
        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user.username}`}
        style={{
          cursor: 'pointer',
          transition: 'transform .15s ease'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.07)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
      />
    </Dropdown>
  )
}

export default UserAvatar
