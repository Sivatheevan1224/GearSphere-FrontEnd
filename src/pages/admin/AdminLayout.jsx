import React, { useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const userType = sessionStorage.getItem("user_type");
    if (userType?.toLowerCase() !== "admin") {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  return (
    <>
      <AdminNavbar fixed="top" />
      <div style={{ marginTop: 80 }}><Outlet /></div>
    </>
  );
}

export default AdminLayout; 
