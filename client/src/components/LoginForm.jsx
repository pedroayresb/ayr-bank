import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NgContext from '../context/NgContext';
import Axios from 'axios';
import Input from '@mui/material/Input';
import '../styles/LoginForm.css';

function LoginForm(props) {
  const { setUser, setAccount } = useContext(NgContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsClicked(true);
    e.preventDefault();
    const body = {
      user_name: username,
      password: password
    };
    const { data } = await Axios.post('http://127.0.0.1:5000/user/login', body, { withCredentials: true })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
    if (data) {
      setUser(data.hasUser);
      setAccount(data.account);
      document.cookie = `accessToken=${data.accessToken}`;
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