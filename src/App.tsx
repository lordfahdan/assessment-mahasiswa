import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Mahasiswa } from './pages/Mahasiswa';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mahasiswa" element={<Mahasiswa />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
