// src/hooks/usePokemonSearch.js

import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetails } from '../utils/fetchData';

const usePokemonSearch = (pokemonName, enabled = false) => {
  return useQuery({
    queryKey: ['pokemonSearch', pokemonName],
    queryFn: () =>
      fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`),
    enabled: enabled && !!pokemonName,
    retry: false,
  });
};

export default usePokemonSearch;
