import { Card, Skeleton } from "@chakra-ui/react";
import PokemonDetails from "./PokemonDetails";
import backgroundImg from "../assets/images/cardBackground.jpg"; // Ruta correcta a la imagen

const PokemonCard = ({ pokemon, isLoading }) => {
  const { name, img } = pokemon || {};
  const formattedName = name ? name.charAt(0).toUpperCase() + name.slice(1) : '';

  // Si el Pokémon aún no está cargado, mostramos el Skeleton
  if (isLoading) {
    return (
      <Card.Root
        width="300px"
        height="350px"
        boxShadow="2xl"
        position="relative"
        backgroundImage={`url(${backgroundImg})`}
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
          {/* Skeleton para la imagen */}
          <Skeleton height="150px" width="150px" borderRadius="full" />

          {/* Skeleton para el nombre */}
          <Skeleton height="20px" width="80%" mt="2" />
        </Card.Body>

        <Card.Footer justifyContent="center">
          {/* Skeleton para el footer (detalles del Pokémon) */}
          <Skeleton height="20px" width="50%" />
        </Card.Footer>
      </Card.Root>
    );
  }

  // Si ya se cargaron los datos, muestra la tarjeta
  return (
    <Card.Root
      width="300px"
      height="350px"
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
        <img
          src={img}
          alt={formattedName}
          style={{ width: "150px", height: "150px", objectFit: "contain" }}
        />
        <Card.Title mt="2">{formattedName}</Card.Title>
      </Card.Body>

      <Card.Footer justifyContent="center">
        <PokemonDetails pokemon={pokemon} />
      </Card.Footer>
    </Card.Root>
  );
};

export default PokemonCard;
