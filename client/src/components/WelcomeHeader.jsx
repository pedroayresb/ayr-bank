import React, { useContext } from 'react';
import NgContext from '../context/NgContext';
import { headerLanguage } from '../language/language';

function WelcomeHeader() {
  const { user, account, language } = useContext(NgContext);
  return ( 
    <header>
      <h1>{ headerLanguage(language) }</h1>
      <h1>{ user.user_name }</h1>
      <h2>Balance: ${ account.balance } </h2>
    </header>
   );
}

export default WelcomeHeader;