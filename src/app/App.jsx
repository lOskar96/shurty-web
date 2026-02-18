import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache
} from '@tanstack/react-query'
import Header from '../components/Header/Header'
import ThemeProvider from '../components/ThemeProvider'
import { AppRoutes } from './routes'
import { message } from 'antd'

function App() {
  const [messageApi, contextHolder] = message.useMessage()

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        messageApi.error(error?.message || 'Error inesperado')
      }
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        messageApi.error(error?.message || 'Error inesperado')
      }
    })
  })
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <div className="app">
          {contextHolder}
          <Header />
          <AppRoutes />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
