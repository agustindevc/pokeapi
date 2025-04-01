import { createContext, useState } from "react";

//Esta variable devolvera un contexto para poder trabajar con el.
const PokemonContext = createContext();

//Creamos un "envoltorio" para el contexto, para que quede disponible para usarse por todas las variables de proyecto.
function PokemonProviderWrapper(props) {
    const [pokemons, setPokemons] = useState([]);
    return (
        <PokemonContext.Provider value={{pokemons, setPokemons}}> 
            {props.children} {/*estos son los elementos que tendran acceso al contexto */}
        </PokemonContext.Provider>
    )
}

export {PokemonContext, PokemonProviderWrapper};