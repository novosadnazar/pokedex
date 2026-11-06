import PokemonCardList from "../components/PokemonCardList/PokemonCardList";
export default function Catalog({
  pokemons,
  searchQuery,
  loading,
  onLoadMore,
  hasMore,
}) {
  const filteredPokemons = pokemons.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Завантаження...
      </div>
    );
  }

  return (
    <div className="container">
      <PokemonCardList
        pokemons={filteredPokemons}
        onLoadMore={onLoadMore}
        hasMore={hasMore && !searchQuery}
      />
    </div>
  );
}
