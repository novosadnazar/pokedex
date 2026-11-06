

import  PokemonCard  from "../PokemonCard/PokemonCard";
import style from "./PokemonCardList.module.css";
import { useTranslation } from "react-i18next";
const PokemonCardList = ({
  pokemons,
  onFavorite,
  onDelete,
  onLoadMore,
  hasMore,
}) => {

  const {t}= useTranslation()
  return (
    <section className={style.list}>
      <div className={style.grid}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onFavorite={onFavorite}
            onDelete={onDelete}
          />
        ))}
      </div>

      {hasMore && (
        <div className={style.loadMoreContainer}>
          <button
            type="button"
            className={style.loadMoreBtn}
            onClick={onLoadMore}
          >
            {t("loadBtn")}
          </button>
        </div>
      )}
    </section>
  );
};

export default PokemonCardList;