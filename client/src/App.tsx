import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AyrProvider from './context/AyrProvider';
import './App.css';

function App() {
  return (
    <AyrProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Homepage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
        </Routes>
      </BrowserRouter>
    </AyrProvider>
  );
}

export default App;
