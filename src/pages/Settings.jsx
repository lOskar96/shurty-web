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
import useApiFetch from '@/hooks/useApiFetch'

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
  const logout = useAppStore((s) => s.logout)
  const setUser = useAppStore((s) => s.setUser)
  const theme = useAppStore((s) => s.theme)
  const urls = useAppStore((s) => s.urls)
  const [username, setUsername] = useState(user?.username)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const { fetchData } = useApiFetch()

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

    // Cabeceras del CSV
    const headers = [
      'originalUrl',
      'shortCode',
      'clicks',
      'description',
      'createdAt',
      'user'
    ]

    // Filas
    const rows = urls.map((item) =>
      headers
        .map((header) => {
          const value = item[header] ?? ''
          // Escapar comillas
          return `"${String(value).replace(/"/g, '""')}"`
        })
        .join(';')
    )

    // CSV final
    const csvContent = [headers.join(';'), ...rows].join('\n')

    // Crear y descargar archivo
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
    if (key === 'json') {
      exportToJSON()
    } else if (key === 'csv') {
      exportToCSV()
    }
  }

  const handleChangeUsername = async () => {
    const { user: userData } = await fetchData({
      url: '/auth/changeUsername',
      options: {
        method: 'PUT',
        body: { username, id: user.id }
      }
    })
    setUser(userData)
  }

  const handleDeleteUser = async () => {
    await fetchData({
      url: '/auth/deleteUser',
      options: { method: 'DELETE', body: { id: user.id } }
    })
    logout(null)
    setOpenDeleteModal(false)
  }

  return (
    <div className="max-sm:pl-2 max-sm:pr-2 sm:pl-42 sm:pr-42">
      <div
        className={`border-2 border-gray-300 rounded-2xl p-4 ${
          theme === 'dark' ? 'bg-[#1F1F1F]' : 'bg-gray-50'
        }`}
      >
        <Text value="Cuenta" className="mb-4" />
        <Form layout="vertical">
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
