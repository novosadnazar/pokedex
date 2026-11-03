import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHeart } from "react-icons/fi";
import { getPokemonDetail, getPokemonSpecies } from "../../services/pokeApi";
import style from "./PokemonDetail.module.css";

export default function PokemonDetail({ onFavorite, favorites = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getPokemonDetail(id), getPokemonSpecies(id)])
      .then(([pokeData, speciesData]) => {
        setPokemon(pokeData);
        if (speciesData && speciesData.flavor_text_entries) {
          const entry = speciesData.flavor_text_entries.find(
            (e) => e.language.name === "uk" || e.language.name === "en"
          );
          setDescription(
            entry
              ? entry.flavor_text.replace(/[\n\f]/g, " ")
              : "Опис відсутній."
          );
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className={style.loading}>Завантаження...</div>;
  }

  if (!pokemon) {
    return <div className={style.loading}>Покемона не знайдено</div>;
  }

  const isFavorite = favorites.includes(pokemon.id);

  return (
    <div className={`container ${style.detailContainer}`}>
      <button className={style.backButton} onClick={() => navigate(-1)}>
        <FiArrowLeft /> Назад до каталогу
      </button>

      <div className={style.detailCard}>
        <div className={style.imageSection}>
          <div className={style.imageWrapper}>
            <img
              src={
                pokemon.sprites?.other?.["official-artwork"]?.front_default ||
                pokemon.sprites?.front_default
              }
              alt={pokemon.name}
              className={style.pokemonImg}
            />
          </div>
          <p className={style.descriptionText}>{description}</p>
          <button
            type="button"
            className={style.favoriteMainBtn}
            onClick={() => onFavorite && onFavorite(pokemon.id)}
          >
            <FiHeart className={isFavorite ? style.heartActive : ""} /> Додати в
            обране
          </button>
        </div>

        <div className={style.infoSection}>
          <div className={style.titleRow}>
            <h1 className={style.pokemonName}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h1>
            <span className={style.pokemonId}>
              #{String(pokemon.id).padStart(3, "0")}
            </span>
          </div>

          <div className={style.typesRow}>
            {pokemon.types.map((t) => (
              <span key={t.type.name} className={style.typeBadge}>
                {t.type.name}
              </span>
            ))}
          </div>

          <div className={style.physicalStats}>
            <div className={style.statBox}>
              <span className={style.statLabel}>Зріст</span>
              <span className={style.statValue}>{pokemon.height / 10} м</span>
            </div>
            <div className={style.statDivider} />
            <div className={style.statBox}>
              <span className={style.statLabel}>Вага</span>
              <span className={style.statValue}>{pokemon.weight / 10} кг</span>
            </div>
          </div>

          <div className={style.statsContainer}>
            <h3 className={style.statsTitle}>Базові характеристики</h3>
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className={style.statRow}>
                <span className={style.statName}>
                  {stat.stat.name === "hp"
                    ? "HP"
                    : stat.stat.name === "attack"
                    ? "Attack"
                    : stat.stat.name === "defense"
                    ? "Defense"
                    : stat.stat.name === "special-attack"
                    ? "Sp. Atk"
                    : stat.stat.name === "special-defense"
                    ? "Sp. Def"
                    : "Speed"}
                </span>
                <div className={style.progressBarBg}>
                  <div
                    className={style.progressBarFill}
                    style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                  />
                </div>
                <span className={style.statNumber}>{stat.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
