import { Input, InputGroup } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import Button from "./Button";

export const Search = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchText);
    }
  };

  return (
    <section className="search">
      <InputGroup flex="1" style={{ maxWidth: '500px', background: "black" }}>
        <Input
          id="pokemonSearch"
          placeholder="nombre del pokemon"
          boxShadow= "md"
          value={searchText}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); 
            }
          }}
        />
      </InputGroup>
      <Button onClick={handleSearch} text={<LuSearch />} />
    </section>
  );
};

export default Search;