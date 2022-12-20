import * as React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css';

type input = string;
type isClicked = boolean;

interface body {
  user_name: string;
  password: string;
}

function LoginForm() {
  const [username, setUsername] = React.useState<input>('');
  const [password, setPassword] = React.useState<input>('');
  const [checked, setChecked] = React.useState<isClicked>(false);
  const [message, setMessage] = React.useState<input>('');
  const [isClicked, setIsClicked] = React.useState<isClicked>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked(true);
    event.preventDefault();
    const body: body = {
      user_name: username,
      password: password
    };
    const { data }: any = await Axios.post('http://localhost:5000/user/register', body, { withCredentials: true })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
      console.log(data);
    if (data.user && data.account) {
      navigate('/login');
    }
  };

  return ( 
    <div
      className="login-form-container"
    >
      <button
        className="go-back-button"
        onClick={() => navigate('/')}
      >
        start
      </button>
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