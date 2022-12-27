import React, { useEffect } from "react";
import NavigationButtons from "../components/NavigationButtons";
import TransferForm from "../components/TransferForm";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function TransferPage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (!cookies.token) {
      navigate("/");
    }
  }, []);
  
  return (
    <div className="flex flex-row w-screen">
      <NavigationButtons />
      <div id="page-wrap" className="grid h-screen place-items-center content-center bg-light-purple grow">
        <div className="grid ml-20 place-items-center content-center border border-gray-light rounded-xl bg-white">
          <TransferForm />
        </div>
      </div>
    </div>
  );
}

export default TransferPage;