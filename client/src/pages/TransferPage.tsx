import React, { useEffect } from "react";
import NavigationButtons from "../components/NavigationButtons";
import TransferForm from "../components/TransferForm";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import logoBackgroundless from "../icons/logo-no-background.png";

function TransferPage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (!cookies.token) {
      navigate("/");
    }
  }, []);
  
  return (
    <div className='flex flex-col h-screen'>
      <NavigationButtons />
      <div id="page-wrap" className="grid h-screen place-items-center content-center bg-offwhite grow">
        <div className="grid place-items-center content-center border border-gray-light rounded-xl bg-white p-10">
          <div className="mb-10 w-34">
            <img src={ logoBackgroundless } alt="logo" className="w-24" />
          </div> 
          <TransferForm />
        </div>
      </div>
    </div>
  );
}

export default TransferPage;