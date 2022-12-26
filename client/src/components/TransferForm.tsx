import React, { useState, useContext } from "react";
import AyrContext from "../context/AyrContext";
import { AyrContextInterface } from "../interfaces/UserInterface";
import { transferTranslation } from "../utils/transferTranslation";
import Axios from "axios";
import { useCookies } from "react-cookie";

function TransferForm() {
  const { language, url } = useContext(AyrContext) as AyrContextInterface;
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState('');
  const [cookies] = useCookies(["token"]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await Axios.put(`http://${url}/transaction/transfer`, {
        amount,
        to: receiver,
      }, {
        headers: {
          Authorization: cookies.token,
        },
      });
      setCompleted(transferTranslation[language].completed);
      setLoading(false);
    } catch (error: any) {
      setCompleted(error);
      setLoading(false);
    }
  };

  return (
    <form>
      {loading && <p>Loading...</p>}
      <label>
        { transferTranslation[language].amount }
        <input
          type="number"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
      </label>
      <label>
        { transferTranslation[language].to }
        <input
          type="text"
          value={receiver}
          onChange={(event) => setReceiver(event.target.value)}
        />
      </label>
      <button 
        type="button"
        onClick={handleSubmit}
      >{ transferTranslation[language].submit }</button>
      { completed && <p>{ transferTranslation[language].completed }</p> }
    </form>
  );
}

export default TransferForm;