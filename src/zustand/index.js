import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createThemeSlice } from './themeSlice'
import { createUserSlice } from './userSlice'
import { persist } from 'zustand/middleware'
import { createUrlsSlice } from './urlsSlice'

export const useAppStore = create(
  devtools(
    persist(
      (set, get) => ({
        ...createThemeSlice(set, get),
        ...createUserSlice(set, get),
        ...createUrlsSlice(set, get)
      }),
      {
        name: 'app-storage'
      }
    )
  )
)
