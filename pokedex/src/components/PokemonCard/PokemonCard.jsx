import React from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiTrash2 } from "react-icons/fi";
import style from "./PokemonCard.module.css";

function PokemonCard({ pokemon, onFavorite, onDelete }) {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate(`/pokemon/${pokemon.id}`);
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
            className={style.controlBtn}
            onClick={() => onFavorite && onFavorite(pokemon.id)}
            title="Add to favorites"
          >
            <FiHeart className={style.heartIcon} />
          </button>

          <button
            type="button"
            className={style.btnSeeMore}
            onClick={handleSelect}
          >
            See more
          </button>

          {onDelete && (
            <button
              type="button"
              className={style.controlBtn}
              onClick={() => onDelete(pokemon.id)}
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
