import React from 'react';
import WelcomeHeader from '../components/WelcomeHeader';
import AccountButtonsContainer from '../components/AccountButtonsContainer';
import AccountActionContainer from '../components/AccountActionContainer';

function Home() {
  return ( 
    <div>
      <WelcomeHeader />
      <AccountButtonsContainer />
      <AccountActionContainer />
    </div>
   );
}

export default Home;