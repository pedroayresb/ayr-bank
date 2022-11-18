import React, { useContext } from 'react';
import NgContext from '../context/NgContext';
import openeye from '../icons/openeye.png';
import closedeye from '../icons/closedeye.png';
import '../styles/HideBalanceButton.css';

function HideBalanceButton() {
  const { showBalance, setShowBalance } = useContext(NgContext);
  const buttonImg = showBalance ? openeye : closedeye;

  return (
    <button
      onClick={() => setShowBalance(!showBalance)}
      type="button"
      className="hide-balance-button"
    >
      <img 
        src={buttonImg} 
        alt="hide balance" 
        className="hide-balance-button-icon"
      />
    </button>
  );
}

export default HideBalanceButton;