import React from "react";
import TechnicianNavbar from "../../components/TechnicianNavbar";
import TechnicianDashboard from "./Dashboard";

function TechnicianMain() {
  return (
    <>
      <TechnicianNavbar />
      <div style={{ padding: 0 }}>
        <TechnicianDashboard />
      </div>
    </>
  );
}
export default TechnicianMain; 