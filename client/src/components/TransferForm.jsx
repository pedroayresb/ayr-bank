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
      className="transfer-form-container"
    >
      <form className="transfer-form">
        <label htmlFor="to" className="transfer-form-label">
          to:
          <input
            type="text"
            name="to"
            id="to"
            className='transfer-input'
            onChange={handleRecipientChange}
          />
        </label>
        <label htmlFor="value" className="transfer-form-label">
          value: R$
          <input
            type="number"
            name="value"
            id="value"
            className='transfer-input'
            onChange={handleAmountChange}
          />
        </label>
        <button
          type="button"
          onClick={handleSubmit}
          className='transfer-button'
        >
          Transfer
        </button>
      </form>
      <p>{message}</p>
    </div>
   );
}

export default TransferForm;