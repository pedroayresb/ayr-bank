import React from 'react';
import LoginButton from '../components/LoginButton';
import RegisterButton from '../components/RegisterButton';
import FlagContainer from '../components/FlagContainer';

function Homepage() {
  return (
    <div>
      <LoginButton />
      <RegisterButton />
      <FlagContainer />
    </div>
  );
}

export default Homepage;