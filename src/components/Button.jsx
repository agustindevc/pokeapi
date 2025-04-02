import { Button as ChakraButton } from "@chakra-ui/react"; // Importamos el botón de Chakra UI y lo renombramos a ChakraButton

// Componente de botón personalizado que utiliza Chakra UI
const CustomButton = ({ text, onClick, disabled }) => {
  return (
    // Renderizamos el botón de Chakra UI con las propiedades pasadas como props
    <ChakraButton onClick={onClick} disabled={disabled}>
      {text} {/* Muestra el texto del botón */}
    </ChakraButton>
  );
};

export default CustomButton; // Exportamos el componente para su uso en otros lugares
