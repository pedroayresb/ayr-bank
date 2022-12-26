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
    <div>
      <button onClick={getHistory}>{ historyTranslation[language].All }</button>
      <button onClick={getSentHistory}>{ historyTranslation[language].sendHistory }</button>
      <button onClick={getReceivedHistory}>{ historyTranslation[language].receiveHistory }</button>
      <FilterByDate />
    </div>
  );

}

export default HistoryTableFilter;