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
          document.cookie = 'accessToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
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