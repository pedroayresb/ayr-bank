import React, { useEffect, useContext } from 'react';
import NgContext from '../context/NgContext';
import HistoryCard from './HistoryCard';
import FilterHistoryButtons from './FilterHistoryButtons';
import Axios from 'axios';
import '../styles/TransferHistory.css';

function TransferHistory() {
  const { history, user, setHistory } = useContext(NgContext);

  useEffect(() => {
    const getHistory = async () => {
      const cookie = document.cookie.split('=')[1];
      const { data } = await Axios.post(`http://localhost:5000/transaction/history`, {
        user_name: user.user_name,
        accessToken: cookie
      }, { withCredentials: true });
      const formattedTime = data.transactions.map((transaction) => {
        const date = new Date(transaction.createdAt);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`;
        const unordered = { ...transaction, createdAt: `${formattedDate} ${formattedTime}` };
        return unordered;
      });
      const ordered = formattedTime.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });
      setHistory(ordered);
    };
    getHistory();
  }, []);


  return ( 
    <div
      className="transfer-history"
    >
      <FilterHistoryButtons />
      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr className="history-table-line">
              <th className="history-table-head">Sender</th>
              <th className="history-table-head">Recipient</th>
              <th className="history-table-head">Amount</th>
              <th className="history-table-head">Date</th>
            </tr>
          </thead>
          {history.map((transaction) => (
            <HistoryCard
              key={transaction._id}
              creditedAccount={transaction.creditedAccount}
              debitedAccount={transaction.debitedAccount}
              value={transaction.value}
              createdAt={transaction.createdAt}
            />
          ))}
        </table>
      </div>
    </div>
   );
}

export default TransferHistory;