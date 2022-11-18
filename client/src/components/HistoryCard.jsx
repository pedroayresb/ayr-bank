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
  }, [creditedAccount, debitedAccount]);

  return ( 
    <tbody className="history-table-line">
      <tr className="history-table-body">
        <td>{creditedAccountName}</td>
        <td>{debitedAccountName}</td>
        <td>{value}</td>
        <td>{createdAt}</td>
      </tr>
  </tbody>
   );
}

HistoryCard.propTypes = {
  creditedAccount: PropTypes.number.isRequired,
  debitedAccount: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default HistoryCard;