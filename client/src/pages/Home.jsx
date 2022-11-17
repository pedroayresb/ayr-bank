import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NgContext from '../context/NgContext';
import WelcomeHeader from '../components/WelcomeHeader';
import AccountButtonsContainer from '../components/AccountButtonsContainer';
import AccountActionContainer from '../components/AccountActionContainer';
import Axios from 'axios';

function Home() {
  const { setUser, setAccount } = useContext(NgContext);
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = document.cookie;
    const body = {
      accessToken: cookie
    };
    const getUserName = async () => {
      const { data } = await Axios.post('http://127.0.0.1:5000/user/autologin', body, { withCredentials: true });
      if (data) {
        setUser(data.hasUser);
        setAccount(data.account);
      } else {
        navigate('/login');
      }
    };
    if (!cookie) {
      navigate('/login');
    } else {
      getUserName();
    }
  }, []);

  return ( 
    <div>
      <WelcomeHeader />
      <AccountButtonsContainer />
      <AccountActionContainer />
    </div>
   );
}

export default Home;