import React, { useEffect } from "react";
import TechnicianNavbar from "../../components/TechnicianNavbar";
import { Outlet, useNavigate } from "react-router-dom";

function TechnicianLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const userType = sessionStorage.getItem("user_type");
    if (userType?.toLowerCase() !== "technician") {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  return (
    <>
      <TechnicianNavbar fixed="top" />
      <div style={{ marginTop: 80 }}><Outlet /></div>
    </>
  );
}

export default TechnicianLayout; 
