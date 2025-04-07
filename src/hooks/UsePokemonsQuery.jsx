import { useQuery } from '@tanstack/react-query';
import { fetchPokemons, fetchPokemonDetails } from '../services/pokemonService';

const usePokemonsQuery = (page, limit) => {
  const { data, error } = useQuery({
    queryKey: ['pokemons', page],
    queryFn: () => fetchPokemons(page, limit),
    keepPreviousData: true,
  });

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