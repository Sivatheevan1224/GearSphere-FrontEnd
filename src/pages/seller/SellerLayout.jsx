import React, { useEffect } from "react";
import SellerNavbar from "../pageNavbars/SellerNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardFooter from '../pagefooter/DashboardFooter';

function SellerLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const userType = sessionStorage.getItem("user_type")?.toLowerCase();
    const userId = sessionStorage.getItem("user_id");
    if (!userType || !userId || userType !== "seller") {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  return (
    <>
      <SellerNavbar fixed="top" />
      <div style={{ marginTop: 80 }}><Outlet /></div>
      <DashboardFooter />
    </>
  );
}

export default SellerLayout; 
