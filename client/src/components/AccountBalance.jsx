import React, { useContext, useState } from 'react';
import NgContext from '../context/NgContext';

function AccountBalance() {
  const { account, showBalance } = useContext(NgContext);

  const isBalanceVisible = () => {
    if (showBalance) {
      return account.balance.toFixed(2);
    } else {
      return '***';
    }
  };

  return (
    <div className="account-balance">
      <h1>R$ {isBalanceVisible()}</h1>
    </div>
  );
}

export default AccountBalance;
