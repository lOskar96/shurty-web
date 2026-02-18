import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createThemeSlice } from './themeSlice'
import { createUserSlice } from './userSlice'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  devtools(
    persist(
      (set, get) => ({
        ...createThemeSlice(set, get),
        ...createUserSlice(set, get)
      }),
      {
        name: 'app-storage'
      }
    )
  )
)
