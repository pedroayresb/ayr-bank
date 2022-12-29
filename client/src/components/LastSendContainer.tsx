import React, { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import AyrContext from '../context/AyrContext';
import { AyrContextInterface } from '../interfaces/UserInterface';
import HistoryInterface from '../interfaces/HistoryInterface';
import Axios from 'axios';
import LetterIcon from './LetterIcon';
import { transferTranslation } from '../utils/transferTranslation';
import toDate from '../utils/dateManipulation';

function LastSendContainer() {
  const { url, language } = useContext(AyrContext) as AyrContextInterface;
  const [lastSend, setLastSend] = useState({} as HistoryInterface);
  const [hasSender, setHasSender] = useState(false);
  const [cookies] = useCookies(['token']);


  useEffect(() => {
    const getLastReceive = async () => {
      try {
        const response = await Axios.get(`${url}/transaction/lastSend`, {
          headers: {
            Authorization: cookies.token,
          },
        });
        setLastSend(response.data);
        setHasSender(true);
      } catch (error: any) {
        console.log(error);
      }
    };
    getLastReceive();
  }, []);

  if (!hasSender) return <p>{ transferTranslation[language].noSent }</p>;

  return (
      <div className="flex flex-row items-center">
        <LetterIcon letter={ lastSend?.receiver.charAt(0) } />
        <div className="flex flex-col ml-2">
          <p className="font-bold">{ lastSend?.receiver }</p>
          <p>{ transferTranslation[language].amount }: $ { lastSend?.value.toFixed(2) }</p>
          <p>{ transferTranslation[language].date }: { toDate(lastSend?.createdAt) }</p>
        </div>
      </div>
  );
}

export default LastSendContainer;