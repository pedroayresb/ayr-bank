import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as logout from '../icons/logout.png';
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
          src={logout.default}
          alt="logout"
          className="header-button-icon"
        />
      </button>
   );
}

export default HeaderButtons;