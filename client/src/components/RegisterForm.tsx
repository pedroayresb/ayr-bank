import * as React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NgContext } from '../context/NgContext';
import taskApi from '../utils/fetch';
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
  const [checked, setChecked] = React.useState<isClicked>(false);
  const [message, setMessage] = React.useState<input>('');
  const [isClicked, setIsClicked] = React.useState<isClicked>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('ta aqui 1');
    setIsClicked(true);
    event.preventDefault();
    const body: body = {
      user_name: username,
      password: password
    };
    await Axios.post('http://localhost:5000/user/register', body, { withCredentials: true })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
    console.log('ta aqui 2');
    const { data }: any = await Axios.post('http://localhost:5000/user/login', body, { withCredentials: true })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
    console.log('ta aqui', data);
    if (data) {
      setUser(data.hasUser);
      setAccount(data.account);
      localStorage.setItem('accessToken', data.accessToken);
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
          type="button"
          className="login-form-button"
          disabled={ !checked }
          onClick={ (event) => handleSubmit(event)}
        >
          Sign Up
        </button>
      </form>
      { isClicked && <p>{message}</p> }
    </div>
  );
}

export default LoginForm;