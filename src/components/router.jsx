import { createBrowserRouter } from 'react-router'
import Home from '../pages/Home'

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />
  },
  {
    element: <PrivateRoutes />, // protección GRUPAL
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ]
  }
])

export default router
