import { Card, Text, Skeleton, Stack } from "@chakra-ui/react";
import backgroundImg from "../assets/images/cardBackground.jpg";
import PokemonDetails from "./PokemonDetails";

import { useGetPokemonByUrl } from "./hooks/useGetPokemonByurl";

const PokemonCard = ({ pokemon }) => {
  const {data: pokemonDetails, isLoading} = useGetPokemonByUrl(pokemon.url);

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
          {isLoading ? (
            <Stack width="100%" spacing={4} align="center">
              <Skeleton height="150px" width="150px" borderRadius="lg" />
              <Skeleton height="20px" width="120px" />
            </Stack>
          ) : (
            <>
              <img
                src={pokemonDetails.img}
                alt={pokemonDetails.name}
                style={{ width: "150px", height: "150px", objectFit: "contain" }}
              />
              <Text mt="2" fontWeight="bold">
                {pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1)}
              </Text>
              <PokemonDetails pokemon={pokemonDetails} />
            </>
          )}
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default PokemonCard;