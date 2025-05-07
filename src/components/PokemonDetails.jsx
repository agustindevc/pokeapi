import { Button, Popover, Portal, Box } from "@chakra-ui/react";

const PokemonDetails = ({ pokemon }) => {
  return (
    <Popover.Root lazyMount unmountOnExit>
      <Popover.Trigger asChild>
        <Button 
          size="sm" 
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          background="transparent"
          _hover={{ background: "rgba(0, 0, 0, 0.1)" }}
          border="none"
        >
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content 
            maxW={["250px", "300px"]}
            maxH="80vh"
            placement="auto-start"
            gutter={8}
            strategy="fixed"
            overflow="hidden"
            zIndex={1000}
            boxShadow="lg"
          >
            <Popover.Arrow />
            <Popover.Body 
              p={3} 
              overflowY="auto" 
              maxH="calc(80vh - 40px)"
              fontSize="sm"
            >
              <Box width="100%">
                {pokemon?.imggif && (
                  <Box display="flex" justifyContent="center">
                    <img 
                      src={pokemon.imggif} 
                      alt={pokemon.name} 
                      style={{ maxWidth: '150px', height: 'auto' }}
                    />
                  </Box>
                )}
                <br />
                <strong>Especie:</strong> {pokemon?.species}
                <br />
                <strong>Altura:</strong> {pokemon?.height / 10}m
                <br />
                <strong>Peso:</strong> {pokemon?.weight / 10}kg
                <br />
                <strong>-------------------</strong>
                <br />
                <strong>Tipo:</strong>
                <Box as="ul" paddingLeft="20px" margin="8px 0">
                  {pokemon?.types?.map((type, index) => (
                    <Box as="li" key={index}>{type}</Box>
                  ))}
                </Box>
                <strong>-------------------</strong>
                <br />
                <strong>Habilidades:</strong>
                <Box as="ul" paddingLeft="20px" margin="8px 0">
                  {pokemon?.abilities?.map((ability, index) => (
                    <Box as="li" key={index}>{ability}</Box>
                  ))}
                </Box>
                <strong>-------------------</strong>
                <br />
                <strong>Estadísticas:</strong>
                <Box as="ul" paddingLeft="20px" margin="8px 0">
                  {pokemon?.stats?.map((stat, index) => (
                    <Box as="li" key={index}>
                      {stat.name}: {stat.value}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default PokemonDetails;
