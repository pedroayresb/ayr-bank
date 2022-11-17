import React, { useContext } from 'react';
import NgContext from '../context/NgContext';
import TransferForm from './TransferForm';
import TransferHistory from './TransferHistory';
import '../styles/AccountActionContainer.css';

function AccountActionContainer() {
  const { showHistory } = useContext(NgContext);
  return ( 
    <div
      className="account-action-container"
    >
      {showHistory ? <TransferHistory /> : <TransferForm />}
    </div>
   );
}

export default AccountActionContainer;