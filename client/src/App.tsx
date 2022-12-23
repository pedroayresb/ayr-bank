import React from 'react';
import { Routes } from 'react-router';
import { Route, useLocation } from 'react-router-dom';
import NgProvider from './context/NgContext';
import Start from './pages/Start';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Transfer from './pages/Transfer';
import History from './pages/History';
import './index.css';

function App() {
  const location = useLocation();
  return (
    <NgProvider>
      <Routes location={ location } key={ location.pathname }>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </NgProvider>
  );
}

export default App;