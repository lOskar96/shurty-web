import { useAppStore } from '../zustand'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import fetchData from './fetchData'

export const useRegister = () => {
  const setUser = useAppStore((s) => s.setUser)

  return useMutation({
    mutationFn: ({ username, email, password }) =>
      fetchData({
        url: '/api/auth/register',
        options: {
          method: 'POST',
          body: { username, email, password }
        }
      }),
    onSuccess: (data) => {
      setUser(data)
    }
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  const setUser = useAppStore((s) => s.setUser)

  return useMutation({
    mutationFn: ({ email, password }) =>
      fetchData({
        url: '/api/auth/login',
        options: {
          method: 'POST',
          body: { email, password }
        }
      }),
    onSuccess: (data) => {
      setUser(data)
      queryClient.invalidateQueries()
    }
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const logout = useAppStore((s) => s.logout)

  return useMutation({
    mutationFn: () =>
      fetchData({
        url: '/api/auth/logout',
        options: {
          method: 'POST'
        }
      }),
    onSuccess: () => {
      logout()
      queryClient.clear()
    }
  })
}

export const useRefreshUser = () => {
  const setUser = useAppStore((s) => s.setUser)

  return useMutation({
    mutationFn: () =>
      fetchData({
        url: '/api/auth/refresh',
        options: {
          method: 'POST'
        }
      }),
    onSuccess: (data) => {
      setUser(data)
    }
  })
}
