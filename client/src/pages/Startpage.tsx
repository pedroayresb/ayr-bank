import React, { useContext, useEffect } from 'react';
import AyrContext from '../context/AyrContext';
import { AyrContextInterface } from '../interfaces/UserInterface';
import axios from 'axios';
import LoginButton from '../components/LoginButton';
import RegisterButton from '../components/RegisterButton';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import logoBackgroundless from '../icons/logo-no-background.png';
import '../App.css';


function StartPage() {
  const navigate = useNavigate();
  const { setUser, url } = useContext(AyrContext) as AyrContextInterface;
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if (cookies.token) {
      const getUser = async () => {
        try {
          const response = await axios.get(`${url}/user/profile`, {
            headers: {
              Authorization: cookies.token,
            },
          });
          setUser(response.data);
          navigate('/home');
        } catch (error: any) {
          console.log(error);
        }
      };
      getUser();
    }
  }, []);

  return (
    <div className="grid h-screen place-items-center content-center bg-light-purple">
      <div className="grid place-items-center content-center border border-gray-light rounded-xl bg-white">
        <div className="grid place-items-center content-center p-10 w-96">
          <img src={ logoBackgroundless } alt="logo" className="w-52 " />
        </div>        
        <LoginButton />
        <RegisterButton />
      </div>
    </div>
  );
}

export default StartPage;