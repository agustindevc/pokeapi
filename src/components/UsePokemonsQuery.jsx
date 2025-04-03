import { useQuery } from '@tanstack/react-query';

// Función para obtener los Pokémon de la API
const fetchPokemons = async (page, limit) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) * limit}`);
  if (!response.ok) throw new Error("Error al obtener los datos de los Pokémon.");
  const result = await response.json();
  return result;
};

// Función para obtener detalles de un Pokémon específico
const fetchPokemonDetails = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return {
    id: data.id,
    name: data.name,
    img: data.sprites.other.dream_world.front_default,
    imggif: data.sprites.other.showdown.front_default,
    types: data.types.map(type => type.type.name),
    stats: data.stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat })),
    abilities: data.abilities.map(ability => ability.ability.name),
    height: data.height,
    weight: data.weight,
    species: data.species.name
  };
};

// Custom hook que usa useQuery para obtener Pokémon y sus detalles
const usePokemonsQuery = (page, limit) => {
  // Obtener los Pokémon
  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemons', page],
    queryFn: () => fetchPokemons(page, limit),
    keepPreviousData: true, // Mantener datos previos mientras se cargan nuevos
  });

  // Obtener los detalles de los Pokémon
  const { data: pokemonDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['pokemonDetails', data?.results?.map(pokemon => pokemon.url)],
    queryFn: () => Promise.all(data?.results?.map(pokemon => fetchPokemonDetails(pokemon.url))),
    enabled: !!data, // Solo ejecutar si los datos de los Pokémon están disponibles
  });

  return {
    pokemonData: data,
    pokemonDetails,
    isLoading: isLoading || isLoadingDetails,
    error
  };
};

export default usePokemonsQuery
