import { Button, Popover, Portal } from "@chakra-ui/react";

const PokemonDetails = ({ pokemon }) => {
  return (
    // Componente Popover para mostrar detalles del Pokémon al hacer clic
    <Popover.Root lazyMount unmountOnExit>
      
      {/* Botón para activar el Popover que muestra los detalles del Pokémon */}
      <Popover.Trigger asChild>
        <Button size="sm" color={"white"} background={"black"} border={"1px solid grey"}>
          Ver Detalles
        </Button>
      </Popover.Trigger>

      {/* Portal asegura que el contenido del Popover se renderice fuera del flujo normal */}
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow /> {/* Flecha del Popover que indica la posición del botón */}
            <Popover.Body>
              {/* Contenido del Popover que muestra la imagen y estadísticas del Pokémon */}
              <div>
                <img src={pokemon.imggif} alt={pokemon.name} /> {/* Imagen animada del Pokémon */}
                <br />
                <strong>Estadísticas:</strong>
                {/* Lista de estadísticas del Pokémon */}
                <ul>
                  {pokemon.stats.map((stat, index) => (
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

