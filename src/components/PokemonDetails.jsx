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
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <div>
                {pokemon?.imggif && <img src={pokemon.imggif} alt={pokemon.name} />}
                <br />
                <strong>Estadísticas:</strong>
                <ul>
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
