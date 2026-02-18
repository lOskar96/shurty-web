import { Input, Modal, Form } from 'antd'
import { useEffect } from 'react'
import { LockOutlined } from '@ant-design/icons'
import { useState } from 'react'

const URLModalForm = ({
  open,
  originalUrl,
  shortCode,
  description,
  handleCancel,
  handleFetch,
  title,
  isPending,
  isEdit
}) => {
  const [isFormValid, setIsFormValid] = useState(false)
  const { TextArea } = Input
  const [form] = Form.useForm()

  const handleOk = async () => {
    try {
      const { urlValue, code, description } = await form.validateFields()
      handleFetch({ urlValue, code, description })
    } catch (e) {
      console.log('Error de validación:', e)
    }
  }

  const checkFormValid = () => {
    const hasErrors = form
      .getFieldsError()
      .some((field) => field.errors.length > 0)
    setIsFormValid(!hasErrors)
  }

  useEffect(() => {
    if (!open) return
    form.setFieldsValue({
      urlValue: originalUrl,
      code: shortCode,
      description
    })

    form
      .validateFields(['urlValue'])
      .then(() => setIsFormValid(true))
      .catch(() => setIsFormValid(false))
  }, [open, originalUrl, shortCode, description, form])

  return (
    <Modal
      title={title}
      closable={false}
      open={open}
      onOk={() => handleOk()}
      onCancel={() => handleCancel()}
      destroyOnHidden
      okButtonProps={{
        loading: isPending,
        disabled: !isFormValid
      }}
    >
      <div>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ urlValue: originalUrl }}
          onFieldsChange={checkFormValid}
        >
          <Form.Item
            label="URL de origen"
            name="urlValue"
            rules={[{ required: true, message: 'Introduce la URL' }]}
          >
            <Input placeholder="www.example.es" />
          </Form.Item>
          <Form.Item
            label={`Código personalizado ${!isEdit ? '(opcional)' : ''}`}
            name="code"
            rules={[
              {
                len: 6,
                message: 'El código debe tener 6 caracteres',
                type: 'string'
              }
            ]}
          >
            {isEdit ? (
              <Input
                maxLength={6}
                placeholder="Si dejas este campo vacio se generará un código aleatorio"
                suffix={<LockOutlined />}
                disabled
              />
            ) : (
              <Input
                maxLength={6}
                count={{ show: true, max: 6 }}
                placeholder="Si dejas este campo vacio se generará un código aleatorio"
              />
            )}
          </Form.Item>
          <Form.Item
            label={`Descripción ${!isEdit ? '(opcional)' : ''}`}
            name="description"
          >
            <TextArea placeholder="Descripción" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default URLModalForm
