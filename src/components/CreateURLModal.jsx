import useApiFetch from '@/hooks/useApiFetch'
import { Input, Modal, Form } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const CreateURLModal = ({ open, url, handleCancel, refreshURLs }) => {
  const { TextArea } = Input

  const [urlValue, setUrlValue] = useState(url)
  const [code, setCode] = useState(undefined)
  const [description, setDescription] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { fetchData } = useApiFetch()

  const handleOk = async ({ urlValue, code, description }) => {
    try {
      setLoading(true)
      const data = {
        originalUrl: urlValue,
        shortLink: code,
        description
      }
      await fetchData({
        url: '/shorten',
        options: { body: data, method: 'POST' }
      })
      navigate('/dashboard')
      refreshURLs()
    } catch (error) {
      console.log(error)
    } finally {
      handleCancel()
      setLoading(false)
    }
  }

  const handleModifyURL = (url) => {
    setUrlValue(url)
  }

  const handleModifyCode = (code) => {
    setCode(code)
  }

  useEffect(() => {
    setUrlValue(url)
  }, [url])

  return (
    <Modal
      title="Crear nueva URL"
      closable
      open={open}
      onOk={() => handleOk({ urlValue, code, description })}
      onCancel={handleCancel}
      destroyOnHidden
      okButtonProps={{
        disabled: !urlValue || (!!code && code.length !== 6),
        loading
      }}
    >
      <div>
        <Form layout="vertical">
          <Form.Item label="URL de origen">
            <Input
              defaultValue={url}
              placeholder="www.example.es"
              onChange={(e) => handleModifyURL(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Código personalizado (opcional)">
            <Input
              maxLength={6}
              count={{ show: true, max: 6 }}
              placeholder="Si dejas este campo vacio se generará un código aleatorio"
              onChange={(e) => handleModifyCode(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Descripción (opcional)">
            <TextArea
              placeholder="Descripción"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default CreateURLModal
