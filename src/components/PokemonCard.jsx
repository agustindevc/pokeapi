import { Card } from "@chakra-ui/react"
import PokemonDetails from "./PokemonDetails";

const PokemonCard = ({pokemon}) => {
    // Desestructuramos los datos del Pokémon
    const { name, img } = pokemon;

     // Convertimos la primera letra del nombre a mayúsculas
     const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <Card.Root width="340px" boxShadow="2xl" position="relative" border="20px solid transparent" // Borde transparente
      _hover={{ 
        bg: "rgba(0, 0, 0, 0.5)",  // Cambiar el fondo al pasar el ratón
        transform: "scale(1.05)",  // Aumentar el tamaño ligeramente
        boxShadow: "none"
      }}
      transition="all 0.3s ease"
    > 
      <Card.Body 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        gap="2">
           <img src={img} alt={formattedName} style={{ width: '150px', height: '150px', objectFit: 'contain' }} />
          <Card.Title mt="2">{formattedName}</Card.Title>
      </Card.Body>
      <Card.Footer justifyContent="center">
        <PokemonDetails pokemon={pokemon}></PokemonDetails>
      </Card.Footer>
    </Card.Root>
  )
}

export default PokemonCard;
