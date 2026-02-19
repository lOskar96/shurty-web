import Text from '@/components/Text'
import { Button, Form } from 'antd'
import { useAppStore } from '@/zustand'
import { Input } from 'antd'
import {
  DownloadOutlined,
  SaveOutlined,
  ExportOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { useState } from 'react'
import { Dropdown } from 'antd'
import { Modal } from 'antd'
import { useUrls } from '@/services/urlService'
import { useDeleteUser } from '@/services/userService'
import { useChangeUsername } from '@/services/userService'

const items = [
  {
    key: 'csv',
    label: 'Descargar CSV'
  },
  {
    key: 'json',
    label: 'Descargar JSON'
  }
]

const Settings = () => {
  const user = useAppStore((s) => s.user)
  const theme = useAppStore((s) => s.theme)
  const { data: urls } = useUrls()
  const [username, setUsername] = useState(user?.username)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [form] = Form.useForm()

  const { mutate: changeUsername, isPending: isPendingChangeUsername } =
    useChangeUsername()
  const { mutateAsync: deleteUser } = useDeleteUser()

  const exportToJSON = () => {
    const blob = new Blob([JSON.stringify(urls)], {
      type: 'application/json'
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'links.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const exportToCSV = () => {
    if (!urls || !urls.length) return

    const headers = [
      'originalUrl',
      'shortCode',
      'clicks',
      'description',
      'createdAt',
      'user'
    ]

    const rows = urls.map((item) =>
      headers
        .map((header) => {
          const value = item[header] ?? ''
          return `"${String(value).replace(/"/g, '""')}"`
        })
        .join(';')
    )

    const csvContent = [headers.join(';'), ...rows].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'urls.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleExportLinks = ({ key }) => {
    key === 'json' ? exportToJSON() : exportToCSV()
  }

  const handleChangeUsername = async () => {
    changeUsername({ username, id: user.id })
  }

  const handleDeleteUser = async () => {
    await deleteUser({ id: user.id })
    setOpenDeleteModal(false)
  }

  return (
    <div className="max-sm:pl-2 max-sm:pr-2 sm:pl-42 sm:pr-42">
      <div
        className={`animate-fadeUp border-2 border-gray-300 rounded-2xl p-4 ${
          theme === 'dark' ? 'bg-[#1F1F1F]' : 'bg-gray-50'
        }`}
      >
        <Text value="Cuenta" className="mb-4" />
        <Form form={form} layout="vertical">
          <Form.Item label="Usuario">
            <div className="flex">
              <Input
                defaultValue={user?.username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button
                type="primary"
                icon={<SaveOutlined />}
                disabled={user?.username === username}
                onClick={handleChangeUsername}
                className="ml-2"
                loading={isPendingChangeUsername}
              >
                Guardar
              </Button>
            </div>
          </Form.Item>
          <Form.Item label="Exportar todos los links">
            <Dropdown
              menu={{ items, onClick: handleExportLinks }}
              trigger={['click']}
            >
              <Button type="primary" icon={<ExportOutlined />}>
                Exportar
              </Button>
            </Dropdown>
          </Form.Item>
          <Form.Item label="Eliminar cuenta">
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => setOpenDeleteModal(true)}
            >
              Borrar cuenta
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal
        title="Eliminar cuenta"
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        okText="Eliminar"
        cancelText="Cancelar"
        okButtonProps={{
          danger: true
        }}
        onOk={handleDeleteUser}
      >
        <Text
          value="¿Estás seguro de que quieres eliminar tu cuenta?"
          fontSize={16}
        />
        <Text value="Esta acción no se puede deshacer." fontSize={16} />
      </Modal>
    </div>
  )
}
export default Settings
