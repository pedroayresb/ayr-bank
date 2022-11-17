import React, { useContext } from 'react';
import NgContext from '../context/NgContext';

function AccountButtonsContainer() {
  const { setShowHistory } = useContext(NgContext);
  return ( 
    <div
      className="account-buttons-container"
    >
      <button
        className="account-button"
        onClick={() => setShowHistory(false)}
      >
        Transfer
      </button>
      <button
        className="account-button"
        onClick={() => setShowHistory(true)}
      >
        History
      </button>
    </div>
   );
}

export default AccountButtonsContainer;