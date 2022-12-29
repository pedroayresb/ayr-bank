import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AyrContext from "../context/AyrContext";
import { navigationTranslation } from "../utils/navigationTranslation";
import { AyrContextInterface } from "../interfaces/UserInterface";
import logoBackgroundless from '../icons/logo-white.png';
import NavigationButtonsConfigs from "./NavigationButtonsConfigs";
import { useCookies } from "react-cookie";

function NavigationButtons() {
  const { language } = React.useContext(AyrContext) as AyrContextInterface;
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("token");
    navigate("/");
  };
  

  return (
    <div className="flex justify-around p-5 items-center text-white bg-dark-purple">
      <div className="flex flex-row items-center gap-14">
        <img src={logoBackgroundless} alt="logo" className="w-16" />
        <NavigationButtonsConfigs to={'home'} language={ language } />
        <NavigationButtonsConfigs to={'transfer'} language={ language } />
        <NavigationButtonsConfigs to={'history'} language={ language } />
      </div>
      <button 
        onClick={logout}
        className="border border-dark-purple rounded-full bg-dark-purple p-2 hover:border-light-purple"
      >{navigationTranslation[language].logout}</button>
    </div>
  );
}

export default NavigationButtons;