
import PokemonCard from "./PokemonCard";
import MyPagination from "./MyPagination";
import { Box, Center, Text, Flex, VStack, Spinner } from "@chakra-ui/react";
import { useGetPokemons } from "./hooks/useGetPokemons";
import { useState } from "react";

const PokemonList = ({ filteredPokemons }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 15;

  const { data: pokemons = [], isLoading } = useGetPokemons();

  const displayPokemons = filteredPokemons.length > 0 ? filteredPokemons : pokemons;
  const totalPokemons = displayPokemons.length;
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = displayPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  return (
    <Box mx="auto" textAlign="center" my={8}>
      {isLoading && (
        <Center>
          <Spinner size="xl" />
          <Text ml={4}>Cargando Pokémon...</Text>
        </Center>
      )}

      <Text as="h3" fontSize="md">
        Toca sobre el pokemon para ver detalles
      </Text>

      {!isLoading && (
        <VStack spacing={6}>
          <MyPagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />

          <Flex
            wrap="wrap"
            justify="center"
            gap={5}
            p={5}
          >
            {currentPokemons.map((pokemon) => (
              <Box key={pokemon.id}>
                <PokemonCard pokemon={pokemon} />
              </Box>
            ))}
          </Flex>

          <MyPagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        </VStack>
      )}
    </Box>
  );
};

export default PokemonList;