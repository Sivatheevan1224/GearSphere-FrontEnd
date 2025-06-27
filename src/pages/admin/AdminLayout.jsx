import React from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <>
      <AdminNavbar fixed="top" />
      <div style={{ marginTop: 80 }}><Outlet /></div>
    </>
  );
}

export default AdminLayout; 