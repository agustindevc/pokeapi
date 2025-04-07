import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetails } from '../services/pokemonService';
import { API_BASE_URL } from '../config/globals';

const usePokemonSearch = (pokemonName, enabled = false) => {

  const urlPok = `${API_BASE_URL}/${pokemonName.toLowerCase()}`;
  return useQuery({
    queryKey: ['pokemonSearch', pokemonName],
    queryFn: () =>
      fetchPokemonDetails(urlPok),
    enabled: enabled && !!pokemonName,
    retry: false,
  });
};

export default usePokemonSearch;