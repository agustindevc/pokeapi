import { Input, InputGroup } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { useState } from "react"
import Button from "./Button"

export const Search = ({ onSearch }) => {
  // Estado para manejar el valor del input
  const [searchText, setSearchText] = useState("")

  // Función que se ejecuta cuando cambia el valor del input
  const handleChange = (e) => {
    setSearchText(e.target.value)
  }

  // Función que se ejecuta cuando se realiza una búsqueda
  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText) // Enviar el texto al componente padre
    }
  }

  return (
    <section className="search">
    <InputGroup flex="1" style={{ maxWidth: '500px'}} startElement={<LuSearch />}>
      <Input
        placeholder="Introduce el pokemon"
        value={searchText} // Vincula el valor al estado
        onChange={handleChange} // Actualiza el estado cuando el texto cambia
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch() // Llama a la función de búsqueda cuando se presiona Enter
          }
        }}
      />
    </InputGroup>
    <Button onClick={handleSearch} text="Buscar"></Button>
    </section>
  )
}

export default Search;
