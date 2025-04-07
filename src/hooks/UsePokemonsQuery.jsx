import { useQuery } from '@tanstack/react-query';
import { fetchPokemons, fetchPokemonDetails } from '../services/pokemonService';

const usePokemonsQuery = (page, limit) => {
  // Trae la lista paginada de pokémon
  const { data, error } = useQuery({
    queryKey: ['pokemons', page],
    queryFn: () => fetchPokemons(page, limit),
    keepPreviousData: true,
  });

  // Trae los detalles de todos los pokémon listados
  const { data: pokemonDetails } = useQuery({
    queryKey: ['pokemonDetails', data?.results?.map(pokemon => pokemon.url)],
    queryFn: () =>
      Promise.all(data?.results?.map(pokemon => fetchPokemonDetails(pokemon.url))),
    enabled: !!data,
  });

  return {
    pokemonData: data,
    pokemonDetails,
    error
  };
};

export default usePokemonsQuery;