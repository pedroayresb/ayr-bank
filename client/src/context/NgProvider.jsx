import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NgContext from './NgContext';

function NgProvider({ children }) {
  const [user, setUser] = useState({});
  const [account, setAccount] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [jwt, setJwt] = useState('');
  const [language, setLanguage] = useState(navigator.language);
  const [showHistory, setShowHistory] = useState(false);

  const context = {
    user,
    setUser,
    account,
    setAccount,
    transactions,
    setTransactions,
    jwt,
    setJwt,
    language,
    setLanguage,
    showHistory,
    setShowHistory,
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