import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createThemeSlice } from './themeSlice'
import { createUserSlice } from './userSlice'
import { persist } from 'zustand/middleware'
import { createNavSlice } from './navSlice'

export const useAppStore = create(
  devtools(
    persist(
      (set, get) => ({
        ...createThemeSlice(set, get),
        ...createUserSlice(set, get),
        ...createNavSlice(set, get)
      }),
      {
        name: 'app-storage'
      }
    )
  )
)
