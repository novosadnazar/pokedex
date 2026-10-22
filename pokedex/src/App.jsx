import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'

import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Favorite from './pages/Favorite'

import './App.css'

export default function App() {
 

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </>
  );
}