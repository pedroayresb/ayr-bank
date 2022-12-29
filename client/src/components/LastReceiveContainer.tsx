import React, { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import AyrContext from '../context/AyrContext';
import { AyrContextInterface } from '../interfaces/UserInterface';
import HistoryInterface from '../interfaces/HistoryInterface';
import Axios from 'axios';
import toDate from '../utils/dateManipulation';
import LetterIcon from './LetterIcon';
import { transferTranslation } from '../utils/transferTranslation';

function LastReceiveContainer() {
  const { url, language } = useContext(AyrContext) as AyrContextInterface;
  const [lastReceive, setLastReceive] = useState({} as HistoryInterface);
  const [hasSender, setHasSender] = useState(false);
  const [cookies] = useCookies(['token']);


  useEffect(() => {
    const getLastReceive = async () => {
      try {
        const response = await Axios.get(`${url}/transaction/lastReceive`, {
          headers: {
            Authorization: cookies.token,
          },
        });
        setLastReceive(response.data);
        setHasSender(true);
      } catch (error: any) {
        console.log(error);
      }
    };
    getLastReceive();
  }, []);

  if (!hasSender) return <p>{ transferTranslation[language].noReceived }</p>;

  return (
    <div className="flex flex-row items-center">
      <LetterIcon letter={ lastReceive?.sender.charAt(0) } />
      <div className="flex flex-col ml-2">
        <p className="font-bold">{ lastReceive?.sender }</p>
        <p>{ transferTranslation[language].amount }: $ { lastReceive?.value.toFixed(2) }</p>
        <p>{ transferTranslation[language].date }: { toDate(lastReceive?.createdAt) }</p>
      </div>
    </div>
  );
}

export default LastReceiveContainer;
