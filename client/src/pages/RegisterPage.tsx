import React from "react";
import RegisterForm from "../components/RegisterForm";
import GoBackButton from "../components/GoBackButton";

function RegisterPage() {
  return (
    <div>
      <GoBackButton />
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;