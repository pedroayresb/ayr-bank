import React, { useContext } from 'react';
import Axios from 'axios';
import NgContext from '../context/NgContext';
import '../styles/FilterHistoryButtons.css';

function FilterHistoryButtons() {
  const { user, setHistory } = useContext(NgContext);

  const sendFilter = async () => {
    const cookie = document.cookie.split('=')[1];
    const body = {
      user_name: user.user_name,
      accessToken: cookie,
    };
    const { data } = await Axios.post(`http://localhost:5000/transaction/sendhistory`, body, { withCredentials: true });
    const orderedDateTime = data.sendTransactions.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
    const formattedTime = orderedDateTime.map((transaction) => {
      const date = new Date(transaction.createdAt);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
      const unordered = { ...transaction, createdAt: `${formattedDate} ${formattedTime}` };
      return unordered;
    });
    setHistory(formattedTime);
  }

  const receiveFilter = async () => {
    const cookie = document.cookie.split('=')[1];
    const body = {
      user_name: user.user_name,
      accessToken: cookie,
    };
    const { data } = await Axios.post(`http://localhost:5000/transaction/recievehistory`, body, { withCredentials: true });
    const orderedDateTime = data.recieveTransactions.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
    const formattedTime = orderedDateTime.map((transaction) => {
      const date = new Date(transaction.createdAt);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
      const unordered = { ...transaction, createdAt: `${formattedDate} ${formattedTime}` };
      return unordered;
    });
    setHistory(formattedTime);
  }

  const allFilter = async () => {
    const cookie = document.cookie.split('=')[1];
    const body = {
      user_name: user.user_name,
      accessToken: cookie,
    };
    const { data } = await Axios.post(`http://localhost:5000/transaction/history`, body, { withCredentials: true });
    const orderedDateTime = data.transactions.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
    const formattedTime = orderedDateTime.map((transaction) => {
      const date = new Date(transaction.createdAt);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      const formattedTime = `${date.getHours()}:${date.getMinutes()}`;
      const unordered = { ...transaction, createdAt: `${formattedDate} ${formattedTime}` };
      return unordered;
    });
    setHistory(formattedTime);
  }

  return (
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
  );
}

export default FilterHistoryButtons;