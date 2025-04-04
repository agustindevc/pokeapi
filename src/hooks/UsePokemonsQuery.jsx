// src/hooks/usePokemonsQuery.js

import { useQuery } from '@tanstack/react-query';
import { fetchPokemons, fetchPokemonDetails } from '../utils/fetchData';

const usePokemonsQuery = (page, limit) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemons', page],
    queryFn: () => fetchPokemons(page, limit),
    keepPreviousData: true,
  });

  const { data: pokemonDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['pokemonDetails', data?.results?.map(pokemon => pokemon.url)],
    queryFn: () => Promise.all(data?.results?.map(pokemon => fetchPokemonDetails(pokemon.url))),
    enabled: !!data,
  });

  return {
    pokemonData: data,
    pokemonDetails,
    isLoading: isLoading || isLoadingDetails,
    error
  };
};

export default usePokemonsQuery;
