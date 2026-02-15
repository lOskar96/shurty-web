import useApiFetch from '@/hooks/useApiFetch'
import { LockOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { Form } from 'antd'
import { Modal } from 'antd'
import { useState } from 'react'

const EditModal = ({
  open,
  handleClose,
  originalUrl,
  shortCode,
  description,
  id
}) => {
  const [url, setUrl] = useState(originalUrl)
  const [newDescription, setNewDescription] = useState(description)
  const { fetchData } = useApiFetch()
  const { TextArea } = Input

  const handleOk = async () => {
    try {
      await fetchData({
        url: `/editUrl`,
        options: {
          method: 'PUT',
          body: { id, originalUrl: url, description: newDescription }
        }
      })
      handleClose()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Modal
      open={open}
      onOk={handleOk}
      onCancel={handleClose}
      okText="Guardar"
      cancelText="Cancelar"
      title="Editar URL"
    >
      <Form layout="vertical">
        <Form.Item label="URL de origen">
          <Input
            defaultValue={originalUrl}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Código">
          <Input
            maxLength={6}
            defaultValue={shortCode}
            suffix={<LockOutlined />}
            disabled
          />
        </Form.Item>
        <Form.Item label="Descripción (opcional)">
          <TextArea
            placeholder="Descripción"
            defaultValue={description}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditModal
