import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AccountButtonsContainer.css';

function AccountButtonsContainer() {
  const navigate = useNavigate();
  const url = window.location.href;

  const handleSecondTransferClick = () => {
    if (url.includes('transfer')) {
      return '/home';
    } else {
      return '/transfer';
    }
  };

  const handleHistoryClick = () => {
    if (url.includes('history')) {
      return '/home';
    } else {
      return '/history';
    }
  };


  return ( 
    <div
      className="account-buttons-container"
    >
      <button
        className="account-button"
        onClick={() => navigate(handleSecondTransferClick())}
      >
        transfer
      </button>
      <button
        className="account-button"
        onClick={() => navigate(handleHistoryClick())}
      >
        history
      </button>
    </div>
   );
}

export default AccountButtonsContainer;