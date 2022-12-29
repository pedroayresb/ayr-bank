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
import logoBackgroundless from '../icons/logo-no-background.png';

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
    <div className='flex flex-col h-screen'>
      <NavigationButtons />
      <div id="page-wrap" className="grid h-screen place-items-center content-center bg-offwhite grow">
        <div className="grid place-items-center content-center border border-gray-light rounded-xl bg-white p-20">
          <div className="mb-10 w-34">
              <img src={ logoBackgroundless } alt="logo" className="w-24" />
          </div> 
          <HistoryTableFilter />
          <HistoryTableContainer />
        </div>
      </div> 
    </div>
  );
}

export default HistoryPage;