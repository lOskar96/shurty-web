import { useThemeManager } from '@/hooks/useThemeManager'

const Text = ({ value, fontSize, className }) => {
  const { activeTheme } = useThemeManager()
  return (
    <p
      style={{ fontSize: fontSize ? `${fontSize}px` : undefined }}
      className={`${activeTheme === 'dark' ? 'text-white' : 'text-black'} ${
        !fontSize ? 'text-2xl' : ''
      } ${className}`}
    >
      {value}
    </p>
  )
}

export default Text
