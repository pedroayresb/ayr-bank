import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AyrContext from "../context/AyrContext";
import { AyrContextInterface } from "../interfaces/UserInterface";
import { registerFormTranslation } from "../utils/registerFormTranslation";
import Axios from "axios";
import { useCookies } from "react-cookie";

function LoginForm() {
  const navigate = useNavigate();
  const { language, url } = useContext(AyrContext) as AyrContextInterface;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data: { token } } = await Axios.post(`${url}/user/login`, {
        name,
        password,
      });
      setCookie("token", token);
      navigate("/home")
    } catch (error: any) {
      setError(error.response.data.error);
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">{ registerFormTranslation[language].username }</label>
      <input
        type="text"
        name="name"
        value={ name }
        onChange={ handleNameChange }
      />
      <label htmlFor="password">{ registerFormTranslation[language].password }</label>
      <input
        type="password"
        name="password"
        value={ password }
        onChange={ handlePasswordChange }
      />
      <button 
        type="submit">{ registerFormTranslation[language].login }
      </button>
      { error && <p>{ error }</p> }
    </form>
  );
}

export default LoginForm;