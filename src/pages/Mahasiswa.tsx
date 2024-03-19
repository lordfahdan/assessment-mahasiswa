/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useEffect, useState } from 'react';
import {
  actionAddListMahasiswa,
  actionDeleteListMahasiswa,
  actionEditListMahasiswa,
  actionGetListMahasiswa,
} from '../app/action/mahasiswaAction';
import Swal from 'sweetalert2';
import { MahasiswaInterface } from '../interface/mahasiswa';
import { updateMahasiswa } from '../app/slices/mahasiswaSlice';
import { nanoid } from '@reduxjs/toolkit';

export const Mahasiswa = () => {
  const [name, setName] = useState('');
  const {
    list_mahasiswa,
    loading,
    mahasiswa: selectedMahasiswa,
  } = useSelector((state: RootState) => state.mahasiswa);
  const dispatch = useDispatch<any>();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(actionDeleteListMahasiswa(id));
        Swal.fire({
          title: 'Deleted!',
          text: 'Mahasiswa berhasil dihapus',
          icon: 'success',
        });
      }
    });
  };

  const handleEdit = (data: MahasiswaInterface) => {
    dispatch(updateMahasiswa(data));
    setName(data.nama);
  };

  const handleSubmitEdit = (e: any) => {
    e.preventDefault();
    const payload: MahasiswaInterface = {
      nim: selectedMahasiswa.nim,
      nama: name,
    };
    dispatch(actionEditListMahasiswa(payload));
    Swal.fire({ title: 'Success edit Mahasiswa', icon: 'success' });
    clearSelectedMahasiswa();
  };

  const clearSelectedMahasiswa = () => {
    dispatch(
      updateMahasiswa({
        nama: '',
        nim: '',
      })
    );
  };

  const handleAdd = async () => {
    const { value } = await Swal.fire({
      title: 'Tambah Mahasiswa',
      input: 'text',
      inputLabel: 'Nama Mahasiswa',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Nama tidak boleh kosong!';
        }
      },
    });
    if (value) {
      const payload: MahasiswaInterface = {
        nim: nanoid(10),
        nama: value,
      };
      dispatch(actionAddListMahasiswa(payload));
      Swal.fire({ title: 'Success tambah Mahasiswa', icon: 'success' });
    }
  };

  useEffect(() => {
    dispatch(actionGetListMahasiswa());
  }, []);

  return (
    <div className="container mt-24">
      {selectedMahasiswa.nama !== '' && (
        <div className="mb-10">
          <h4 className="text-2xl font-semibold">Edit Mahasiswa:</h4>
          <form onSubmit={(e: any) => handleSubmitEdit(e)}>
            <div className="flex flex-col justify-start items-start mb-2">
              <label htmlFor="nim">Nim</label>
              <input
                className="border px-2 py-1 rounded-sm disabled:text-gray-300"
                type="text"
                id="nim"
                value={selectedMahasiswa.nim}
                disabled
              />
            </div>
            <div className="flex flex-col justify-start items-start mb-4">
              <label htmlFor="nama">Nama</label>
              <input
                className="border px-2 py-1 rounded-sm"
                type="text"
                id="nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="rounded-md bg-green-600 text-white px-4 py-2"
              >
                Submit
              </button>
              <button
                onClick={clearSelectedMahasiswa}
                className="rounded-md bg-red-600 text-white px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="flex justify-between items-center mb-2">
        <h1 className="font-semibold text-2xl">Table Mahasiswa</h1>
        <button
          onClick={handleAdd}
          className="rounded-md bg-blue-600 text-white px-4 py-2"
        >
          Tambah
        </button>
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th className="w-1/4">Nim</th>
            <th className="w-3/4">Nama</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={3} className="text-center italic">
                Loading...
              </td>
            </tr>
          )}
          {loading === false &&
            !!list_mahasiswa &&
            list_mahasiswa.length > 0 &&
            list_mahasiswa.map((item) => (
              <tr key={item.nim}>
                <td>{item.nim}</td>
                <td>{item.nama}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-4 py-1 rounded-sm bg-yellow-600 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.nim)}
                      className="px-4 py-1 rounded-sm bg-red-600 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          {loading === false &&
            !!list_mahasiswa &&
            list_mahasiswa.length == 0 && (
              <tr>
                <td colSpan={3} className="text-center italic">
                  Mahasiswa tidak ada
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};
