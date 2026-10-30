import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Favorite from "./pages/Favorite";
import { getPokemons } from "./services/pokeApi";

import "./App.css";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemons(20, 0)
      .then((data) => {
        setPokemons(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Помилка завантаження:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              pokemons={pokemons}
              searchQuery={searchQuery}
              loading={loading}
            />
          }
        />

        <Route
          path="/catalog"
          element={
            <Catalog
              pokemons={pokemons}
              searchQuery={searchQuery}
              loading={loading}
            />
          }
        />

        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </>
  );
}
