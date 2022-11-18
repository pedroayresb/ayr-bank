import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AccountButtonsContainer.css';

function AccountButtonsContainer() {
  const navigate = useNavigate();
  return ( 
    <div
      className="account-buttons-container"
    >
      <button
        className="account-button"
        onClick={() => navigate('/transfer')}
      >
        transfer
      </button>
      <button
        className="account-button"
        onClick={() => navigate('/history')}
      >
        history
      </button>
    </div>
   );
}

export default AccountButtonsContainer;