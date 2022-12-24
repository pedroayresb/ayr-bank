import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import AyrContext from '../context/AyrContext';
import { AyrContextInterface } from '../interfaces/UserInterface';
import axios from 'axios';

function Homepage() {
  const { user, setUser, url } = useContext(AyrContext) as AyrContextInterface;
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate('/');
    }
    const getUser = async () => {
      try {
        const response = await axios.get(`http://${url}/user/profile`, {
          headers: {
            Authorization: cookies.token,
          },
        });
        setUser(response.data);
      } catch (error: any) {
        navigate('/');
      }
    };
  getUser();
  }, []);

  return (
    <div>
      <h1>Homepage</h1>
      <p>{user?.name}</p>
      <p>{user?.Account.balance}</p>
    </div>
  );
};

export default Homepage;
