import { ButtonGroup, IconButton, Button } from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Pagination } from "@chakra-ui/react";

const MyPagination = ({ page, totalPages, onPrevPage, onNextPage, onPageChange }) => {
  return (
    // Componente principal para la paginación con Chakra UI
    <Pagination.Root
      count={totalPages} // Total de páginas disponibles
      pageSize={1}       // Tamaño de cada página (1 en este caso)
      page={page}        // Página actual
      onPageChange={(newPage) => {
        // Verifica que el cambio de página es válido antes de llamarlo
        if (typeof newPage === "number") {
          onPageChange(newPage); // Llama a la función onPageChange con el número de la nueva página
        }
      }}
    >
      <ButtonGroup gap="4" size="sm" variant="ghost">
        {/* Botón de retroceso */}
        <Pagination.PrevTrigger asChild>
          <IconButton onClick={onPrevPage} isDisabled={page <= 1}>
            <HiChevronLeft /> {/* Icono de flecha hacia la izquierda */}
          </IconButton>
        </Pagination.PrevTrigger>

        {/* Texto que muestra la página actual */}
        <Pagination.PageText />

        {/* Botón de avance */}
        <Pagination.NextTrigger asChild>
          <IconButton onClick={onNextPage} isDisabled={page >= totalPages}>
            <HiChevronRight /> {/* Icono de flecha hacia la derecha */}
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default MyPagination;
