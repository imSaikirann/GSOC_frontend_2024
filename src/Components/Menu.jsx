import React from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../Context/DataContext';

const conditionsArray = [
  { name: "Asthma", image: "asthma.jpg" },
  { name: "Diabetes", image: "diabetes.jpg" },
 
];

export default function Menu() {
  const navigate = useNavigate();
  const { setRouteData } = useDataContext();

  const handleConditionClick = (condition) => {
    navigate('/q');
    setRouteData(condition.name);
  };

  return (
    <Box bgColor="#F7F7F8" minHeight="100vh" py={8} px={[4, 8]} > {/* Responsive padding */}
      <Flex flexWrap="wrap" justifyContent="center" gap={4} > {/* Responsive layout */}
        {conditionsArray.map((condition, index) => (
          <Box key={index} onClick={() => handleConditionClick(condition)} w={["90%", "230px"]} maxWidth={300} cursor="pointer" boxShadow="md" mb={4} > {/* Responsive width */}
            <Image src={condition.image} alt={condition.name} w="100%" h="auto" />
            <p>{condition.name}</p>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}
