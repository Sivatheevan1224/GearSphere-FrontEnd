import React from "react";
import SellerNavbar from "../pageNavbars/SellerNavbar";
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