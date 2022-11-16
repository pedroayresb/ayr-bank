import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function LoginForm(props) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [isUserValid, setIsUserValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userRegex = /^.{3,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const userTest = userRegex.test(user);
    const passwordTest = passwordRegex.test(password);
    setIsUserValid(userTest);
    setIsPasswordValid(passwordTest);
  }, [user, password]);

  useEffect(() => {
    if (isUserValid && isPasswordValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isUserValid, isPasswordValid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      user_name: user,
      password: password
    };
    const { data } = await Axios.post('http://127.0.0.1:5000/user/login', body); 
    console.log(data);
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
          onChange={ ({ target }) => setUser(target.value) }
        />
        <input
          className="login-form-input"
          type="password"
          placeholder="Password"
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button 
          className="login-form-button"
          onClick={handleSubmit}
        >
          Login
        </button>
        <button
          className="login-form-button"
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default LoginForm;