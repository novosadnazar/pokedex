import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PokemonCardList from "../components/PokemonCardList/PokemonCardList";

export const Favorite = () => {
  const [favoritePokemons, setFavoritePokemons] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoritePokemons(favorites);
  }, []);

  return (
    <div className="container">
      <div className="favorite-page">
        <h2 className="favorite-title">{t("favoritePoke") }</h2>
        {favoritePokemons.length > 0 ? (
          <PokemonCardList pokemons={favoritePokemons} />
        ) : (
          <p>У вас поки немає обраних покемонів.</p>
        )}
      </div>
    </div>
  );
};

export default Favorite;
