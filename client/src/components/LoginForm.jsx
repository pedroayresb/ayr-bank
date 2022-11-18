import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NgContext from '../context/NgContext';
import Axios from 'axios';

function LoginForm(props) {
  const { setUser, setAccount, setJwt } = useContext(NgContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isUserValid, setIsUserValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userRegex = /^.{3,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const userTest = userRegex.test(username);
    const passwordTest = passwordRegex.test(password);
    setIsUserValid(userTest);
    setIsPasswordValid(passwordTest);
  }, [username, password]);

  useEffect(() => {
    if (isUserValid && isPasswordValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isUserValid, isPasswordValid]);

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
      className="login-form"
    >
      <form
        className="login-form"
      >
        <input
          className="login-form-input"
          type="text"
          placeholder="Username"
          onChange={ ({ target }) => setUsername(target.value) }
        />
        <input
          className="login-form-input"
          type="password"
          placeholder="Password"
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button 
          className="login-form-button"
          // disabled={ disabled }
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
      </form>
      {isClicked && <p>{message}</p>}
    </div>
  );
}

export default LoginForm;