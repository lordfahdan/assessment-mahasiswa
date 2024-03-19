import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { RootState } from '../app/store';

export const Navbar = () => {
  const location = useLocation();
  const { loading } = useSelector((state: RootState) => state.mahasiswa);

  return (
    <header className="bg-gray-800 fixed top-0 left-0 w-full">
      <nav className="container flex justify-between items-center py-2">
        <h1 className="text-white font-bold text-2xl">
          {loading
            ? 'Loading...'
            : location.pathname === '/mahasiswa'
            ? 'Mahasiswa'
            : 'Home'}
        </h1>
        <div>
          <ul className="flex items-center gap-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  [
                    'text-white font-semibold',
                    isActive ? 'text-yellow-400' : '',
                  ].join(' ')
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mahasiswa"
                className={({ isActive }) =>
                  [
                    'text-white font-semibold',
                    isActive ? 'text-yellow-400' : '',
                  ].join(' ')
                }
              >
                Mahasiswa
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
