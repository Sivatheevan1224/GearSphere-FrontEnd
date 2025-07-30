import React from "react";
import AdminNavbar from "../pageNavbars/AdminNavbar";
import AdminDashboard from "./AdminDashboard";

function AdminMain() {
  return (
    <>
      <AdminNavbar />
      <div style={{ padding: 0 }}>
        <AdminDashboard />
      </div>
    </>
  );
}
export default AdminMain; 
