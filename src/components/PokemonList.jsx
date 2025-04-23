import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllPokemons } from "../services/pokemonService";
import PokemonCard from "./PokemonCard";
import MyPagination from "./MyPagination";
import { Box, Center, Text, Heading, Flex, VStack, Spinner } from "@chakra-ui/react";

const PokemonList = ({ filteredPokemons }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 15;

  const { data: pokemons = [], isLoading } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: fetchAllPokemons,
  });

  const totalPokemons = pokemons.length;
  const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

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
          {filteredPokemons.length > 0 && (
            <Flex
              wrap="wrap"
              justify="center"
              gap={5}
              p={5}
              mb={5}
            >
              {filteredPokemons.map((pokemon) => (
                <Box key={pokemon.id}>
                  <PokemonCard pokemon={pokemon} />
                </Box>
              ))}
            </Flex>
          )}

          <MyPagination
            my={9}
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