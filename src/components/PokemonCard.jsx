import { Skeleton, Card, CardBody, Box, Text } from "@chakra-ui/react";
import PokemonDetails from "./PokemonDetails";
import backgroundImg from "../assets/images/cardBackground.jpg"; // Ruta correcta a la imagen

const PokemonCard = ({ pokemon, isLoading }) => {
  const { name, img } = pokemon || {}; // Manejar el caso cuando no hay pokemon
  const formattedName = name ? name.charAt(0).toUpperCase() + name.slice(1) : "";

  return (
    <Card.Root
      width={["165px", "250px", "300px"]} // 100% para pantallas pequeñas, 250px para medianas, 300px para grandes
      height={["auto", "350px", "350px"]} // Altura dinámica para pantallas pequeñas, igual altura para medianas y grandes
      maxWidth="350px" // Maxima anchura para que no se estire más allá de esto
      boxShadow="2xl"
      position="relative"
      backgroundImage={`url(${backgroundImg})`} // Usa la imagen importada
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "none",
      }}
      transition="all 0.3s ease"
    >
      <Card.Body
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="2"
        p="4"
        borderRadius="md"
      >
        {isLoading ? (
          <>
            <Skeleton height="150px" width="150px" borderRadius="full" />
            <Skeleton height="20px" mt={2} width="60%" />
          </>
        ) : (
          <>
            <img
              src={img}
              alt={formattedName}
              style={{ width: "150px", height: "150px", objectFit: "contain" }}
            />
            <Text mt="2" fontWeight="bold">{formattedName}</Text>
          </>
        )}
      </Card.Body>

      <Card.Footer justifyContent="center">
        <PokemonDetails pokemon={pokemon} />
      </Card.Footer>
    </Card.Root>
  );
};

export default PokemonCard;
