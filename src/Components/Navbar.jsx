import React from 'react';
import { Flex, Spacer, Box,  Stack, Heading } from '@chakra-ui/react';
import { Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <Flex bgColor="#D5F9E7" p="6" alignItems="center" justifyContent='center' >
      <Box>
        <Heading fontSize="2xl" >ClinicalMatch</Heading>
      </Box>
    </Flex>
  );
}
