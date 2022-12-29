import React from 'react';
import { Link } from "react-router-dom";
import { navigationTranslation } from "../utils/navigationTranslation";

interface NavigationButtonsConfigsProps {
  to: string;
  language: string;
}

function NavigationButtonsConfigs(props: NavigationButtonsConfigsProps) {
  const { to, language } = props;
  const isSelected = window.location.pathname === `/${to}`;
  if (isSelected) 
    return <Link to={ `/${to}` } className="border border-dark-purple rounded-full bg-light-purple p-2 font-bold">{navigationTranslation[language][to]}</Link>

  return (
    <Link to={ `/${to}` } className="border border-dark-purple rounded-full bg-dark-purple p-2 hover:border-light-purple">{navigationTranslation[language][to]}</Link>
  );
}

export default NavigationButtonsConfigs;