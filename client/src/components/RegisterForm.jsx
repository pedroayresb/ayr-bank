import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NgContext from '../context/NgContext';
import Axios from 'axios';

function LoginForm(props) {
  const { setUser, setAccount } = useContext(NgContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isUserValid, setIsUserValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [message, setMessage] = useState('');
  const [isClicked, setIsClicked] = useState(false);
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
    if (isUserValid && isPasswordValid && checked) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isUserValid, isPasswordValid, checked]);

  const handleSubmit = async (e) => {
    setIsClicked(true);
    e.preventDefault();
    const body = {
      user_name: username,
      password: password
    };
    await Axios.post('http://127.0.0.1:5000/user/register', body, { withCredentials: true })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
    const { data } = await Axios.post('http://127.0.0.1:5000/user/login', body, { withCredentials: true });
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
        <input
          className="login-form-input"
          type="checkbox"
          onChange={ ({ target }) => setChecked(target.checked) }
        />
        <label
          className="login-form-input"
        >
          Do you agre with the Terms and Conditions?
        </label>
        <button 
          className="login-form-button"
          // disabled={ disabled }
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </form>
      { isClicked && <p>{message}</p> }
    </div>
  );
}

export default LoginForm;