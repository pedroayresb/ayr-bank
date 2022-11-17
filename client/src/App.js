import React from 'react';
import { Routes } from 'react-router';
import { Route, useLocation } from 'react-router-dom';
import NgProvider from './context/NgProvider';
import Start from './pages/Start';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  const location = useLocation();
  return (
    <NgProvider>
      <Routes location={ location } key={ location.pathname }>
        <Route exact path="/" element={<Start />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </NgProvider>
  );
}

export default App;
