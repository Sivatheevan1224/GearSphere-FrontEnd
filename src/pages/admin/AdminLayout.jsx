import React, { useEffect, useState } from "react";
import AdminNavbar from "../pageNavbars/AdminNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardFooter from "../pagefooter/DashboardFooter";
import axios from "axios";

function AdminLayout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost/gearsphere_api/GearSphere-BackEnd/getSession.php",
          { withCredentials: true }
        );

        if (
          response.data.success &&
          response.data.user_type?.toLowerCase() === "admin"
        ) {
          setIsLoading(false);
        } else {
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("Session check failed:", error);
        navigate("/", { replace: true });
      }
    };

    checkSession();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <AdminNavbar fixed="top" />
      <div style={{ flex: "1 0 auto", marginTop: 80 }}>
        <Outlet />
      </div>
      <DashboardFooter />
    </div>
  );
}

export default AdminLayout;
