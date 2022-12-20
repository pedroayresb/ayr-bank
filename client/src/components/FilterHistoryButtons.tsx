import * as React from 'react';
import Axios from 'axios';
import { NgContext } from '../context/NgContext';
import '../styles/FilterHistoryButtons.css';

interface body {
  user_name: string;
  accessToken: string;
}

interface Transactions {
  id: number;
  value: number;
  creditedAccount: number;
  debitedAccount: number;
  createdAt: Date | string;
  updatedAt: Date;
}

  

function FilterHistoryButtons() {
  const { user, setHistory } = React.useContext(NgContext);
  const sendFilter = async () => {
    const cookie: string = localStorage.getItem('accessToken')!;
    const body: body = {
      user_name: user.user_name,
      accessToken: cookie,
    };
    const { data }: any = await Axios.post(`http://localhost:5000/transaction/sendhistory`, body, { withCredentials: true })
      .catch((err: Error) => console.log(err));
    const orderedDateTime: Transactions[] = data.sendTransactions.sort((a:Transactions, b:Transactions) => {
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
  }

  const receiveFilter = async () => {
    const cookie: string = localStorage.getItem('accessToken')!;
    const body: body = {
      user_name: user.user_name,
      accessToken: cookie,
    };
    const { data }: any = await Axios.post(`http://localhost:5000/transaction/recievehistory`, body, { withCredentials: true })
      .catch((err: Error) => console.log(err));
    const orderedDateTime: Transactions[] = data.recieveTransactions.sort((a:Transactions, b:Transactions) => {
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
  }

  const allFilter = async () => {
    const cookie: string = localStorage.getItem('accessToken')!;
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
  }

  const filterByDate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const date: Date = new Date(e.target.value);
    date.setDate(date.getDate() + 1);
    const cookie: string = localStorage.getItem('accessToken')!;
    const body: body = {
      user_name: user.user_name,
      accessToken: cookie,
    };
    const { data }: any = await Axios.post(`http://localhost:5000/transaction/history`, body, { withCredentials: true })
      .catch((err: Error) => console.log(err));
    const isInDate = data.transactions.filter((transaction:Transactions) => {
      const dataDate: Date = new Date(transaction.createdAt);
      return date.getDate() === dataDate.getDate() && date.getMonth() === dataDate.getMonth() && date.getFullYear() === dataDate.getFullYear();
    });
    const orderedDateTime: Transactions[] = isInDate.sort((a:Transactions, b:Transactions) => {
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
  }


  
  return (
    <div className="filter-history-filters">
      <div className="filter-history-buttons">
        <button
          type="button"
          onClick={allFilter}
          className="filter-history-button"
        >
          All
        </button>
        <button
          type="button"
          onClick={sendFilter}
          className="filter-history-button"
        >
          Send
        </button>
        <button
          type="button"
          onClick={receiveFilter}
          className="filter-history-button"
        >
          Receive
        </button>
      </div>
      <input
        type="date"
        className="filter-history-button"
        onChange={(e) => filterByDate(e)}
      />
    </div>
  );
}

export default FilterHistoryButtons;