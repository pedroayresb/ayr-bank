import React from "react";
import { Link } from "react-router-dom";
import AyrContext from "../context/AyrContext";
import { homepageTranslation } from "../utils/homepageTranslation";
import { AyrContextInterface } from "../interfaces/UserInterface";
import '../App.css';

function LoginButton() {
  const { language } = React.useContext(AyrContext) as AyrContextInterface;

  return (
    <div className="p-20">
      <Link to="/login" className="border w-32 rounded-full px-20 py-5 bg-dark-purple border-light-purple text-white font-medium">{ homepageTranslation[language].login }</Link>
    </div>
  );
}

export default LoginButton;