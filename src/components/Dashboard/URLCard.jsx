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
import URLModalForm from '../URLModalForm'
import { useEditUrl } from '@/services/urlService'
import { useCallback } from 'react'
import { useMemo } from 'react'
import { Tooltip } from 'antd'
import ClicksBadge from './ClicksBadge'
import URLCardDescription from './URLCardDescription'

const URL_API = import.meta.env.VITE_API_URL

const URLCard = ({
  originalUrl,
  shortCode,
  description,
  loading,
  icon,
  id,
  clicks,
  createdAt
}) => {
  const [messageApi, contextHolder] = message.useMessage()
  const date = new Date(createdAt).toLocaleDateString()
  const { mutateAsync, isPending } = useEditUrl()

  const [openQRModal, setOpenQRModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  const shortUrl = `${URL_API}/${shortCode}`

  const handleCopyLink = useCallback(async () => {
    await navigator.clipboard.writeText(shortUrl)
    messageApi.open({
      type: 'success',
      content: `${shortUrl} copiado al portapapeles`
    })
  }, [shortUrl, messageApi])

  const handleEditURL = useCallback(
    async ({ urlValue, description }) => {
      try {
        await mutateAsync({ id, url: urlValue, newDescription: description })
      } catch (e) {
        console.log(e)
      } finally {
        setOpenEditModal(false)
      }
    },
    [id, mutateAsync]
  )

  const actions = useMemo(
    () => [
      <QrcodeOutlined key="qrcode" onClick={() => setOpenQRModal(true)} />,
      <CopyOutlined key="copy" onClick={handleCopyLink} />,
      <EditOutlined key="edit" onClick={() => setOpenEditModal(true)} />,
      <DeleteOutlined key="delete" onClick={() => setOpenDeleteModal(true)} />
    ],
    [handleCopyLink]
  )

  const handleClickCard = useCallback(() => {
    window.open(shortUrl, '_blank', 'noopener,noreferrer')
  }, [shortUrl])

  return (
    <Card
      loading={loading}
      actions={actions}
      style={{ minWidth: 350, maxWidth: 350, maxHeight: loading && 146 }}
      title={'/' + shortCode}
      extra={<ClicksBadge clicks={clicks} />}
      hoverable
    >
      <Card.Meta
        avatar={<Avatar src={icon} />}
        title={
          <Tooltip title={originalUrl}>
            <span className="truncate block">{originalUrl}</span>
          </Tooltip>
        }
        onClick={handleClickCard}
        description={
          <URLCardDescription
            shortUrl={shortUrl}
            description={description}
            date={date}
          />
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
        handleClose={() => setOpenDeleteModal(false)}
        id={id}
      />
      <URLModalForm
        open={openEditModal}
        title="Editar URL"
        handleCancel={() => setOpenEditModal(false)}
        originalUrl={originalUrl}
        shortCode={shortCode}
        description={description}
        handleFetch={handleEditURL}
        isEdit
        isPending={isPending}
      />
      {contextHolder}
    </Card>
  )
}

export default URLCard
