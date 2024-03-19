import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MahasiswaInterface } from '../../interface/mahasiswa'

interface MahasiswaState {
  list_mahasiswa: Array<MahasiswaInterface>;
  loading: boolean;
  mahasiswa: MahasiswaInterface;
}

const initialState: MahasiswaState = {
  list_mahasiswa: [],
  loading: false,
  mahasiswa: {
    nama: '',
    nim: '',
  },
}

export const mahasiswaSlice = createSlice({
  name: 'mahasiswa',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    updateMahasiswa: (state, action: PayloadAction<MahasiswaInterface>) => {
      state.mahasiswa = action.payload
    },
    setListMahasiswa: (state, action: PayloadAction<Array<MahasiswaInterface>>) => {
      state.list_mahasiswa = action.payload
    },
    addListMahasiswa: (state, action: PayloadAction<MahasiswaInterface>) => {
      state.list_mahasiswa.push(action.payload)
    },
    editListMahasiswa: (state, action: PayloadAction<MahasiswaInterface>) => {
      const selectedIndex = state.list_mahasiswa.findIndex(item => item.nim === action.payload.nim)
      state.list_mahasiswa[selectedIndex] = action.payload
    },
    deleteListMahasiswa: (state, action: PayloadAction<string>) => {
      state.list_mahasiswa = state.list_mahasiswa.filter((item) => item.nim !== action.payload)
    },
  },
})

export const { setLoading, updateMahasiswa, setListMahasiswa, addListMahasiswa, editListMahasiswa, deleteListMahasiswa } = mahasiswaSlice.actions

export default mahasiswaSlice.reducer