import * as React from 'react';
import { NgContext } from '../context/NgContext';
import '../styles/Footer.css';

function WelcomeHeader() {
  const { user } = React.useContext(NgContext);
  return ( 
    <footer className="footer">
      <h1 id="footer-name">@{ user.user_name }</h1>
    </footer>
   );
}

export default WelcomeHeader;