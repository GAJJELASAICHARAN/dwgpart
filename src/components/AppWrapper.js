// src/components/AppWrapper.jsx
import React, { useState } from 'react';
import App from './App';

const AppWrapper = () => {
  const [key, setKey] = useState(0);

  const refreshApp = () => {
    setKey(prevKey => prevKey + 1);
  };

  return <App key={key} refreshApp={refreshApp} />;
};

export default AppWrapper;