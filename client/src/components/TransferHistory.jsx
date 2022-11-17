import React, { useEffect, useContext } from 'react';
import NgContext from '../context/NgContext';
import FilterHistoryButtons from './FilterHistoryButtons';
import Axios from 'axios';

function TransferHistory() {
  const { history, user, setHistory } = useContext(NgContext);

  useEffect(() => {
    const getHistory = async () => {
      const cookie = document.cookie;
      const { data } = await Axios.post(`http://localhost:5000/transaction/history`, {
        user_name: user.user_name,
        accessToken: cookie
      }, { withCredentials: true });
      setHistory(data.transactions);
    };
    getHistory();
  }, []);

  return ( 
    <div
      className="transfer-history"
    >
      <h1>Transfer History</h1>
      <FilterHistoryButtons />
      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.creditedAccount}</td>
              <td>{transaction.debitedAccount}</td>
              <td>{transaction.value}</td>
              <td>{transaction.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   );
}

export default TransferHistory;