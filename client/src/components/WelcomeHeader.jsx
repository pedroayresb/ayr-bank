import React, { useContext } from 'react';
import NgContext from '../context/NgContext';
import HeaderButtons from './HeaderButtons';
import { headerLanguage } from '../language/language';
import '../styles/WelcomeHeader.css';

function WelcomeHeader() {
  const { user, account, language } = useContext(NgContext);
  return ( 
    <header className="header">
      <div className="header-container">
        <div className="header-text-container">
          <h1>{ headerLanguage(language) }</h1>
          <h1>{ user.user_name }</h1>
        </div>
        <HeaderButtons />
      </div>
      <h2>Balance: ${ account.balance } </h2>
    </header>
   );
}

export default WelcomeHeader;