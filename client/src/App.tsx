import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Startpage from './pages/Startpage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Homepage from './pages/Homepage';
import AyrProvider from './context/AyrProvider';
import './App.css';

function App() {
  return (
    <AyrProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Startpage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="/home" element={ <Homepage /> } />
        </Routes>
      </BrowserRouter>
    </AyrProvider>
  );
}

export default App;
