import React from "react";
import SellerNavbar from "../../components/SellerNavbar";
import SellerDashboard from "./Dashboard";

function SellerMain() {
  return (
    <>
      <SellerNavbar />
      <div style={{ padding: 0 }}>
        <SellerDashboard />
      </div>
    </>
  );
}
export default SellerMain; 