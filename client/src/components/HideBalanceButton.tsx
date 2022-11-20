import * as React from 'react';
import { NgContext } from '../context/NgContext';
import * as openeye from '../icons/openeye.png';
import * as closedeye from '../icons/closedeye.png';
import '../styles/HideBalanceButton.css';

function HideBalanceButton() {
  const { showBalance, setShowBalance } = React.useContext(NgContext);
  const buttonImg = showBalance ? openeye.default : closedeye.default;

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