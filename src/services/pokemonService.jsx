import { API_BASE_URL } from "../config/globals";

export const fetchPokemons = async (page, limit) => {
  const offset = (page - 1) * limit;
  const response = await fetch(`${API_BASE_URL}?limit=${limit}&offset=${offset}`);

  if (!response.ok) {
    throw new Error("Error al obtener los datos de los Pokémon.");
  }

  return response.json();
};

const formatPokemonDetails = (data) => ({
  id: data.id,
  name: data.name,
  img: data.sprites.other.dream_world.front_default,
  imggif: data.sprites.other.showdown.front_default,
  types: data.types.map(type => type.type.name),
  stats: data.stats.map(stat => ({
    name: stat.stat.name,
    value: stat.base_stat
  })),
  abilities: data.abilities.map(ability => ability.ability.name),
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
