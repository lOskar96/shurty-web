import { Modal } from 'antd'
import Text from '../Text'
import { WarningFilled } from '@ant-design/icons'
import { useDeleteUrl } from '@/services/urlService'

const DeleteModal = ({ open, handleClose, id }) => {
  const { mutateAsync } = useDeleteUrl()
  const handleDeleteURL = async () => {
    await mutateAsync({ id })
    handleClose()
  }
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      onOk={handleDeleteURL}
      title={
        <div className="flex items-center">
          <WarningFilled
            style={{ color: '#faad14', fontSize: 24, marginRight: 8 }}
          />
          <Text value="Eliminar URL" />
        </div>
      }
      okButtonProps={{ danger: true }}
      okText="Eliminar"
      cancelText="Cancelar"
    >
      <p>Estas a punto de eliminar esta URL, ¿Deseas continuar?</p>
    </Modal>
  )
}

export default DeleteModal
