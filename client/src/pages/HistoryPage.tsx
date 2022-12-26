import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AyrContext from '../context/AyrContext';
import NavigationButtons from '../components/NavigationButtons';
import HistoryTableContainer from '../components/HistoryTableContainer';
import HistoryTableFilter from '../components/HistoryTableFilter';
import { AyrContextInterface } from '../interfaces/UserInterface';
import { useContext } from 'react';
import { useCookies } from 'react-cookie';
import Axios from 'axios';

function HistoryPage() {
  const navigate = useNavigate();
  const { url, setHistory } = useContext(AyrContext) as AyrContextInterface;
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if (!cookies.token) {
      navigate('/');
    } else {
      const getHistory = async () => {
        try {
          const response = await Axios.get(`${url}/transaction/history`, {
            headers: {
              Authorization: cookies.token,
            },
          });
          setHistory(response.data);
        } catch (error: any) {
          console.log(error);
        }
      };
      getHistory();
    }
  }, []);

  return (
    <div>
      <NavigationButtons />
      <HistoryTableFilter />
      <h1>History</h1>
      <HistoryTableContainer />
    </div>
  );
}

export default HistoryPage;