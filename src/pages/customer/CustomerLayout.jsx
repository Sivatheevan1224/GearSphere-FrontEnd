import React, { useEffect } from "react";
import CustomerNavbar from "../../components/CustomerNavbar";
import { Outlet, useNavigate } from "react-router-dom";

function CustomerLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const userType = sessionStorage.getItem("user_type");
    if (userType?.toLowerCase() !== "customer") {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  return (
    <>
      <CustomerNavbar fixed="top" />
      <div style={{ marginTop: 80 }}><Outlet /></div>
    </>
  );
}

export default CustomerLayout; 
