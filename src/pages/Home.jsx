import { Button, Input } from 'antd'
import Text from '../components/Text'
import { useState } from 'react'
import { Space } from 'antd'
import { LinkOutlined } from '@ant-design/icons'
import URLModalForm from '@/components/URLModalForm'
import LoginRegisterModal from '@/components/Header/LoginRegisterModal'
import { useCreateUrl } from '@/services/urlService'
import { useNavigate } from 'react-router'
import { useAppStore } from '@/zustand'
import { useEffect } from 'react'
import { useCallback } from 'react'

const Home = () => {
  const [openURLModal, setOpenURLModal] = useState(false)
  const [openLoginRegisterModal, setOpenLoginRegisterModal] = useState(false)
  const [url, setUrl] = useState('')
  const [createURLPayload, setCreateURLPayload] = useState(null)

  const { mutateAsync, isPending } = useCreateUrl()
  const navigate = useNavigate()
  const isAuthenticated = useAppStore((s) => s.isAuthenticated)

  const handleEnterInput = () => {
    console.log('entra')
    setOpenURLModal(true)
  }

  const handleLoginRegisterModalOk = async () => {
    setOpenLoginRegisterModal(false)

    if (createURLPayload) {
      await executeCreateURL(createURLPayload)
      setCreateURLPayload(null)
    }
  }

  const handleCreateURL = async ({ urlValue, code, description }) => {
    if (!isAuthenticated) {
      setCreateURLPayload({ urlValue, code, description })
      setOpenLoginRegisterModal(true)
      return
    }

    await executeCreateURL({ urlValue, code, description })
  }

  const executeCreateURL = useCallback(
    async ({ urlValue, code, description }) => {
      try {
        await mutateAsync({
          originalUrl: urlValue,
          shortLink: code,
          description
        })

        navigate('/dashboard')
      } catch (error) {
        console.log(error)
      } finally {
        setOpenURLModal(false)
      }
    },
    [mutateAsync, navigate]
  )

  useEffect(() => {
    console.log(openURLModal)
  }, [openURLModal])

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-230px)] text-center">
      <span className="animate-fadeUp pointer-events-none whitespace-pre-wrap bg-linear-to-b from-black to-white bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 h-[101px] mb-6 max-sm:text-6xl max-sm:h-[113px]">
        SHURTY
      </span>
      <Text
        className="animate-fadeDown text-sl text-2xl md:text-3xl mb-12 text-gray-500 text-center"
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

      <URLModalForm
        title="Crear nueva URL"
        open={openURLModal}
        originalUrl={url}
        handleCancel={() => setOpenURLModal(false)}
        handleFetch={handleCreateURL}
        isEdit={false}
        isPending={isPending}
      />
      <LoginRegisterModal
        open={openLoginRegisterModal}
        handleCancel={() => setOpenLoginRegisterModal(false)}
        handleOk={handleLoginRegisterModalOk}
        isRegister
      />
    </div>
  )
}

export default Home
