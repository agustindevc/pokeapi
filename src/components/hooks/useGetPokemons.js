import { useQuery } from '@tanstack/react-query';
import { fetchAllPokemons } from '../../services/pokemonService';

export const useGetPokemons = () => {
    const query = useQuery({
        queryKey: ["pokemonList"],
        queryFn: fetchAllPokemons,
    });

    return query
}
