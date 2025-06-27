import React from "react";
import SellerNavbar from "../../components/SellerNavbar";
import { Outlet } from "react-router-dom";

function SellerLayout() {
  return (
    <>
      <SellerNavbar fixed="top" />
      <div style={{ marginTop: 80 }}><Outlet /></div>
    </>
  );
}

export default SellerLayout; 