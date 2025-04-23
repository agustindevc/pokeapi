import { API_BASE_URL } from "../config/globals";

export const fetchAllPokemons = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}?limit=1025`);
    if (!response.ok) {
      throw new Error("Error al obtener los datos de los Pokémon.");
    }

    const data = await response.json();
    return data.results.map((pokemon, index) => ({
      id: index + 1,
      name: pokemon.name,
      url: pokemon.url,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Error al cargar los Pokémon.");
  }
};

const formatPokemonDetails = (data) => ({
  id: data.id,
  name: data.name,
  img: data.sprites.other.dream_world.front_default || null,
  imggif: data.sprites.other.showdown?.front_default || null,
  types: data.types.map((type) => type.type.name),
  stats: data.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  })),
  abilities: data.abilities.map((ability) => ability.ability.name),
  height: data.height,
  weight: data.weight,
  species: data.species.name,
});

export const fetchPokemonDetails = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al obtener los detalles del Pokémon.");
  const data = await response.json();
  return formatPokemonDetails(data);
};