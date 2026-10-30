import React from "react";
import { FiHeart, FiTrash2 } from "react-icons/fi";
// Можеш створити свій файл стилів або адаптувати існуючі під покемонів
import styles from "./PokemonCard.module.css";

function PokemonCard({ pokemon, onSelect, onFavorite, onDelete }) {
  return (
    <div className={`container ${styles.cardContainer}`}>
      <article className={styles.card} onClick={() => onSelect(pokemon)}>
        <div className={styles.weatherHeader}>
          <h3 className={styles.cityName}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h3>
          <span className={styles.country}>
            #{String(pokemon.id).padStart(3, "0")}
          </span>
        </div>

        <div className={styles.weatherIconWrapper}>
          <img
            src={
              pokemon.sprites?.other?.["official-artwork"]?.front_default ||
              pokemon.sprites?.front_default
            }
            alt={pokemon.name}
            className={styles.weatherIcon}
          />
        </div>

        {/* Виводимо типи покемона (наприклад, Grass, Poison) */}
        <div className={styles.typesSection}>
          {pokemon.types?.map((t) => (
            <span key={t.type.name} className={styles.typeBadge}>
              {t.type.name}
            </span>
          ))}
        </div>

        <div
          className={styles.weatherFooter}
          onClick={(evt) => evt.stopPropagation()}
        >
          <button
            type="button"
            className={styles.controlBtn}
            onClick={() => onFavorite && onFavorite(pokemon.id)}
            title="Add to favorites"
          >
            <FiHeart className={styles.heartIcon} />
          </button>

          <button
            type="button"
            className={styles.btnSeeMore}
            onClick={() => onSelect(pokemon)}
          >
            See more
          </button>

          {onDelete && (
            <button
              type="button"
              className={styles.controlBtn}
              onClick={() => onDelete(pokemon.id)}
              title="Delete pokemon"
            >
              <FiTrash2 className={styles.deleteIcon} />
            </button>
          )}
        </div>
      </article>
    </div>
  );
}

export default PokemonCard;
