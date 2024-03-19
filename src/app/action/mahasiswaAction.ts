import { Dispatch } from 'react';
import {
  addListMahasiswa,
  deleteListMahasiswa,
  editListMahasiswa,
  setListMahasiswa,
  setLoading,
} from '../slices/mahasiswaSlice';
import { mahasiswa } from '../../constants/dataMahasiswa';
import { MahasiswaInterface } from '../../interface/mahasiswa';

export const actionGetListMahasiswa = () => {
  return async (dispatch: Dispatch<unknown>) => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setListMahasiswa(mahasiswa));
      dispatch(setLoading(false));
    }, 1500);
  };
};

export const actionAddListMahasiswa = (payload: MahasiswaInterface) => {
  return async (dispatch: Dispatch<unknown>) => {
    dispatch(addListMahasiswa(payload));
  };
};

export const actionEditListMahasiswa = (payload: MahasiswaInterface) => {
  return async (dispatch: Dispatch<unknown>) => {
    dispatch(editListMahasiswa(payload));
  };
};

export const actionDeleteListMahasiswa = (payload: string) => {
  return async (dispatch: Dispatch<unknown>) => {
    dispatch(deleteListMahasiswa(payload));
  };
};
