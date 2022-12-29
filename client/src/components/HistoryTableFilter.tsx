import React, { useContext } from 'react';
import AyrContext from '../context/AyrContext';
import { AyrContextInterface } from '../interfaces/UserInterface';
import FilterByDate from './FilterByDate';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { historyTranslation } from '../utils/historyTranslation';

function HistoryTableFilter() {
  const { url, setHistory, language } = useContext(AyrContext) as AyrContextInterface;
  const [cookies] = useCookies(['token']);

  const getHistory = async () => {
    try {
      const response = await axios.get(`${url}/transaction/history`, {
        headers: {
          Authorization: cookies.token,
        },
      });
      setHistory(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getSentHistory = async () => {
    try {
      const response = await axios.get(`${url}/transaction/sendhistory`, {
        headers: {
          Authorization: cookies.token,
        },
      });
      setHistory(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getReceivedHistory = async () => {
    try {
      const response = await axios.get(`${url}/transaction/receivehistory`, {
        headers: {
          Authorization: cookies.token,
        },
      });
      setHistory(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row justify-center">
        <button 
          onClick={getHistory}
          className="border rounded-full p-5 bg-dark-purple border-light-purple text-white font-medium text-center hover:bg-white hover:text-dark-purple"
        >{ historyTranslation[language].All }</button>
        <button 
          onClick={getSentHistory}
          className="border rounded-full p-5 bg-white border-light-purple text-dark-purple font-medium text-center hover:bg-dark-purple hover:text-white"
        >{ historyTranslation[language].sendHistory }</button>
        <button 
          onClick={getReceivedHistory}
          className="border rounded-full p-5 bg-white border-light-purple text-dark-purple font-medium text-center hover:bg-dark-purple hover:text-white"
        >{ historyTranslation[language].receiveHistory }</button>
      </div>
      <FilterByDate />
    </div>
  );

}

export default HistoryTableFilter;