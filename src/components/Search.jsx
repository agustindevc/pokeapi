import { Input, InputGroup, Text, VStack, Stack } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Button from "./Button";

export const Search = ({ onSearchResults }) => {
  const [searchText, setSearchText] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const queryClient = useQueryClient();

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      const cachedPokemonList = queryClient.getQueryData(["pokemonList"]);

      if (cachedPokemonList) {
        const filteredPokemon = cachedPokemonList.filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(searchText.toLowerCase())
        );

        setNoResults(filteredPokemon.length === 0);
        setHasSearched(true);
        onSearchResults(filteredPokemon);
      } else {
        setNoResults(true);
        setHasSearched(true);
        onSearchResults([]);
      }
    }
  };

  const handleClear = () => {
    setSearchText("");
    setNoResults(false);
    setHasSearched(false);
    onSearchResults([]);
  };

  return (
    <VStack spacing={4} align="center" w="100%" margin="3%">
      <Stack
        direction="row"
        spacing={3}
        w="100%"
        maxW="600px"
        align="center"
        justify="center"
      >
        <InputGroup flex="1" maxW="500px" bg="black">
          <Input
            type="search"
            id="pokemonSearch"
            placeholder="Nombre del pokemon"
            boxShadow="md"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            color="white"
          />
        </InputGroup>
        <Button onClick={handleSearch} text={<LuSearch />} />
      </Stack>

      {hasSearched && (
        <Button onClick={handleClear} text="Limpiar búsqueda" />
      )}
      
      {noResults && (
        <Text 
          color="yellow.300" 
          fontSize="xl"
          textAlign="center"
        >
          No hay coincidencias
        </Text>
      )}
    </VStack>
  );
};

export default Search;