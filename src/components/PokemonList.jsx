import { useState, useEffect } from "react";
import { Spinner, Box } from "@chakra-ui/react"; // Importar Spinner y Box de Chakra UI
import PokemonCard from "./PokemonCard";
import MyPagination from "./MyPagination";
import Search from "./Search"; 
import Pokemon_Logo from '../assets/images/Pokemon_logo.png';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [highlightedPokemon, setHighlightedPokemon] = useState(null);
  const [searchingPokemon, setSearchingPokemon] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const limit = 15;

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) * limit}`);
        if (!response.ok) throw new Error("Error al obtener los datos de los Pokémon.");
        
        const result = await response.json();
        const { results, count } = result;
        setTotalPages(Math.ceil(count / limit));
        
        const newPokemons = await Promise.all(results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const data = await res.json();
          return {
            id: data.id,
            name: data.name,
            //img: data.sprites.other.showdown.front_default, //GIF
            img: data.sprites.other.dream_world.front_default, //SVG
            imggif: data.sprites.other.showdown.front_default,
            types: data.types.map(type => type.type.name),
            stats: data.stats.map(stat => ({
              name: stat.stat.name,
              value: stat.base_stat
            })),
            abilities: data.abilities.map(ability => ability.ability.name),
            height: data.height,
            weight: data.weight,
            species: data.species.name
          };
        }));
        setPokemons(newPokemons);
        setErrorMessage("");

        if (searchingPokemon) {
          const found = newPokemons.find(p => p.id === searchingPokemon);
          setHighlightedPokemon(found ? searchingPokemon : null);
          setSearchingPokemon(null);
        }
      } catch (error) {
        console.error("Error al obtener los datos de los Pokémon:", error);
        setErrorMessage("Hubo un error al cargar los Pokémon.");
      }
    };
    fetchPokemons();
  }, [page, searchingPokemon]);

  const handleSearch = async (searchText) => {
    if (!searchText) return;
    setLoading(true);
    setErrorMessage("");
  
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokémon no encontrado");
  
      const data = await response.json();
      const pokemonPage = Math.ceil(data.id / limit);
  
      setSearchingPokemon(data.id);
      setPage(pokemonPage); // Asegurar que `setPage` se actualiza correctamente
      setErrorMessage("");
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
          
          {/* Contenedor centrado para el Spinner */}
          {loading && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Spinner
                size="xl"
                color="yellow" 
                speed="0.75s"
              />
            </Box>
          )}

          {errorMessage && <p style={{ color: "yellow", fontWeight: "bold", fontSize: "12px" }}>{errorMessage}</p>}
        </div>
      </section>
      <div className="card-container">
        {pokemons.map(pokemon => (
          <div key={pokemon.id} style={{ border: pokemon.id === highlightedPokemon ? "3px solid yellow" : "none", padding: "5px" }}>
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>
      <div className="pagination">
      <MyPagination
        page={page}
        totalPages={totalPages}
        onPrevPage={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNextPage={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        onPageChange={(newPage) => setPage(newPage)} // Asegura que `newPage` es un número válido
      />

      </div>
    </div>
  );
}

export default PokemonList;
