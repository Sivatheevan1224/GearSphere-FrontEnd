import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import SellerNavbar from "../pageNavbars/SellerNavbar";
import Footer from "../../components/footer/Footer";
import logo from "../../images/logo.PNG";
import customerimg from "../../images/customer_monitorimg.jpg";
import "../../styles.css";

const SellerMonitoring = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is authenticated as seller
    const checkAuth = async () => {
      try {
        const response = await fetch(
          "http://localhost/gearsphere_api/GearSphere-BackEnd/getSession.php",
          { credentials: "include" }
        );
        const data = await response.json();

        if (!data.success || data.user_type !== "seller") {
          navigate("/");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);

  const switchToUserType = async (type) => {
    setLoading(true);

    // Store original seller session info
    try {
      const response = await fetch(
        "http://localhost/gearsphere_api/GearSphere-BackEnd/getSession.php",
        { credentials: "include" }
      );
      const currentSession = await response.json();

      if (currentSession.success) {
        // Store seller info in sessionStorage for later restoration
        sessionStorage.setItem("original_user_type", "seller");
        sessionStorage.setItem("original_user_id", currentSession.user_id);
        sessionStorage.setItem("monitoring_mode", "true");
      }
    } catch (error) {
      console.error("Failed to store session info:", error);
    }

    // Navigate to customer dashboard only
    setTimeout(() => {
      setLoading(false);
      if (type === "customer") {
        navigate("/customer/dashboard");
      }
    }, 2000);
  };

  if (loading) {
    return (
      <div
        className="loading"
        style={{ textAlign: "center", marginTop: "10%" }}
      >
        <img src={logo} alt="logo" style={{ width: 100, height: 100 }} />
        <h4>Loading......</h4>
      </div>
    );
  }

  return (
    <>
      <div
        className="seller-monitoring"
        style={{ minHeight: "60vh", background: "#f8f9fa" }}
      >
        <SellerNavbar />
        <h2 className="text-center fw-bold my-4">Monitoring Section</h2>
        <div className="d-flex justify-content-center">
          <Card
            className="monitoring-card"
            style={{
              width: 350,
              minHeight: 420,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <Card.Body className="d-flex flex-column align-items-center">
              <Card.Title>Customer Zone</Card.Title>
              <img
                src={customerimg}
                alt="cus-img"
                style={{
                  width: 220,
                  height: 140,
                  objectFit: "cover",
                  borderRadius: 12,
                  margin: "16px 0",
                }}
              />
              <Card.Text className="text-center">
                Switch to the customer view to monitor customer dashboard
                functionality and user experience.
              </Card.Text>
              <Button
                variant="primary"
                className="mt-auto"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    switchToUserType("customer");
                  }, 2000);
                }}
              >
                Switch as Customer
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SellerMonitoring;
