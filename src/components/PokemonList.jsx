import { useState, useEffect } from "react";
import { Spinner, Box } from "@chakra-ui/react";
import PokemonCard from "./PokemonCard";
import MyPagination from "./MyPagination";
import Search from "./Search";
import Pokemon_Logo from '../assets/images/Pokemon_logo.png';

function PokemonList() {
  // Estado para manejar los Pokémon, la página actual y otros datos
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [highlightedPokemon, setHighlightedPokemon] = useState(null);
  const [searchedPokemonData, setSearchedPokemonData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const limit = 15; // Límite de Pokémon por página

  // Efecto para obtener los Pokémon de la API cuando cambia la página
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // Obtener los Pokémon de la página actual
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) * limit}`);
        if (!response.ok) throw new Error("Error al obtener los datos de los Pokémon.");
        
        const result = await response.json();
        const { results, count } = result;

        // Calcular el total de páginas según el número total de Pokémon
        setTotalPages(Math.ceil(count / limit));
        
        // Obtener detalles de cada Pokémon
        const newPokemons = await Promise.all(results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const data = await res.json();
          return {
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
          };
        }));
        setPokemons(newPokemons); // Guardar los Pokémon obtenidos
        setErrorMessage(""); // Limpiar cualquier mensaje de error anterior
      } catch (error) {
        console.error("Error al obtener los datos de los Pokémon:", error);
        setErrorMessage("Hubo un error al cargar los Pokémon."); // Mostrar error si la API falla
      }
    };
    fetchPokemons();
  }, [page]); // Dependencia en la página para cambiar la solicitud

  // Maneja la búsqueda de un Pokémon por su nombre
  const handleSearch = async (searchText) => {
    if (!searchText) return;
    setLoading(true);
    setErrorMessage(""); // Limpiar cualquier mensaje de error previo
  
    try {
      // Buscar el Pokémon por nombre
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokémon no encontrado");

      const data = await response.json();
      const pokemonPage = Math.ceil(data.id / limit); // Calcular la página donde se encuentra el Pokémon
      setPage(pokemonPage); // Cambiar a la página correspondiente

      // Guardar la información del Pokémon encontrado
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
      setHighlightedPokemon(data.id); // Resaltar el Pokémon encontrado
    } catch (error) {
      console.error("Error buscando el Pokémon:", error);
      setErrorMessage("No se encontró ningún Pokémon con ese nombre."); // Mensaje si no se encuentra el Pokémon
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  return (
    <div>
      {/* Cabecera con logo y barra de búsqueda */}
      <section className="head">
        <img className="logo" src={Pokemon_Logo} alt="Pokemon Logo" />
        <div>
          <Search onSearch={handleSearch} /> {/* Componente para la búsqueda */}
          
          {/* Spinner de carga si está buscando Pokémon */}
          {loading && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Spinner size="xl" color="yellow" speed="0.75s" />
            </Box>
          )}
          
          {/* Mostrar mensaje de error si ocurre algún problema */}
          {errorMessage && <p style={{ color: "yellow", fontWeight: "bold", fontSize: "12px" }}>{errorMessage}</p>}
        </div>

        {/* Componente de paginación */}
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

      {/* Mostrar Pokémon destacado si se realiza una búsqueda */}
      {searchedPokemonData && (
        <div className="highlighted-pokemon" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <div style={{ border: "3px solid yellow", padding: "10px", textAlign: "center" }}>
            <PokemonCard pokemon={searchedPokemonData} /> {/* Mostrar la tarjeta del Pokémon */}
          </div>
        </div>
      )}

      {/* Mostrar los Pokémon de la página actual */}
      <div className="card-container">
        {pokemons.map(pokemon => (
          <div key={pokemon.id} style={{ border: pokemon.id === highlightedPokemon ? "3px solid yellow" : "none", padding: "5px" }}>
            <PokemonCard pokemon={pokemon} /> {/* Mostrar la tarjeta de cada Pokémon */}
          </div>
        ))}
      </div>

      {/* Componente de paginación de nuevo */}
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
