import { Button, Input } from 'antd'
import Text from '../components/Text'
import { useState } from 'react'
import CreateURLModal from '@/components/CreateURLModal'
import { Space } from 'antd'
import { LinkOutlined } from '@ant-design/icons'

const Home = () => {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')

  const URL = import.meta.env.VITE_API_URL

  const handleEnterInput = () => {
    setOpen(true)
  }

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-230px)] text-center">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-white bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 h-[101px] mb-6 max-sm:text-6xl max-sm:h-[113px]">
        SHURTY
      </span>
      <Text
        className="text-sl text-2xl md:text-3xl mb-12 text-gray-500 text-center"
        value="¿Tienes un enlace muy largo? Introdúcelo aquí y lo acortamos"
      />

      <Space.Compact className="w-full max-w-[823px] max-sm:w-[350px]">
        <Input
          className="w-1/2"
          value={url}
          size="large"
          onChange={(e) => setUrl(e.target.value)}
          onPressEnter={handleEnterInput}
          placeholder="Ingresa la URL a acortar"
        />
        <Button
          size="large"
          icon={<LinkOutlined />}
          onClick={handleEnterInput}
        />
      </Space.Compact>

      <CreateURLModal
        open={open}
        url={url}
        handleCancel={() => setOpen(false)}
      />
    </div>
  )
}

export default Home
