import React from "react";
import RegisterForm from "../components/RegisterForm";
import logoBackgroundless from '../icons/logo-no-background.png';
import GoBackButton from "../components/GoBackButton";

function RegisterPage() {
  return (
    <div className="grid h-screen place-items-center content-center bg-dark-purple">
      <div className="grid place-items-center content-center border border-gray-light rounded-xl bg-white p-10">
        <div className="mb-10 w-34">
          <img src={ logoBackgroundless } alt="logo" className="w-24" />
        </div> 
        <GoBackButton />
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;