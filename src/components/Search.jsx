import { Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import Button from "./Button";

export const Search = ({ onSearch }) => {
  // Estado para manejar el texto ingresado en el campo de búsqueda
  const [searchText, setSearchText] = useState("");

  // Función que se ejecuta cada vez que cambia el valor del input
  const handleChange = (e) => {
    setSearchText(e.target.value); // Actualizar el estado con el valor del input
  };

  // Función que se ejecuta cuando el usuario realiza una búsqueda
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText); // Pasar el texto de búsqueda al componente padre
    }
  };

  return (
    <section className="search">
      {/* Etiqueta descriptiva para el campo de búsqueda */}
      <label htmlFor="pokemonSearch" style={{ marginBottom: "5px", color: "white", fontSize: "1.5vh" }}>
        Buscar
      </label>
      
      {/* Input con un icono de búsqueda al inicio */}
      <InputGroup flex="1" style={{ maxWidth: '500px', background: "black" }}>
        <Input
          id="pokemonSearch"
          placeholder="nombre del pokemon" // Placeholder que indica qué buscar
          value={searchText} // El valor del input está vinculado al estado
          onChange={handleChange} // Actualizar el estado cuando el texto cambia
          onKeyDown={(e) => {
            // Ejecutar búsqueda cuando se presiona "Enter"
            if (e.key === "Enter") {
              handleSearch(); 
            }
          }}
        />
      </InputGroup>

      {/* Botón para activar la búsqueda manualmente */}
      <Button onClick={handleSearch} text={<LuSearch />} />
    </section>
  );
};

export default Search;
