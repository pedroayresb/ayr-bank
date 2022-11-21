import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { NgContext } from '../context/NgContext';
import Footer from '../components/Footer';
import HeaderButtons from '../components/HeaderButtons';
import AccountButtonsContainer from '../components/AccountButtonsContainer';
import AccountBalance from '../components/AccountBalance';
import HideBalanceButton from '../components/HideBalanceButton';
import Axios from 'axios';
import '../styles/Home.css';

interface body {
  accessToken: string;
}

function Home() {
  const { setUser, setAccount } = React.useContext(NgContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    const cookie: string = localStorage.getItem('accessToken')!;
    console.log(cookie);
    const body: body = {
      accessToken: cookie
    };
    const getUserName = async () => {
      const { data }: any = await Axios.post('http://localhost:5000/user/autologin', body, { withCredentials: true })
        .catch((err) => {
          console.log(err);
        });
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