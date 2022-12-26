import React, { useContext, useEffect } from 'react';
import AyrContext from '../context/AyrContext';
import { AyrContextInterface } from '../interfaces/UserInterface';
import axios from 'axios';
import LoginButton from '../components/LoginButton';
import RegisterButton from '../components/RegisterButton';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

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
    <div>
      <LoginButton />
      <RegisterButton />
    </div>
  );
}

export default StartPage;