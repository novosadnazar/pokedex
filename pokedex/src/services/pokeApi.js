const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemons(limit = 20, offset = 0) {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );
  if (!response.ok) {
    throw new Error("Помилка завантаження");
  }
  const data = await response.json();


  const detailedPokemons = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return res.json();
    }),
  );

  return detailedPokemons;
}
