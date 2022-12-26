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
    <div>
      <NavigationButtons />
      <h1>Transfer Page</h1>
      <TransferForm />
    </div>
  );
}

export default TransferPage;