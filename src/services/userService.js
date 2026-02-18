import { useMutation, useQueryClient } from '@tanstack/react-query'
import fetchData from './fetchData'
import { useAppStore } from '@/zustand'

export const useChangeUsername = () => {
  const setUser = useAppStore((s) => s.setUser)
  return useMutation({
    mutationFn: ({ username, id }) =>
      fetchData({
        url: '/api/auth/changeUsername',
        options: {
          method: 'PUT',
          body: { username, id }
        }
      }),
    onSuccess: ({ user }) => {
      console.log(user)
      setUser(user)
    }
  })
}

export const useDeleteUser = () => {
  const logout = useAppStore((s) => s.logout)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }) =>
      fetchData({
        url: '/api/auth/deleteUser',
        options: { method: 'DELETE', body: { id } }
      }),
    onSuccess: () => {
      logout()
      queryClient.clear()
    }
  })
}
