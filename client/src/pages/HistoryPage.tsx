import React, { useEffect } from 'react';
import AyrContext from '../context/AyrContext';
import NavigationButtons from '../components/NavigationButtons';
import HistoryTableContainer from '../components/HistoryTableContainer';
import { AyrContextInterface } from '../interfaces/UserInterface';
import { useContext } from 'react';
import { useCookies } from 'react-cookie';
import Axios from 'axios';

function HistoryPage() {
  const { url, setHistory } = useContext(AyrContext) as AyrContextInterface;
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await Axios.get(`http://${url}/transaction/history`, {
          headers: {
            Authorization: cookies.token,
          },
        });
        console.log(response.data);
        setHistory(response.data);
      } catch (error: any) {
        console.log(error);
      }
    };
    getHistory();
  }, []);

  return (
    <div>
      <NavigationButtons />
      <h1>History</h1>
      <HistoryTableContainer />
    </div>
  );
}

export default HistoryPage;