import React, { useContext } from "react";
import AyrContext from "../context/AyrContext";
import { flagTranslation } from "../utils/flagTranslation";
import { AyrContextInterface } from "../interfaces/UserInterface";
import "../App.css";

function LanguageButton() {
  const { language, setLanguage } = useContext(AyrContext) as AyrContextInterface;
  
  const changeLanguage = (language: string) => {
    switch (language) {
      case "en":
        setLanguage("pt");
        break;
      case "pt":
        setLanguage("en");
        break;
      default:
        setLanguage("en");
    }
  };

  return (
    <div className="absolute right-3 text-white">
      <button
        onClick={() => changeLanguage(language)}
      >{flagTranslation[language].flag}</button>
    </div>
  );
}

export default LanguageButton;