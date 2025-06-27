import React from "react";
import CustomerNavbar from "../../components/CustomerNavbar";
import CustomerDashboard from "./CustomerDashboard";

function CustomerMain() {
  return (
    <>
      <CustomerNavbar />
      <div style={{ padding: 0 }}>
        <CustomerDashboard />
      </div>
    </>
  );
}
export default CustomerMain; 