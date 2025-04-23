import React from "react";
import { ButtonGroup, IconButton, Text } from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const MyPagination = ({ page, totalPages, onPageChange }) => {
  return (
    <ButtonGroup gap="4" size="sm" variant="ghost" justifyContent="center">
      <IconButton
        onClick={() => onPageChange(page - 1)}
        isDisabled={page <= 1}
        aria-label="Página anterior"
      >
        <HiChevronLeft />
      </IconButton>

      <Text>
        Página {page} de {totalPages}
      </Text>

      <IconButton
        onClick={() => onPageChange(page + 1)}
        isDisabled={page >= totalPages}
        aria-label="Página siguiente"
      >
        <HiChevronRight />
      </IconButton>
    </ButtonGroup>
  );
};

export default MyPagination;
