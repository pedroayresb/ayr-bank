import * as React from 'react';
import { NgContext } from '../context/NgContext';
import HistoryCard from './HistoryCard';
import FilterHistoryButtons from './FilterHistoryButtons';
import Axios from 'axios';
import '../styles/TransferHistory.css';

interface body {
  user_name: string;
  accessToken: string;
}

interface Transactions {
  id: number;
  value: number;
  creditedAccount: number;
  debitedAccount: number;
  createdAt: any;
  updatedAt: Date;
}

function TransferHistory() {
  const { history, user, setHistory } = React.useContext(NgContext);

  React.useEffect(() => {
    const getHistory = async () => {
      const cookie: string = document.cookie.split('=')[1];
      const body: body = {
        user_name: user.user_name,
        accessToken: cookie,
      };
      const { data }: any = await Axios.post(`http://localhost:5000/transaction/history`, body, { withCredentials: true })
        .catch((err: Error) => console.log(err));
      const orderedDateTime: Transactions[] = data.transactions.sort((a:Transactions, b:Transactions) => {
        const dateA: any = new Date(a.createdAt);
        const dateB: any = new Date(b.createdAt);
        return dateA - dateB;
      });
      const formattedTime: Transactions[] = orderedDateTime.map((transaction:Transactions) => {
        const date: Date = new Date(transaction.createdAt);
        const formattedDate: string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const formattedTime: string = `${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`;
        const unordered: Transactions = { ...transaction, createdAt: `${formattedDate} ${formattedTime}` };
        return unordered;
      });
      setHistory(formattedTime);
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
              key={transaction.id}
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