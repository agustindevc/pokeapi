import { Button, Popover, Portal } from "@chakra-ui/react"

const PokemonDetails = ({pokemon}) => {
  return (
    <Popover.Root lazyMount unmountOnExit>
      <Popover.Trigger asChild>
        <Button size="sm" variant="outline">
          Ver Detalles
        </Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
                <div>
                <img src={pokemon.imggif}></img>
                <br />
                  <strong>Estadísticas:</strong>
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
  )
}

export default PokemonDetails;
