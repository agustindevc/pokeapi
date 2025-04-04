// src/components/PokemonList.jsx

import { useState, useEffect } from "react";
import { Spinner, Box } from "@chakra-ui/react";
import PokemonCard from "./PokemonCard";
import MyPagination from "./MyPagination";
import Search from "./Search";
import Pokemon_Logo from '../assets/images/Pokemon_logo.png';
import usePokemonsQuery from '../hooks/UsePokemonsQuery';
import usePokemonSearch from '../hooks/UsePokemonsSearch';


function PokemonList() {
  const [page, setPage] = useState(1);
  const limit = 15;
  const [totalPages, setTotalPages] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [highlightedPokemon, setHighlightedPokemon] = useState(null);
  const [searchText, setSearchText] = useState("");

  const { pokemonData, pokemonDetails, error } = usePokemonsQuery(page, limit);
  const {
    data: searchedPokemonData,
    isFetching: loading,
    error: searchError
  } = usePokemonSearch(searchText, !!searchText);

  useEffect(() => {
    if (pokemonData) {
      setTotalPages(Math.ceil(pokemonData.count / limit));
    }
  }, [pokemonData]);

  useEffect(() => {
    if (searchedPokemonData) {
      const pokemonPage = Math.ceil(searchedPokemonData.id / limit);
      setPage(pokemonPage);
      setHighlightedPokemon(searchedPokemonData.id);
    }
  }, [searchedPokemonData]);

  useEffect(() => {
    if (searchError) {
      setErrorMessage("No se encontró ningún Pokémon con ese nombre.");
    } else {
      setErrorMessage("");
    }
  }, [searchError]);

  const handleSearch = (text) => {
    if (!text) return;
    setSearchText(text);
  };

  return (
    <div>
      <section className="head">
        <img className="logo" src={Pokemon_Logo} alt="Pokemon Logo" />
        <div>
          <Search onSearch={handleSearch} />
          {loading && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Spinner size="xl" color="yellow" speed="0.75s" marginTop= "5%"/>
            </Box>
          )}
          {errorMessage && <p style={{ color: "yellow", fontWeight: "bold", fontSize: "12px", marginTop: "5%"}}>{errorMessage}</p>}
          {error && <p style={{ color: "yellow", fontWeight: "bold", fontSize: "12px" }}>{error.message}</p>}
        </div>

        <div className="pagination">
          <MyPagination
            page={page}
            totalPages={totalPages}
            onPrevPage={() => setPage(prev => Math.max(prev - 1, 1))}
            onNextPage={() => setPage(prev => Math.min(prev + 1, totalPages))}
            onPageChange={setPage}
          />
        </div>
      </section>

      {searchedPokemonData && (
        <div className="highlighted-pokemon" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <div style={{ border: "3px solid yellow", padding: "10px", textAlign: "center" }}>
            <PokemonCard pokemon={searchedPokemonData} />
          </div>
        </div>
      )}

      <div className="card-container">
        {pokemonDetails?.map(pokemon => (
          <div key={pokemon.id} style={{ border: pokemon.id === highlightedPokemon ? "3px solid yellow" : "none", padding: "5px" }}>
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>

      <div className="pagination">
        <MyPagination
          page={page}
          totalPages={totalPages}
          onPrevPage={() => setPage(prev => Math.max(prev - 1, 1))}
          onNextPage={() => setPage(prev => Math.min(prev + 1, totalPages))}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default PokemonList;
