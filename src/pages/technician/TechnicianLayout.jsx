import React from "react";
import TechnicianNavbar from "../../components/TechnicianNavbar";
import { Outlet } from "react-router-dom";

function TechnicianLayout() {
  return (
    <>
      <TechnicianNavbar fixed="top" />
      <div style={{ marginTop: 80 }}><Outlet /></div>
    </>
  );
}

export default TechnicianLayout; 