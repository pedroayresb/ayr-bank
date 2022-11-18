import React, { useContext, useState } from 'react';
import NgContext from '../context/NgContext';
import Axios from 'axios';
import '../styles/TransferForm.css';

function TransferForm() {
  const { user, setAccount } = useContext(NgContext);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');


  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cookie = document.cookie.split('=')[1];
    const body = {
      user_name: user.user_name,
      reciever_name: recipient,
      amount: amount,
      accessToken: cookie
    };
    const { data } = await Axios.put('http://localhost:5000/transaction/transfer', body, { withCredentials: true })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
    setAccount(data.newAccount);
    setMessage(data.message);
  };

  return ( 
    <div
      className="transfer-form"
    >
      <h1>Transfer</h1>
      <form>
        <label htmlFor="to">
          To:
          <input
            type="text"
            name="to"
            id="to"
            onChange={handleRecipientChange}
          />
        </label>
        <label htmlFor="value">
          Value: $
          <input
            type="number"
            name="value"
            id="value"
            onChange={handleAmountChange}
          />
        </label>
        <button
          type="button"
          onClick={handleSubmit}
        >
          Transfer
        </button>
      </form>
      <p>{message}</p>
    </div>
   );
}

export default TransferForm;