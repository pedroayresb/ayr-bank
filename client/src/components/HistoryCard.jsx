import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import '../styles/HistoryCard.css';

function HistoryCard(props) {
  const [creditedAccountName, setCreditedAccountName] = useState('');
  const [debitedAccountName, setDebitedAccountName] = useState('');

  const { creditedAccount,
    debitedAccount,
    value,
    createdAt } = props;

  useEffect(() => {
    const getCreditedAccountName = async () => {
      const { data } = await Axios.get(`http://localhost:5000/user/${creditedAccount}`); 
      setCreditedAccountName(data.user.user_name);
    };
    const getDebitedAccountName = async () => {
      const { data } = await Axios.get(`http://localhost:5000/user/${debitedAccount}`);
      setDebitedAccountName(data.user.user_name);
    };
    getCreditedAccountName();
    getDebitedAccountName();
  }, []);

  return ( 
    <div className="history-card">
      <div className="history-card-square">
        <p>From:</p>
        <p>{debitedAccountName}</p>
      </div>
      <div className="history-card-square">
        <p>To:</p>
        <p>{creditedAccountName}</p>
      </div>
      <div className="history-card-square">
        <p>Value:</p>
        <p>${value}</p>
      </div>
      <div className="history-card-square">
        <p>Date:</p>
        <p>{createdAt}</p>
      </div>
    </div>
   );
}

HistoryCard.propTypes = {
  creditedAccount: PropTypes.string.isRequired,
  debitedAccount: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default HistoryCard;