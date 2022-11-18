import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NgContext from "../context/NgContext";
import Axios from "axios";
import StartButtonsContainer from "../components/StartButtonsContainer";
import '../styles/Start.css';

function Start() {
  const { setUser, setAccount } = useContext(NgContext);
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = document.cookie.split('=')[1];
    const body = {
      accessToken: cookie
    };
    const getUserName = async () => {
      const { data } = await Axios.post('http://127.0.0.1:5000/user/autologin', body, { withCredentials: true });
      if (data) {
        setUser(data.hasUser);
        setAccount(data.account);
        navigate('/home');
      }
    };
    if (cookie) {
      getUserName();
    }
  }, []);

  return ( 
    <div className="buttons-container">
      <StartButtonsContainer />
    </div>
   );
}

export default Start;