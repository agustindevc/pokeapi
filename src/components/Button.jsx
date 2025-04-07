import { Button as ChakraButton } from "@chakra-ui/react";
const CustomButton = ({ text, onClick, disabled }) => {
  return (
    <ChakraButton onClick={onClick} disabled={disabled}>
      {text}
    </ChakraButton>
  );
};

export default CustomButton;
