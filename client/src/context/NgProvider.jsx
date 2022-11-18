import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NgContext from './NgContext';

function NgProvider({ children }) {
  const [user, setUser] = useState({});
  const [account, setAccount] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [language, setLanguage] = useState(navigator.language);
  const [showBalance, setShowBalance] = useState(false);
  const [history, setHistory] = useState([]);

  const context = {
    user,
    setUser,
    account,
    setAccount,
    transactions,
    setTransactions,
    language,
    setLanguage,
    history,
    setHistory,
    showBalance,
    setShowBalance,
  };

  return (
    <NgContext.Provider value={ context }>
      {children}
    </NgContext.Provider>
  );
}

NgProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NgProvider;