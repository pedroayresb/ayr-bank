import React from 'react';
import { useNavigate } from 'react-router-dom';

function HeaderButtons() {
  const navigate = useNavigate();
  return ( 
    <div
      className="header-buttons"
    >
      <button
        type="button"
        onClick={() => {
          document.cookie = 'accessToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
          navigate('/');
        }}
      >
        Logout
      </button>
    </div>
    
   );
}

export default HeaderButtons;