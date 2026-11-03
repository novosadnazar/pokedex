
export const getPokemons = async (limit = 20, offset = 0) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await response.json();

  const detailedPokemons = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return await res.json();
    })
  );

  return detailedPokemons;
};

export const getPokemonDetail = async (idOrName) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
  if (!response.ok) throw new Error("Покемона не знайдено");
  return await response.json();
};

export const getPokemonSpecies = async (idOrName) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${idOrName}`
  );
  if (!response.ok) return null;
  return await response.json();
};