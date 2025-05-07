import { Button, Popover, Portal } from "@chakra-ui/react";

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
              <div style={{ width: '100%' }}>
                {pokemon?.imggif && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img 
                      src={pokemon.imggif} 
                      alt={pokemon.name} 
                      style={{ maxWidth: '150px', height: 'auto' }}
                    />
                  </div>
                )}
                <br />
                <strong>Especie:</strong> {pokemon?.species}
                <br />
                <strong>Altura:</strong> {pokemon?.height / 10}m
                <br />
                <strong>Peso:</strong> {pokemon?.weight / 10}kg
                <br />
                <strong>Tipo:</strong>
                <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                  {pokemon?.types?.map((type, index) => (
                    <li key={index}>{type}</li>
                  ))}
                </ul>
                <strong>Habilidades:</strong>
                <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                  {pokemon?.abilities?.map((ability, index) => (
                    <li key={index}>{ability}</li>
                  ))}
                </ul>
                <strong>Estadísticas:</strong>
                <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                  {pokemon?.stats?.map((stat, index) => (
                    <li key={index}>
                      {stat.name}: {stat.value}
                    </li>
                  ))}
                </ul>
              </div>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default PokemonDetails;