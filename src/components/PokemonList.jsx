import { useState, useEffect } from "react";
import { Spinner, Box } from "@chakra-ui/react";
import PokemonCard from "./PokemonCard";
import MyPagination from "./MyPagination";
import Search from "./Search";
import Pokemon_Logo from '../assets/images/Pokemon_logo.png';
import usePokemonsQuery from './UsePokemonsQuery'; // Importar el custom hook

function PokemonList() {
  const [page, setPage] = useState(1);
  const limit = 15;

  // Definir el estado de la paginación
  const [totalPages, setTotalPages] = useState(1);

  // Definir los estados de error y loading si los necesitas
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Usar el hook de consultas para obtener los datos de Pokémon y detalles
  const { pokemonData, pokemonDetails, error } = usePokemonsQuery(page, limit);

  const [highlightedPokemon, setHighlightedPokemon] = useState(null);
  const [searchedPokemonData, setSearchedPokemonData] = useState(null);

  // Calcular el total de páginas cuando se obtienen los Pokémon
  useEffect(() => {
    if (pokemonData) {
      setTotalPages(Math.ceil(pokemonData.count / limit));
    }
  }, [pokemonData]);

  // Maneja la búsqueda de un Pokémon por su nombre
  const handleSearch = async (searchText) => {
    if (!searchText) return;

    setLoading(true);
    setErrorMessage(""); // Limpiar el mensaje de error

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokémon no encontrado");

      const data = await response.json();
      const pokemonPage = Math.ceil(data.id / limit);
      setPage(pokemonPage);

      setSearchedPokemonData({
        id: data.id,
        name: data.name,
        img: data.sprites.other.dream_world.front_default,
        imggif: data.sprites.other.showdown.front_default,
        types: data.types.map(type => type.type.name),
        stats: data.stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat })),
        abilities: data.abilities.map(ability => ability.ability.name),
        height: data.height,
        weight: data.weight,
        species: data.species.name
      });
      setHighlightedPokemon(data.id);
    } catch (error) {
      console.error("Error buscando el Pokémon:", error);
      setErrorMessage("No se encontró ningún Pokémon con ese nombre.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="head">
        <img className="logo" src={Pokemon_Logo} alt="Pokemon Logo" />
        <div>
          <Search onSearch={handleSearch} />
          {loading && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Spinner size="xl" color="yellow" speed="0.75s" />
            </Box>
          )}
          {errorMessage && <p style={{ color: "yellow", fontWeight: "bold", fontSize: "12px" }}>{errorMessage}</p>}
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
