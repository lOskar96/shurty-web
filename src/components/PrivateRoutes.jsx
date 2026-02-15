import { Outlet, Navigate } from 'react-router'
import { useAppStore } from '@/zustand'

export default function PrivateRoutes() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />
}
