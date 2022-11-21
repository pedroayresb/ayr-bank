import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { NgContext } from '../context/NgContext';
import Axios from 'axios';
import Input from '@mui/material/Input';
import '../styles/LoginForm.css';

type input = string;
type isClicked = boolean;

interface body {
  user_name: string;
  password: string;
}

function LoginForm() {
  const { setUser, setAccount } = React.useContext(NgContext);
  const [username, setUsername] = React.useState<input>('');
  const [password, setPassword] = React.useState<input>('');
  const [message, setMessage] = React.useState<input>('');
  const [isClicked, setIsClicked] = React.useState<isClicked>(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsClicked(true);
    const body: body = {
      user_name: username,
      password: password
    };
    const { data }:any = await Axios.post('/api/user/login', body, { withCredentials: true })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
    if (data) {
      setUser(data.hasUser);
      setAccount(data.account);
      const date: Date = new Date();
      date.setDate(date.getDate() + 1)
      document.cookie = `accessToken=${data.accessToken}; expires=${date};`;
      navigate('/home');
    }
  };

  return ( 
    <div
      className="login-form-container"
    >
      <form
        className="login-form"
      >
        <Input
          className="login-form-input"
          type="text"
          placeholder="Username"
          name="Username"
          required={true}
          onChange={ ({ target }) => setUsername(target.value) }
        />
        <Input
          className="login-form-input"
          type="password"
          placeholder="Password"
          name="Username"
          required={true}
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <div className="login-form-button-container">
          <button 
            className="login-form-button"
            onClick={handleSubmit}
          >
            Login
          </button>
          <button
            className="login-form-button"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </form>
      {isClicked && <p>{message}</p>}
    </div>
  );
}

export default LoginForm;