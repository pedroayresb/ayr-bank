import React from "react";
import { Link } from "react-router-dom";
import AyrContext from "../context/AyrContext";
import { homepageTranslation } from "../utils/homepageTranslation";
import { AyrContextInterface } from "../interfaces/UserInterface";

function LoginButton() {
  const { language } = React.useContext(AyrContext) as AyrContextInterface;

  return (
    <>
      <Link to="/login">{homepageTranslation[language].login}</Link>
    </>
  );
}

export default LoginButton;