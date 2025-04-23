import { Card, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import backgroundImg from "../assets/images/cardBackground.jpg";
import PokemonDetails from "./PokemonDetails";
import { fetchPokemonDetails } from "../services/pokemonService";

const PokemonCard = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const { name, img, url } = pokemon || {};
  const formattedName = name ? name.charAt(0).toUpperCase() + name.slice(1) : "";

  useEffect(() => {
    const loadPokemonDetails = async () => {
      try {
        const details = await fetchPokemonDetails(url);
        setPokemonDetails(details);
      } catch (error) {
        console.error("Error al cargar detalles del pokémon:", error);
      }
    };

    if (url) {
      loadPokemonDetails();
    }
  }, [url]);

  return (
    <div style={{ position: "relative" }}>
      <Card.Root
        width={["165px", "250px", "300px"]}
        height={["auto", "350px", "350px"]}
        maxWidth="350px"
        boxShadow="2xl"
        backgroundImage={`url(${backgroundImg})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        _hover={{
          transform: "scale(1.05)",
          boxShadow: "none",
        }}
        transition="all 0.3s ease"
        cursor={"pointer"}
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
          <PokemonDetails pokemon={pokemonDetails} />
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default PokemonCard;
