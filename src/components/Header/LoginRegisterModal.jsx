import { Input, Modal, Form, Button } from 'antd'
import { useState } from 'react'
import { useLogin, useRegister } from '@/services/authService'

const LoginRegisterModal = ({
  open,
  handleCancel,
  handleOk,
  isRegister = false
}) => {
  const [registerMode, setRegisterMode] = useState(isRegister)
  const [data, setData] = useState({
    email: '',
    password: '',
    username: ''
  })

  const { mutateAsync: register, isPending: registerPending } = useRegister()
  const { mutateAsync: login, isPending: loginPending } = useLogin()
  const { Password } = Input

  const toggleRegisterMode = () => {
    setRegisterMode((prev) => !prev)
  }

  const handleLoginRegister = async () => {
    try {
      if (registerMode) {
        await register(data)
        setRegisterMode(false)
      } else {
        const { email, password } = data
        await login({ email, password })
      }
      handleOk?.()
    } catch (e) {
      console.log(e)
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
          loading={registerPending || loginPending}
        >
          {!registerMode ? 'Iniciar Sesión' : 'Registrarse'}
        </Button>
      ]}
    >
      <div>
        <Form layout="vertical">
          {registerMode && (
            <Form.Item label="Usuario">
              <Input
                placeholder="Username"
                onChange={(e) =>
                  setData((prev) => ({ ...prev, username: e.target.value }))
                }
                autoComplete="username"
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
              autoComplete={registerMode ? 'new-password' : 'current-password'}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default LoginRegisterModal
