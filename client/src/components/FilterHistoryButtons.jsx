import React, { useContext } from 'react';
import Axios from 'axios';
import NgContext from '../context/NgContext';

function FilterHistoryButtons() {
  const { user, setHistory } = useContext(NgContext);

  const sendFilter = async () => {
    const cookie = document.cookie;
    const body = {
      user_name: user.user_name,
      accessToken: cookie,
    };
    const { data } = await Axios.post(`http://localhost:5000/transaction/sendhistory`, body, { withCredentials: true });
    setHistory(data.sendTransactions);
  }

  const receiveFilter = async () => {
    const cookie = document.cookie;
    const body = {
      user_name: user.user_name,
      accessToken: cookie,
    };
    const { data } = await Axios.post(`http://localhost:5000/transaction/recievehistory`, body, { withCredentials: true });
     setHistory(data.recieveTransactions);
  }

  const allFilter = async () => {
    const cookie = document.cookie;
    const body = {
      user_name: user.user_name,
      accessToken: cookie,
    };
    const { data } = await Axios.post(`http://localhost:5000/transaction/history`, body, { withCredentials: true });
    setHistory(data.transactions);
  }

  return (
    <div>
      <button
        type="button"
        onClick={allFilter}
      >
        All
      </button>
      <button
        type="button"
        onClick={sendFilter}
      >
        Send
      </button>
      <button
        type="button"
        onClick={receiveFilter}
      >
        Receive
      </button>
    </div>
  );
}

export default FilterHistoryButtons;