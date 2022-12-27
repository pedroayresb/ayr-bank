import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import AyrContext from '../context/AyrContext';
import NavigationButtons from '../components/NavigationButtons';
import { AyrContextInterface } from '../interfaces/UserInterface';
import axios from 'axios';
import '../App.css';


function Homepage() {
  const { user, setUser, url } = useContext(AyrContext) as AyrContextInterface;
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
    <div>
      <h1>Homepage</h1>
      <NavigationButtons />
      <p>{user?.name}</p>
      <p>{user?.Account.balance}</p>
    </div>
  );
};

export default Homepage;