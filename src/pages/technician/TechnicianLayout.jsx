import React from "react";
import TechnicianNavbar from "../pageNavbars/TechnicianNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardFooter from "../pagefooter/DashboardFooter";
import useLayoutSessionValidation from "../../hooks/useLayoutSessionValidation";

function TechnicianLayout() {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } =
    useLayoutSessionValidation("technician");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useLayoutSessionValidation hook
  }

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <TechnicianNavbar fixed="top" />
      <div style={{ flex: "1 0 auto", marginTop: 80 }}>
        <Outlet />
      </div>
      <DashboardFooter />
    </div>
  );
}

export default TechnicianLayout;
