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
        const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
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
      <h1>Transfer History</h1>
      <FilterHistoryButtons />
      <div className="history-cards">
        {history.map((transaction) => (
          <HistoryCard
            key={transaction._id}
            creditedAccount={transaction.creditedAccount}
            debitedAccount={transaction.debitedAccount}
            value={transaction.value}
            createdAt={transaction.createdAt}
          />
        ))}
      </div>
    </div>
   );
}

export default TransferHistory;