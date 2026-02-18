import { Tooltip } from 'antd'

const URLCardDescription = ({ shortUrl, description, date }) => {
  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-500 truncate">{shortUrl}</p>

      <div className="flex justify-between items-center text-sm">
        <Tooltip title={description}>
          <p className="truncate mr-3 text-gray-700 dark:text-gray-300">
            {description}
          </p>
        </Tooltip>

        <span className="text-xs text-gray-400 whitespace-nowrap">{date}</span>
      </div>
    </div>
  )
}

export default URLCardDescription
