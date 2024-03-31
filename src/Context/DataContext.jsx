// Import necessary modules
import React, { createContext, useContext, useEffect, useState } from 'react';



const DataContext = createContext();


export const useDataContext = () => useContext(DataContext);


export const DataProvider = ({ children }) => {

  const [routeData, setRouteDataState] = useState(() => {
   
    const storedData = localStorage.getItem('routeData');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [data,setData] = useState({})

 
  const setRouteData = (data) => {
   
    setRouteDataState(data);
   
    localStorage.setItem('routeData', JSON.stringify(data));
  };

 
  useEffect(() => {
    return () => {
      localStorage.removeItem('routeData');
    };
  }, []);

  
  return (
    <DataContext.Provider value={{ routeData, setRouteData,data,setData }}>
      {children}
    </DataContext.Provider>
  );
};
