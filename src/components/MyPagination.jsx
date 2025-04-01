import { ButtonGroup, IconButton, Button } from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Pagination } from "@chakra-ui/react";

const MyPagination = ({ page, totalPages, onPrevPage, onNextPage, onPageChange }) => {
  return (
    <Pagination.Root 
      count={totalPages} 
      pageSize={1} 
      page={page} 
      onPageChange={(newPage) => {
        if (typeof newPage === "number") {
          onPageChange(newPage); // Asegura que es un número válido
        }
      }}
    >
      <ButtonGroup gap="4" size="sm" variant="ghost">
        <Pagination.PrevTrigger asChild>
          <IconButton onClick={onPrevPage} isDisabled={page <= 1}>
            <HiChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.PageText />
        <Pagination.NextTrigger asChild>
          <IconButton onClick={onNextPage} isDisabled={page >= totalPages}>
            <HiChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default MyPagination;
