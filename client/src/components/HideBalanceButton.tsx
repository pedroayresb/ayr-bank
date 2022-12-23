import * as React from 'react';
import { NgContext } from '../context/NgContext';
import '../styles/HideBalanceButton.css';

function HideBalanceButton() {
  const { showBalance, setShowBalance } = React.useContext(NgContext);

  return (
    <button
      onClick={() => setShowBalance(!showBalance)}
      type="button"
      className="hide-balance-button"
    >
      <img
        alt="hide balance" 
        className="hide-balance-button-icon"
      />
    </button>
  );
}

export default HideBalanceButton;