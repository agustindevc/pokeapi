import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import PokemonList from "./components/PokemonList";
import Logo from "./components/Logo";
import Search from "./components/Search";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

function App() {
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  return (
    <QueryClientProvider client={queryClient}>
      <Logo />
      <Search onSearchResults={setFilteredPokemons} /> 
      <PokemonList filteredPokemons={filteredPokemons} />
      
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;