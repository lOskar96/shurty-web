import URLCard from '@/components/Dashboard/URLCard'
import { Button, Flex } from 'antd'
import { useState } from 'react'
import { Input } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useCreateUrl, useUrls } from '@/services/urlService'
import URLModalForm from '@/components/URLModalForm'

const Links = () => {
  const [isSearching, setIsSearching] = useState(false)
  const [filteredUrls, setFilteredUrls] = useState([])
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const { mutateAsync } = useCreateUrl()

  const { data: urls, isPending, refetch } = useUrls()

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

  const handleCreateURL = async ({ urlValue, code, description }) => {
    await mutateAsync({
      originalUrl: urlValue,
      shortLink: code,
      description: description
    })
    setOpenCreateModal(false)
  }

  return (
    <div className="max-sm:pl-2 max-sm:pr-2 sm:pl-28 sm:pr-28">
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
      <Flex wrap gap="middle" align="start" className="animate-fadeUp">
        {(isSearching ? filteredUrls : urls)?.map?.((url) => (
          <URLCard
            key={url._id}
            originalUrl={url.originalUrl}
            shortCode={url.shortCode}
            description={url.description}
            icon={`${url.originalUrl}/favicon.ico`}
            loading={isPending}
            id={url._id}
            clicks={url.clicks}
            createdAt={url.createdAt}
            refreshURLs={refetch}
          />
        ))}
      </Flex>
      <URLModalForm
        title="Crear nueva URL"
        open={openCreateModal}
        handleFetch={handleCreateURL}
        handleCancel={() => setOpenCreateModal(false)}
        isEdit={false}
      />
    </div>
  )
}
export default Links
