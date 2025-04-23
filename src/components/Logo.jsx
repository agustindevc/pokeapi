import React from 'react'
import Pokemon_Logo from '../assets/images/Pokemon_logo.png';
import { Flex, Image } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

function Logo() {
  const moveCircular = keyframes`
    0% { transform: rotate(-4deg); }
    50% { transform: rotate(5deg); }
    100% { transform: rotate(-4deg); }
  `

  const animation = `${moveCircular} 3s ease-in-out infinite`

  return (
    <Flex
      justify="center"
      width="auto"
      marginTop="5%"
    >
      <Image
        src={Pokemon_Logo}
        alt="Pokemon Logo"
        maxWidth="30%"
        animation={animation}
      />
    </Flex>
  )
}

export default Logo