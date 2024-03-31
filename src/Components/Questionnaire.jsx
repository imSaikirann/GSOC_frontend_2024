import React, { useState, useEffect } from 'react';
import { useDataContext } from '../Context/DataContext';
import axios from 'axios';
import { Button, Input, Text, Checkbox, VStack, ListItem, UnorderedList, Box, HStack, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const InputSelector = () => {
  const { routeData } = useDataContext();
  const [data, setData] = useState({});
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [textInputValue, setTextInputValue] = useState('');
  const [questionHistory, setQuestionHistory] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/db/${routeData}`);
        setData(response.data[0].data);
        setSelectedCheckboxes([]);
        setTextInputValue('');
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [routeData]);

  useEffect(() => {
    console.log("Updated Question History:", questionHistory);
  }, [questionHistory]);

  const handleInputChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCheckboxes(prevSelectedCheckboxes => [...prevSelectedCheckboxes, value]);
    } else {
      setSelectedCheckboxes(prevSelectedCheckboxes => prevSelectedCheckboxes.filter((checkbox) => checkbox !== value));
    }
  };

  const handleTextInputChange = (event) => {
    setTextInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (data && data.answer && (selectedCheckboxes.length > 0 || textInputValue.trim() !== '')) {
      let answerData = '';
      if (selectedCheckboxes.length > 0) {
        answerData = selectedCheckboxes.join(', ');
      } else {
        answerData = textInputValue.trim();
      }

      const questionData = {
        question: data.question,
        answer: answerData,
        selectedCheckboxes: selectedCheckboxes.join(', ')
      };
      setQuestionHistory(prevHistory => [...prevHistory, questionData]);

      if (selectedCheckboxes.length > 0) {
        const selectedOption = selectedCheckboxes[0];
        const matchingIndex = data.answer.findIndex(option => option.toLowerCase().trim() === selectedOption.toLowerCase().trim());
        if (matchingIndex !== -1 && data.options && data.options[matchingIndex]) {
          setData(data.options[matchingIndex]);
          setSelectedCheckboxes([]);
        } else {
          console.log("No matching option found in data.options");
          setCompleted(true);
        }
      }

      if (textInputValue.trim() !== '') {
        const matchingIndex = data.answer.findIndex(option => option.toLowerCase().trim() === textInputValue.toLowerCase().trim());
        if (matchingIndex !== -1 && data.options && data.options[matchingIndex]) {
          setData(data.options[matchingIndex]);
          setSelectedCheckboxes([]);
        } else {
          console.log("No matching option found in data.options");
          setCompleted(true);
        }
        setTextInputValue('');
      }
    }
  };

  const renderInputField = (inputType, answers) => {
    switch (inputType) {
      case 'checkbox':
        return (
          <VStack align="start" spacing={2}>
            {answers.map((option, index) => (
              <Checkbox
                key={index}
                isChecked={selectedCheckboxes.includes(option)}
                onChange={handleInputChange}
                value={option}
                colorScheme="green"
                size="lg"
              >
                {option}
              </Checkbox>
            ))}
          </VStack>
        );

      case 'text':
        return (
          <div>
            <label>
              <Input type="text" value={textInputValue} onChange={handleTextInputChange} w={["300px","400px"]} placeholder="Give input here" />
            </label>
            <HStack alignItems="center" justifyContent="center" textAlign="center" mt={2}>
              <Text >Use this words:</Text>
              <UnorderedList style={{ display: 'flex', flexDirection: 'row', listStyleType: 'none', paddingLeft: 0 }} >
                {answers.map((answer, index) => (
                  <ListItem key={index}>{answer},</ListItem>
                ))}
              </UnorderedList>
            </HStack>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height='100vh'>
      {completed ? (
        <div>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Question</Th>
                <Th>Answer</Th>
              </Tr>
            </Thead>
            <Tbody>
              {questionHistory.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.question}</Td>
                  <Td>{item.answer}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Button mt={8} px="8" py="4"  bgColor="green.200" _hover={{ bgColor: "white", border: "2px solid", borderColor: "green.200", color: "green.500" }} onClick={() => setCompleted(false)}>Reset</Button>
        </div>
      ) : (
        <Box p="1rem">
          <Text fontSize={["lg","2xl"]} mb="1rem" textAlign="left">{data.question}</Text>
          {renderInputField(data.inputType, data.answer)}
          <Button mt={8} px="8" py="4"  bgColor="green.200" _hover={{ bgColor: "white", border: "2px solid", borderColor: "green.200", color: "green.500" }} onClick={handleSubmit}>Submit</Button>
        </Box>
      )}
    </Box>
  );
};

export default InputSelector;
