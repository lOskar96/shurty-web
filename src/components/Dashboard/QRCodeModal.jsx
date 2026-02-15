import { DownloadOutlined } from '@ant-design/icons'
import { Button, Modal, QRCode } from 'antd'
import { useRef } from 'react'
import Text from '../Text'
// import { useState } from 'react'

const QRCodeModal = ({ open, url, handleClose, shortCode }) => {
  const qrRef = useRef(null)

  const handleDownload = () => {
    if (!qrRef.current) return

    // AntD renderiza un canvas
    const canvas = qrRef.current.querySelector('canvas')
    if (!canvas) return

    const pngUrl = canvas.toDataURL('image/png')

    const link = document.createElement('a')
    link.href = pngUrl
    link.download = `qr_${shortCode}.png`
    link.click()
  }
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      title={<Text value="Código QR" />}
      footer={[
        <Button
          key="cancel"
          icon={<DownloadOutlined />}
          onClick={handleDownload}
        >
          Descargar QR
        </Button>,
        <Button key="ok" type="primary" onClick={handleClose}>
          Cerrar
        </Button>
      ]}
    >
      <div className="flex justify-center items-center flex-col">
        <div ref={qrRef}>
          <QRCode value={url} title={url} size={225} />
        </div>
        <Text value={url} className="text-center mb-4 mt-4 text-base" />
      </div>
    </Modal>
  )
}

export default QRCodeModal
