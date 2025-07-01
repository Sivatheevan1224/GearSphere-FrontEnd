import React, { useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const userType = sessionStorage.getItem("user_type")?.toLowerCase();
    const userId = sessionStorage.getItem("user_id");
    if (!userType || !userId || userType !== "admin") {
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
