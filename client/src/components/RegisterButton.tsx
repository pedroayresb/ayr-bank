import React from "react";
import { Link } from "react-router-dom";
import AyrContext from "../context/AyrContext";
import { homepageTranslation } from "../utils/homepageTranslation";
import { AyrContextInterface } from "../interfaces/UserInterface";

function RegisterButton() {
  const { language } = React.useContext(AyrContext) as AyrContextInterface;

  return (
    <>
      <Link to="/register">{homepageTranslation[language].register}</Link>
    </>
  );
}

export default RegisterButton;