import { useAppStore } from '@/zustand'
import { message } from 'antd'
import { Input, Modal, Form, Button } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { login } from '@/services/authService'
const LoginRegisterModal = ({ open, handleCancel }) => {
  const navigate = useNavigate()
  const [registerMode, setRegisterMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: '',
    username: ''
  })

  const setUser = useAppStore((s) => s.setUser)

  const [messageApi, contextHolder] = message.useMessage()

  const URL = import.meta.env.VITE_API_URL
  const { Password } = Input
  const toggleRegisterMode = () => {
    setRegisterMode((prev) => !prev)
  }

  const handleLoginRegister = async () => {
    try {
      setLoading(true)
      let response
      if (registerMode) {
        response = await fetch(`${URL}/auth/register`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response.ok) {
          messageApi.open({
            type: 'success',
            content: 'Usuario registrado correctamente'
          })
          setRegisterMode(false)
        } else {
          messageApi.open({
            type: 'error',
            content: 'Error al registrar usuario'
          })
        }
      } else {
        response = await login(data.email, data.password)
        if (response) {
          messageApi.open({
            type: 'success',
            content: 'Usuario iniciado correctamente'
          })
          setUser({
            id: response.id,
            username: response.username,
            email: response.email,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt
          })
          navigate('/dashboard')
          handleCancel()
        } else {
          messageApi.open({
            type: 'error',
            content: 'Error al iniciar sesión'
          })
        }
      }
    } catch (error) {
      console.log(error)
      messageApi.open({
        type: 'error',
        content: `Error al iniciar sesión: ${error}`
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Crear nueva URL"
      closable
      open={open}
      onOk={handleLoginRegister}
      onCancel={handleCancel}
      destroyOnHidden
      okButtonProps={{ text: 'Crear' }}
      footer={[
        <Button key="cancel" onClick={toggleRegisterMode}>
          {registerMode ? 'Iniciar Sesión' : 'Registrarse'}
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={handleLoginRegister}
          loading={loading}
        >
          {!registerMode ? 'Iniciar Sesión' : 'Registrarse'}
        </Button>
      ]}
    >
      {contextHolder}
      <div>
        <Form layout="vertical">
          {registerMode && (
            <Form.Item label="Usuario">
              <Input
                placeholder="Username"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            </Form.Item>
          )}
          <Form.Item label="Correo electrónico">
            <Input
              placeholder="email@example.com"
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Contraseña">
            <Password
              placeholder="Password"
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
              onPressEnter={handleLoginRegister}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default LoginRegisterModal
