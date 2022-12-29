import React from "react";
import { Link } from "react-router-dom";
import AyrContext from "../context/AyrContext";
import { homepageTranslation } from "../utils/homepageTranslation";
import { AyrContextInterface } from "../interfaces/UserInterface";

function RegisterButton() {
  const { language } = React.useContext(AyrContext) as AyrContextInterface;

  return (
    <div className="p-20">
      <Link to="/register" className="border w-32 rounded-full px-20 py-5 bg-white border-light-purple text-dark-purple font-medium hover:bg-dark-purple hover:text-white" >{homepageTranslation[language].register}</Link>
    </div>
  );
}

export default RegisterButton;