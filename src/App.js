import './App.css';
import Menu from './Components/Menu';
import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Questionnaire from './Components/Questionnaire';
import Navbar from './Components/Navbar';

function App() {
  return (
    <ChakraProvider> {/* Wrap your entire application with ChakraProvider */}
      <div className="App">
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element={<Menu/>}></Route>
            <Route path='/q' element={<Questionnaire/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
