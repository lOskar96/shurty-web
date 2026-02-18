import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import fetchData from './fetchData'
import { useAppStore } from '../zustand'

export const useUrls = () => {
  const { id } = useAppStore((s) => s.user)

  return useQuery({
    queryKey: ['urls', id],
    queryFn: () =>
      fetchData({
        url: '/api',
        options: { method: 'GET' }
      }),
    staleTime: 1000 * 60 * 5 // 5 minutos en cache
  })
}

export const useCreateUrl = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => {
      const cleanPayload = Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== '')
      )

      return fetchData({
        url: '/api/shorten',
        options: { body: cleanPayload, method: 'POST' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['urls'] })
    }
  })
}

export const useEditUrl = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, url, newDescription }) =>
      fetchData({
        url: `/api/editURL`,
        options: {
          method: 'PUT',
          body: { id, originalUrl: url, description: newDescription }
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['urls'] })
    }
  })
}

export const useDeleteUrl = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }) =>
      fetchData({
        url: `/api/removeURL/${id}`,
        options: { method: 'DELETE' }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['urls'] })
    }
  })
}
