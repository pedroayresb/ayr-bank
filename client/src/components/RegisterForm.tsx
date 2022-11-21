import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { NgContext } from '../context/NgContext';
import Axios from 'axios';
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

  const handleSubmit = async () => {
    setIsClicked(true);
    const body: body = {
      user_name: username,
      password: password
    };
    await Axios.post('/api/user/register', body, { withCredentials: true })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
    const { data }: any = await Axios.post('/api:5000/user/login', body, { withCredentials: true })
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