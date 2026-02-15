import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  QrcodeOutlined
} from '@ant-design/icons'
import { Avatar } from 'antd'
import { Card } from 'antd'
import { useState } from 'react'
import QRCodeModal from './QRCodeModal'
import { message } from 'antd'
import DeleteModal from './DeleteModal'
import EditModal from './EditModal'
import Text from '../Text'

const URLCard = ({
  originalUrl,
  shortCode,
  description,
  loading,
  icon,
  id,
  refreshURLs,
  clicks,
  createdAt
}) => {
  const URL_API = import.meta.env.VITE_API_URL
  const [openQRModal, setOpenQRModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const date = new Date(createdAt).toLocaleDateString()

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(`${URL_API}/${shortCode}`)
    messageApi.open({
      type: 'success',
      content: `${URL_API}/${shortCode} copiado al portapapeles`
    })
  }

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
    refreshURLs()
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
    refreshURLs()
  }

  const actions = [
    <QrcodeOutlined key="qrcode" onClick={() => setOpenQRModal(true)} />,
    <CopyOutlined key="copy" onClick={handleCopyLink} />,
    <EditOutlined key="edit" onClick={() => setOpenEditModal(true)} />,
    <DeleteOutlined key="delete" onClick={() => setOpenDeleteModal(true)} />
  ]

  return (
    <Card
      loading={loading}
      actions={actions}
      style={{ minWidth: 350, maxWidth: 350, maxHeight: loading && 146 }}
      title={'/' + shortCode}
      extra={<a href="#">More</a>}
    >
      <Card.Meta
        avatar={<Avatar src={icon} />}
        title={originalUrl}
        description={
          <>
            <p>{`${URL_API}/${shortCode}`}</p>

            <div className="flex flex-row justify-between mt-2">
              <p className="truncate mr-3">{description}</p>
              <p>{date}</p>
            </div>
          </>
        }
      />
      <QRCodeModal
        open={openQRModal}
        url={`${URL_API}/${shortCode}`}
        handleClose={() => setOpenQRModal(false)}
        shortCode={shortCode}
      />
      <DeleteModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        id={id}
      />
      <EditModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        originalUrl={originalUrl}
        shortCode={shortCode}
        description={description}
        id={id}
      />
      {contextHolder}
    </Card>
  )
}

export default URLCard
