import { configureStore } from '@reduxjs/toolkit'
import mahasiswaSlice from './slices/mahasiswaSlice'

export const store = configureStore({
  reducer: {
    mahasiswa: mahasiswaSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch