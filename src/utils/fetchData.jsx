// src/utils/fetchData.js

export const fetchPokemons = async (page, limit) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) * limit}`);
    if (!response.ok) throw new Error("Error al obtener los datos de los Pokémon.");
    const result = await response.json();
    return result;
  };
  
  export const fetchPokemonDetails = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
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
  };
  