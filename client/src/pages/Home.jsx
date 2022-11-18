import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NgContext from '../context/NgContext';
import Footer from '../components/Footer';
import HeaderButtons from '../components/HeaderButtons';
import AccountButtonsContainer from '../components/AccountButtonsContainer';
import AccountBalance from '../components/AccountBalance';
import HideBalanceButton from '../components/HideBalanceButton';
import Axios from 'axios';
import '../styles/Home.css';

function Home() {
  const { setUser, setAccount } = useContext(NgContext);
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = document.cookie.split('=')[1];
    console.log(cookie);
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
    <div className="page">
      <HeaderButtons />
      <HideBalanceButton />
      <AccountButtonsContainer />
      <div
        className="account-action-container"
      >
        <AccountBalance />
      </div>
      <Footer />
    </div>
   );
}

export default Home;