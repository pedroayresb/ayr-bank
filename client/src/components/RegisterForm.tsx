import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AyrContext from "../context/AyrContext";
import { AyrContextInterface } from "../interfaces/UserInterface";
import { registerFormTranslation } from "../utils/registerFormTranslation";
import Axios from "axios";
import { useCookies } from "react-cookie";

function RegisterForm() {
  const navigate = useNavigate();
  const { language, url } = useContext(AyrContext) as AyrContextInterface;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(password === confirmPassword)) {
      setError("Passwords do not match!");
    } else {
      try {
        console.log(url)
        const { data: { token } } = await Axios.post(`${url}/user/register`, {
          name,
          password,
        });
        setCookie("token", token);
        navigate("/home")
      } catch (error: any) {
        setError(error.response.data.error);
      }
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };


  return (
    <form onSubmit={ handleSubmit } className="grid place-items-center content-center  bg-white">
      <div className="mt-4 grid place-items-center content-center">
        <label htmlFor="name" className="justify-self-start">{ registerFormTranslation[language].username }: </label>
        <input
          type="text"
          name="name"
          value={ name }
          className="border rounded-xl h-12 py-5 px-4 caret-dark-purple"
          onChange={ handleNameChange }
        />
        </div>
      <div className="mt-4 grid place-items-center content-center">
        <label htmlFor="password" className="justify-self-start">{ registerFormTranslation[language].password }: </label>
        <input
          type="password"
          name="password"
          value={ password }
          className="border rounded-xl h-12 py-5 px-4 caret-dark-purple"
          onChange={ handlePasswordChange }
        />
        </div>
      <div className="mt-4 grid place-items-center content-center">
        <label htmlFor="confirmPassword" className="justify-self-start">{ registerFormTranslation[language].confirmPassword }: </label>
        <input
          type="password"
          name="confirmPassword"
          value={ confirmPassword }
          className="border rounded-xl h-12 py-5 px-4 caret-dark-purple"
          onChange={ handleConfirmPasswordChange }
        />
      </div>
      <button 
        type="submit"
        className="border w-56 mt-12 rounded-full py-5 bg-dark-purple border-light-purple text-white font-medium text-center"
        >{ registerFormTranslation[language].submit }        
      </button>
      { error && <p>{ error }</p> }
    </form>
  );
}

export default RegisterForm;