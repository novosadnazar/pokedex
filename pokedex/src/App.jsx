

import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Favorite from "./pages/Favorite";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";

import { getPokemons } from "./services/pokeApi";

import "./App.css";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6); 
  const [theme, setTheme] = useState("day");

  useEffect(() => {
  
    getPokemons(30, 0)
      .then((data) => {
        setPokemons(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Помилка завантаження:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (theme === "night") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "day" ? "night" : "day"));
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3); 
  };

  const visiblePokemons = pokemons.slice(0, visibleCount);
  const hasMore = visibleCount < pokemons.length;

  return (
    <div className={theme === "night" ? "appNight" : "appDay"}>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              pokemons={visiblePokemons}
              searchQuery={searchQuery}
              loading={loading}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
            />
          }
        />

        <Route
          path="/catalog"
          element={
            <Catalog
              pokemons={visiblePokemons}
              searchQuery={searchQuery}
              loading={loading}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
            />
          }
        />

        <Route path="/pokemon/:id" element={<PokemonDetail />} />

        <Route path="/favorite" element={<Favorite />} />
      </Routes>
      <Footer theme={theme} />
    </div>
  );
}