import { useQuery } from '@tanstack/react-query'
import { fetchPokemonDetails } from '../../services/pokemonService'

export const useGetPokemonByUrl = (url) => {
    const query = useQuery({
        queryKey: ["pokemonList", url],
        queryFn: () => fetchPokemonDetails(url),
    })
  return query
}
