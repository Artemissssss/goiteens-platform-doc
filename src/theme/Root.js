import React, { useState, createContext, useContext } from 'react';

const DataContext = createContext();

export default function Root({ children }) {
  const [data, setData] = useState({ status: 0, login: "", idRoom: "", material:""});

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataContext.Provider');
  }
  return context;
}
