import React, { useState, useContext } from "react";
import AyrContext from "../context/AyrContext";
import { AyrContextInterface } from "../interfaces/UserInterface";
import { transferTranslation } from "../utils/transferTranslation";
import Axios from "axios";
import { useCookies } from "react-cookie";


function TransferForm() {
  const { language, url } = useContext(AyrContext) as AyrContextInterface;
  const [amount, setAmount] = useState(null as null | number);
  const [receiver, setReceiver] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("" as string | null);
  const [completed, setCompleted] = useState('');
  const [cookies] = useCookies(["token"]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await Axios.put(`${url}/transaction/transfer`, {
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
      setError(error.response.data.error)
      setLoading(false);
    }
  };

  return (
    <form className="grid place-items-center content-center  bg-white">
      {loading && <p>Loading...</p>}
      <div className="mt-4 grid place-items-center content-center">
        <label className="justify-self-start">
          { transferTranslation[language].amount }: 
        </label>
        <input
          type="number"
          className="border rounded-xl h-12 py-5 px-4 caret-dark-purple"
          onChange={(event) => setAmount(Number(event.target.value))}
        />        
      </div>
      <div className="mt-4 grid place-items-center content-center">
        <label className="justify-self-start">
          { transferTranslation[language].to }: 
        </label>
        <input
          type="text"
          value={receiver}
          className="border rounded-xl h-12 py-5 px-4 caret-dark-purple"
          onChange={(event) => setReceiver(event.target.value)}
        />
      </div>
      <button 
        type="button"
        onClick={handleSubmit}
        className="border w-56 mt-12 rounded-full py-5 bg-dark-purple border-light-purple text-white font-medium text-center hover:bg-white hover:text-dark-purple"
      >{ transferTranslation[language].submit }</button>
      { completed && <p className="text-green-800 mt-5">{ transferTranslation[language].completed }</p> }
      { error && <p className="text-red mt-5">{ error }</p> }
    </form>
  );
}

export default TransferForm;