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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SellerNavbar fixed="top" />
      <div style={{ flex: '1 0 auto', marginTop: 80 }}>
        <Outlet />
      </div>
      <DashboardFooter />
    </div>
  );
}

export default SellerLayout; 
