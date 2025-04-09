import { Skeleton, Card, Text } from "@chakra-ui/react";
import PokemonDetails from "./PokemonDetails";
import backgroundImg from "../assets/images/cardBackground.jpg"; 
const PokemonCard = ({ pokemon }) => {
  const { name, img } = pokemon || {};
  const formattedName = name ? name.charAt(0).toUpperCase() + name.slice(1) : "";

  return (
    <Card.Root
      width={["165px", "250px", "300px"]} 
      height={["auto", "350px", "350px"]} 
      maxWidth="350px"
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
        <img
          src={img}
          alt={formattedName}
          style={{ width: "150px", height: "150px", objectFit: "contain" }}
        />
        <Text mt="2" fontWeight="bold">{formattedName}</Text>
      </Card.Body>

      <Card.Footer justifyContent="center">
        <PokemonDetails pokemon={pokemon} />
      </Card.Footer>
    </Card.Root>

  );
};

export default PokemonCard;
