import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import AyrContext from '../context/AyrContext';
import NavigationButtons from '../components/NavigationButtons';
import LastReceiveContainer from '../components/LastReceiveContainer';
import LastSendContainer from '../components/LastSendContainer';
import { AyrContextInterface } from '../interfaces/UserInterface';
import { homepageTranslation } from '../utils/homepageTranslation';
import axios from 'axios';
import '../App.css';


function Homepage() {
  const { user, setUser, url, language } = useContext(AyrContext) as AyrContextInterface;
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${url}/user/profile`, {
          headers: {
            Authorization: cookies.token,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        navigate('/');
      }
    };
    getUser();
  }, []);

  return (
    loading ? <h1>Loading...</h1> :
    <div className='flex flex-col h-screen'>
      <NavigationButtons />
      <div id="page-wrap" className="flex flex-row space-evenly bg-offwhite grow">
        <div className="grid place-content-center basis-1/2">
          <div className="p-20 border border-gray-light rounded-xl bg-white al h-min hover:drop-shadow-lg">
            <p className="text-5xl text-dark-purple bg-white p-4">{user?.name}</p>
            <p className='text-3xl p-4'>$ {user?.Account.balance.toFixed(2)}</p>
          </div>
        </div>
        <div className="grid justify-start items-center bg-white basis-1/2">
          <div className="grid p-10 h-fit place-items-center content-center place-content-around m-4 ml-24">
            <h1 className="font-bold justify-self-start text-xl mb-3">{ homepageTranslation[language].lastReceived }: </h1>
            <LastReceiveContainer />
          </div>
          <div className="grid p-10 h-fit place-items-center content-center place-content-around m-4 ml-24">
            <h1 className="font-bold justify-self-start text-xl mb-3">{ homepageTranslation[language].lastSent }: </h1>
            <LastSendContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
