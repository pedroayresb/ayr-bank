import * as React from "react";
import { useNavigate } from "react-router-dom";
import { NgContext } from "../context/NgContext";
import Axios from "axios";
import StartButtonsContainer from "../components/StartButtonsContainer";
import '../styles/Start.css';

interface body {
  accessToken: string;
}

function Start() {
  const { setUser, setAccount } = React.useContext(NgContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    const cookie: string = document.cookie.split('=')[1];
    const body: body = {
      accessToken: cookie
    };
    const getUserName = async () => {
      const { data }: any = await Axios.post('http://127.0.0.1:5000/user/autologin', body, { withCredentials: true });
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