import React, { useEffect } from "react";
import CustomerNavbar from "../pageNavbars/CustomerNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardFooter from '../pagefooter/DashboardFooter';

function CustomerLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const userType = sessionStorage.getItem("user_type")?.toLowerCase();
    const userId = sessionStorage.getItem("user_id");
    if (!userType || !userId || userType !== "customer") {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CustomerNavbar fixed="top" />
      <div style={{ flex: '1 0 auto' }}>
        <Outlet />
      </div>
      <DashboardFooter />
    </div>
  );
}

export default CustomerLayout; 
