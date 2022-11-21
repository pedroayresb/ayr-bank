import * as React from 'react';
import { NgContext } from '../context/NgContext';
import Axios from 'axios';
import '../styles/TransferForm.css';

interface body {
  user_name: string;
  reciever_name: string;
  amount: string;
  accessToken: string;
}

function TransferForm() {
  const { user, setAccount } = React.useContext(NgContext);
  const [recipient, setRecipient] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [message, setMessage] = React.useState('');


  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const cookie: string = document.cookie.split('=')[1];
    const body: body = {
      user_name: user.user_name,
      reciever_name: recipient,
      amount: amount,
      accessToken: cookie
    };
    const { data }: any = await Axios.put('/api/transaction/transfer', body, { withCredentials: true })
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
          onClick={ (event: React.MouseEvent<HTMLButtonElement>) => handleSubmit(event) }
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