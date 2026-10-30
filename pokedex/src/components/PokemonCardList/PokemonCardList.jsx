
import PokemonCard from "../PokemonCard/PokemonCard";
import style from "./PokemonCardList.module.css";

const PokemonCardList = ({ pokemons, onSelect, onFavorite, onDelete }) => {
  return (
    <section className={style.list}>
      <div className={style.grid}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onSelect={onSelect}
            onFavorite={onFavorite}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
};

export default PokemonCardList;
