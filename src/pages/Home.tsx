import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useEffect } from 'react';
import { actionGetListMahasiswa } from '../app/action/mahasiswaAction';

export const Home = () => {
  const { list_mahasiswa, loading } = useSelector((state: RootState) => state.mahasiswa);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  
  useEffect(() => {
    dispatch(actionGetListMahasiswa())
  }, [])

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold">Home</h1>
      <h3 className="text-xl font-bold">Jumlah mahasiswa adalah {loading? '...' : list_mahasiswa.length}</h3>
    </div>
  );
};
