import URLCard from '@/components/Dashboard/URLCard'
import useApiFetch from '@/hooks/useApiFetch'
import { Button, Flex } from 'antd'
import { useEffect, useState } from 'react'
import { Input } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import CreateURLModal from '@/components/CreateURLModal'
import { useAppStore } from '@/zustand'

const Links = () => {
  const { fetchData } = useApiFetch()
  const [isSearching, setIsSearching] = useState(false)
  const urls = useAppStore((s) => s.urls)
  const setUrls = useAppStore((s) => s.setUrls)
  const [filteredUrls, setFilteredUrls] = useState([])
  const [openCreateModal, setOpenCreateModal] = useState(false)

  const searchLinks = (e) => {
    const str = e.target.value
    str ? setIsSearching(true) : setIsSearching(false)
    setFilteredUrls(
      urls.filter(
        (url) =>
          url.originalUrl?.includes(str) ||
          url.shortCode?.includes(str) ||
          url.description?.includes(str)
      )
    )
  }

  const fetchUrls = async () => {
    const response = await fetchData({
      url: '/',
      options: { method: 'GET' }
    })
    setUrls(response)
  }

  useEffect(() => {
    fetchUrls()
  }, [])

  return (
    <div className="max-sm:pl-2 max-sm:pr-2 sm:pl-42 sm:pr-42 duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      <div className="flex row mb-8">
        <Input
          className="max-w-75"
          placeholder="Buscar URL"
          onChange={searchLinks}
        />
        <Button
          icon={<PlusCircleOutlined />}
          className="max-w-1/2 ml-4"
          onClick={() => setOpenCreateModal(true)}
        >
          Crear nueva URL
        </Button>
      </div>
      <Flex wrap gap="middle" align="start">
        {(isSearching ? filteredUrls : urls)?.map?.((url) => (
          <URLCard
            key={url._id}
            originalUrl={url.originalUrl}
            shortCode={url.shortCode}
            description={url.description}
            icon={`${url.originalUrl}/favicon.ico`}
            loading={url.loading}
            id={url._id}
            clicks={url.clicks}
            createdAt={url.createdAt}
            refreshURLs={fetchUrls}
          />
        ))}
      </Flex>
      <CreateURLModal
        open={openCreateModal}
        handleCancel={() => setOpenCreateModal(false)}
        refreshURLs={fetchUrls}
      />
    </div>
  )
}
export default Links
