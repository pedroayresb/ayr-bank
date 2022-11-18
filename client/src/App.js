import React from 'react';
import { Routes } from 'react-router';
import { Route, useLocation } from 'react-router-dom';
import NgProvider from './context/NgProvider';
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
        <Route exact path="/" element={<Start />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/transfer" element={<Transfer />} />
        <Route exact path="/history" element={<History />} />
      </Routes>
    </NgProvider>
  );
}

export default App;
