import React, { useContext, useState, useEffect } from 'react';
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
      const formattedTime = `${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`;
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
    console.log(data);
    const orderedDateTime = data.recieveTransactions.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
    const formattedTime = orderedDateTime.map((transaction) => {
      const date = new Date(transaction.createdAt);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      const formattedTime = `${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`;
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
      const formattedTime = `${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`;
      const unordered = { ...transaction, createdAt: `${formattedDate} ${formattedTime}` };
      return unordered;
    });
    setHistory(formattedTime);
  }

  const filterByDate = async (e) => {
    const date = new Date(e.target.value);
    date.setDate(date.getDate() + 1);
    const cookie = document.cookie.split('=')[1];
    const body = {
      user_name: user.user_name,
      accessToken: cookie,
      date,
    };
    const { data } = await Axios.post(`http://localhost:5000/transaction/history`, body, { withCredentials: true });
    const isInDate = data.transactions.filter((transaction) => {
      const dataDate = new Date(transaction.createdAt);
      return date.getDate() === dataDate.getDate() && date.getMonth() === dataDate.getMonth() && date.getFullYear() === dataDate.getFullYear();
    });
    const orderedDateTime = isInDate.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB;
    });
    const formattedTime = orderedDateTime.map((transaction) => {
      const mapDate = new Date(transaction.createdAt);
      const formattedDate = `${mapDate.getDate()}/${mapDate.getMonth() + 1}/${mapDate.getFullYear()}`;
      const formattedTime = `${mapDate.getHours()}:${('0'+mapDate.getMinutes()).slice(-2)}`;
      const unordered = { ...transaction, createdAt: `${formattedDate} ${formattedTime}` };
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