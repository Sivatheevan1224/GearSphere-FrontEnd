import React, { useEffect } from "react";
import SellerNavbar from "../../components/SellerNavbar";
import { Outlet, useNavigate } from "react-router-dom";

function SellerLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const userType = sessionStorage.getItem("user_type");
    if (userType?.toLowerCase() !== "seller") {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  return (
    <>
      <SellerNavbar fixed="top" />
      <div style={{ marginTop: 80 }}><Outlet /></div>
    </>
  );
}

export default SellerLayout; 
