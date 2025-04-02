import { Card } from "@chakra-ui/react";
import PokemonDetails from "./PokemonDetails";

const PokemonCard = ({ pokemon }) => {
  // Desestructuramos los datos esenciales del Pokémon
  const { name, img } = pokemon;

  // Formateamos el nombre del Pokémon para que la primera letra esté en mayúscula
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    // Card que representa un Pokémon, con un borde transparente y un efecto al pasar el ratón
    <Card.Root
      width="340px"
      boxShadow="2xl"
      position="relative"
      border="20px solid transparent" // Borde transparente
      _hover={{
        bg: "rgba(0, 0, 0, 0.5)", // Fondo oscuro cuando el ratón pasa sobre la tarjeta
        transform: "scale(1.05)",  // Aumentar ligeramente el tamaño
        boxShadow: "none"          // Eliminar sombra al pasar el ratón
      }}
      transition="all 0.3s ease" // Animación suave de transición
    >
      <Card.Body
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="2"
      >
        {/* Imagen del Pokémon */}
        <img
          src={img}
          alt={formattedName} // Descripción de la imagen con el nombre del Pokémon
          style={{ width: '150px', height: '150px', objectFit: 'contain' }} // Estilo de la imagen
        />
        {/* Nombre del Pokémon */}
        <Card.Title mt="2">{formattedName}</Card.Title>
      </Card.Body>
      
      {/* Footer con los detalles del Pokémon */}
      <Card.Footer justifyContent="center">
        <PokemonDetails pokemon={pokemon} />
      </Card.Footer>
    </Card.Root>
  );
};

export default PokemonCard;
