import React from "react";
import CustomerNavbar from "../../components/CustomerNavbar";
import { Outlet } from "react-router-dom";

function CustomerLayout() {
  return (
    <>
      <CustomerNavbar fixed="top" />
      <div style={{ marginTop: 80 }}><Outlet /></div>
    </>
  );
}

export default CustomerLayout; 