import React, { useEffect, useState } from "react";
import AdminNavbar from "../pageNavbars/AdminNavbar";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardFooter from "../pagefooter/DashboardFooter";
import LoadingScreen from "../../components/loading/LoadingScreen";
import axios from "axios";

function AdminLayout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("🔍 AdminLayout: Checking session...");

        // First check if we have user_type in sessionStorage
        const userType = sessionStorage.getItem("user_type");
        console.log("🔍 AdminLayout: SessionStorage user_type:", userType);

        if (!userType) {
          console.log(
            "❌ AdminLayout: No user_type in sessionStorage, redirecting to home"
          );
          navigate("/", { replace: true });
          return;
        }

        if (userType.toLowerCase() !== "admin") {
          console.log("❌ AdminLayout: User is not admin, redirecting to home");
          navigate("/", { replace: true });
          return;
        }

        // If we have admin in sessionStorage, verify with backend
        const response = await axios.get(
          "http://localhost/gearsphere_api/GearSphere-BackEnd/getSession.php",
          {
            withCredentials: true,
            timeout: 5000, // 5 second timeout
          }
        );

        console.log("✅ AdminLayout: Backend session response:", response.data);

        if (
          response.data.success &&
          response.data.user_type?.toLowerCase() === "admin"
        ) {
          console.log(
            "✅ AdminLayout: Admin session verified, allowing access"
          );
          setIsLoading(false);
        } else {
          console.log(
            "❌ AdminLayout: Backend session invalid, clearing sessionStorage and redirecting"
          );
          sessionStorage.removeItem("user_type");
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("❌ AdminLayout: Session check failed:", error);

        // If it's a 401 error, the session is invalid
        if (error.response && error.response.status === 401) {
          console.log(
            "❌ AdminLayout: 401 Unauthorized - clearing sessionStorage and redirecting"
          );
          sessionStorage.removeItem("user_type");
        }

        navigate("/", { replace: true });
      }
    };

    checkSession();
  }, [navigate]);

  if (isLoading) {
    return (
      <LoadingScreen
        message="Admin Authentication"
        submessage="Verifying administrative access"
      />
    );
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
