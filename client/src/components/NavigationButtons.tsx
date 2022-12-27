import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AyrContext from "../context/AyrContext";
import { navigationTranslation } from "../utils/navigationTranslation";
import { AyrContextInterface } from "../interfaces/UserInterface";
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
    <div className="flex flex-col">
      <Link to="/home">{navigationTranslation[language].home}</Link>
      <Link to="/transfer">{navigationTranslation[language].transfer}</Link>
      <Link to="/history">{navigationTranslation[language].history}</Link>
      <button 
        onClick={logout}
      >{navigationTranslation[language].logout}</button>
    </div>
  );
}

export default NavigationButtons;