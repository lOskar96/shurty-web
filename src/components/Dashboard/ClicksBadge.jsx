import { BarChartOutlined } from '@ant-design/icons'

const ClicksBadge = ({ clicks }) => {
  const badgeColor =
    clicks > 100
      ? 'bg-green-100 text-green-700'
      : clicks > 20
        ? 'bg-yellow-100 text-yellow-700'
        : 'bg-gray-100 text-gray-700'

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full ${badgeColor}`}
    >
      <BarChartOutlined className="[&>svg]:h-5 [&>svg]:w-5" />

      <div className="flex flex-col leading-none items-center">
        <span className="text-sm font-semibold">{clicks}</span>
        <span className="text-[10px] opacity-50">
          {clicks === 1 ? 'click' : 'clicks'}
        </span>
      </div>
    </div>
  )
}

export default ClicksBadge
