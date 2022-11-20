import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/StartButtonsContainer.css';

function LoginButtonsContainer() {
  const navigate = useNavigate();
  return ( 
    <div 
      className="login-buttons-container"
    >
      <button 
        className="start-button"
        onClick={() => navigate('/login')}
      >
        login
      </button>
      <button 
        className="start-button"
        onClick={() => navigate('/register')}
      >
        sign up
      </button>
    </div>
  );
}

export default LoginButtonsContainer;