import React from 'react';
import GoBackButton from '../components/GoBackButton';
import LoginForm from '../components/LoginForm';
import logoBackgroundless from '../icons/logo-no-background.png';
import RegisterButton from '../components/RegisterButton';
import '../App.css';

function LoginPage() {
  return (
    <div className="grid h-screen place-items-center content-center bg-offwhite">
      <div className="grid place-items-center content-center border border-gray-light rounded-xl bg-white">
        <div className="m-10 w-34">
          <img src={ logoBackgroundless } alt="logo" className="w-24" />
        </div> 
        <GoBackButton />
        <LoginForm />
        <RegisterButton />
      </div>
    </div>
  );
}

export default LoginPage;