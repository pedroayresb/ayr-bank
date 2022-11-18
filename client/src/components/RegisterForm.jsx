import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NgContext from '../context/NgContext';
import Axios from 'axios';
import '../styles/LoginForm.css';

function LoginForm(props) {
  const { setUser, setAccount } = useContext(NgContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
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
      className="login-form-container"
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
        <div className="register-form-checked-container">
          <input
            className="login-form-input"
            type="checkbox"
            onChange={ ({ target }) => setChecked(target.checked) }
          />
          <label
            className="register-form-checked-label"
          >
            Do you agre with the Terms and Conditions?
          </label>
        </div>
        <button 
          className="login-form-button"
          disabled={ !checked }
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