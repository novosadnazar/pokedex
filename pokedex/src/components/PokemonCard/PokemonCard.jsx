
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import style from "./PokemonCard.module.css";

function PokemonCard({ pokemon, onFavorite, onDelete }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
 const { t } = useTranslation();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = favorites.some((fav) => fav.id === pokemon.id);
    setIsFavorite(exists);
  }, [pokemon.id]);

  const handleSelect = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };


  const handleFavoriteClick = (evt) => {
    evt.stopPropagation();

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
     
      favorites = favorites.filter((fav) => fav.id !== pokemon.id);
      setIsFavorite(false);
    } else {
     
      favorites.push(pokemon);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    if (onFavorite) {
      onFavorite(pokemon.id);
    }
  };

  return (
    <div className={`container ${style.cardContainer}`}>
      <article className={style.card} onClick={handleSelect}>
        <div className={style.weatherHeader}>
          <h3 className={style.cityName}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h3>
          <span className={style.country}>
            #{String(pokemon.id).padStart(3, "0")}
          </span>
        </div>

        <div className={style.weatherIconWrapper}>
          <img
            src={
              pokemon.sprites?.other?.["official-artwork"]?.front_default ||
              pokemon.sprites?.front_default
            }
            alt={pokemon.name}
            className={style.weatherIcon}
          />
        </div>

        <div className={style.typesSection}>
          {pokemon.types?.map((t) => (
            <span key={t.type.name} className={style.typeBadge}>
              {t.type.name}
            </span>
          ))}
        </div>

        <div
          className={style.weatherFooter}
          onClick={(evt) => evt.stopPropagation()}
        >
          <button
            type="button"
            className={`${style.controlBtn} ${
              isFavorite ? style.favoriteActive : ""
            }`}
            onClick={handleFavoriteClick}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <FiHeart
              className={style.heartIcon}
              style={isFavorite ? { fill: "#ef4444", color: "#ef4444" } : {}}
            />
          </button>

          <button
            type="button"
            className={style.btnSeeMore}
            onClick={handleSelect}
          >
            {t("seeBtn")}
          </button>

          {onDelete && (
            <button
              type="button"
              className={style.controlBtn}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(pokemon.id);
              }}
              title="Delete pokemon"
            >
              <FiTrash2 className={style.deleteIcon} />
            </button>
          )}
        </div>
      </article>
    </div>
  );
}

export default PokemonCard;