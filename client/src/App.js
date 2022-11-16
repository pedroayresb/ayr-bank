import React from 'react';
import { Routes } from 'react-router';
import { Route, useLocation } from 'react-router-dom';
import Start from './pages/Start';
import Login from './pages/Login';

function App() {
  const location = useLocation();
  return (
    <Routes location={ location } key={ location.pathname }>
      <Route exact path="/" element={<Start />} />
      <Route exact path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
