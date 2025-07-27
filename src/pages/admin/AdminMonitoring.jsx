import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import AdminNavbar from "../pageNavbars/AdminNavbar";
import Footer from "../../components/footer/Footer";
import logo from "../../images/logo.PNG";
import customerimg from "../../images/customer_monitorimg.jpg";
import technicianimg from "../../images/provider monitor.jpg";
import "../../styles.css";

const AdminMonitoring = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("user_type")?.toLowerCase() !== "admin") {
      sessionStorage.clear();
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const switchToUserType = (type) => {
    setLoading(false);
    sessionStorage.setItem("previous_user_type", "admin");
    sessionStorage.setItem("user_type", type);
    if (type === "customer") {
      navigate("/customer/dashboard");
    } else if (type === "technician") {
      navigate("/technician/dashboard");
    }
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
        className="admin-monitoring"
        style={{ minHeight: "60vh", background: "#f8f9fa" }}
      >
        <AdminNavbar />
        <h2 className="text-center fw-bold my-4">Monitoring Section</h2>
        <div className="d-flex justify-content-center gap-5 flex-wrap">
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
                Switch to the customer view to ensure the customer dashboard is
                functioning correctly.
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

          <Card
            className="monitoring-card"
            style={{
              width: 350,
              minHeight: 420,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <Card.Body className="d-flex flex-column align-items-center">
              <Card.Title>Technician Dashboard</Card.Title>
              <img
                src={technicianimg}
                alt="tech-img"
                style={{
                  width: 220,
                  height: 140,
                  objectFit: "cover",
                  borderRadius: 12,
                  margin: "16px 0",
                }}
              />
              <Card.Text className="text-center">
                Switch to the technician view to ensure the technician dashboard
                is functioning correctly.
              </Card.Text>
              <Button
                variant="success"
                className="mt-auto"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    switchToUserType("technician");
                  }, 2000);
                }}
              >
                Switch as Technician
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
      
    </>
  );
};

export default AdminMonitoring;
