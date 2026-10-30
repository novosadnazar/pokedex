
import PokemonCardList from "../components/PokemonCardList/PokemonCardList";

export default function Home({ pokemons, searchQuery, loading }) {
  if (loading) return <p>Завантаження покемонів...</p>;


  const filteredPokemons = pokemons.filter((poke) =>
    poke.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <div className="container">
        <h1>Головна сторінка</h1>

        {filteredPokemons.length > 0 ? (
          <PokemonCardList 
            pokemons={filteredPokemons}
            onSelect={(pokemon) => console.log("Обрано покемона:", pokemon)}
            onFavorite={(id) => console.log("Додано в улюблені:", id)}
          />
        ) : (
          <p>Нічого не знайдено за вашим запитом</p>
        )}
      </div>
    </main>
  );
}