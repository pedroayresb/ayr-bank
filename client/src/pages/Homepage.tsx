import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import AyrContext from '../context/AyrContext';
import NavigationButtons from '../components/NavigationButtons';
import { AyrContextInterface } from '../interfaces/UserInterface';
import axios from 'axios';
import { homepageTranslation } from '../utils/homepageTranslation';
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
    <div className="flex flex-row w-screen">
      <NavigationButtons />
      <div id="page-wrap" className="grid h-screen place-items-center content-center bg-light-purple grow">
        <div className="grid p-40 place-items-center content-center border place-content-around border-gray-light rounded-xl bg-white">
          <p className="text-7xl">{homepageTranslation[language].welcome}, {user?.name}</p>
          <p className='text-5xl'>{homepageTranslation[language].balance}: $ {user?.Account.balance.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
