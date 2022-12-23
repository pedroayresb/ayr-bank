import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeaderButtons.css';


function HeaderButtons() {
  const navigate = useNavigate();
  return ( 
      <button
        type="button"
        className="header-button"
        onClick={() => {
          localStorage.removeItem('accessToken');
          navigate('/');
        }}
      >
        <img
          alt="logout"
          className="header-button-icon"
        />
      </button>
   );
}

export default HeaderButtons;