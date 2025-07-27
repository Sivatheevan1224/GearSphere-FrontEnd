import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button, Modal } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bell } from "react-bootstrap-icons";
import axios from "axios";
import TechnicianNotification from "../technician/notification/TechnicianNotification";
import { useRef } from "react";

function TechnicianNavbar({ fixed = "top" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [technicianData, setTechnicianData] = useState({
    name: "",
    profile_image: "/profile_images/user_image.jpg",
  });
  const [showNotif, setShowNotif] = useState(false);
  const [notifCount, setNotifCount] = useState(0);
  const bellRef = useRef(null);

  useEffect(() => {
    const fetchTechnicianData = async () => {
      try {
        const userId = sessionStorage.getItem("user_id");
        if (!userId) return;

        const token = localStorage.getItem("token");
        // Step 1: Get technician_id from user_id
        const techIdRes = await axios.get(
          `http://localhost/gearsphere_api/GearSphere-BackEnd/getTechnicianIdByUser.php?user_id=${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const technicianId = techIdRes.data.technician_id;
        if (!technicianId) return;

        // Step 2: Get technician details by technician_id
        const response = await axios.get(
          `http://localhost/gearsphere_api/GearSphere-BackEnd/getTechnicianDetail.php?technician_id=${technicianId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;

        if (data && data.success && data.technician) {
          const profilePicUrl = data.technician.profile_image
            ? `http://localhost/gearsphere_api/GearSphere-BackEnd/profile_images/${data.technician.profile_image}`
            : "/profile_images/user_image.jpg";

          setTechnicianData({
            name: data.technician.name || "",
            profile_image: profilePicUrl,
          });
        }
      } catch (err) {
        console.error("Failed to fetch technician data:", err);
      }
    };

    fetchTechnicianData();

    // Listen for profile updates
    const handleProfileUpdate = () => {
      fetchTechnicianData();
    };

    window.addEventListener("profilePicUpdated", handleProfileUpdate);
    return () =>
      window.removeEventListener("profilePicUpdated", handleProfileUpdate);
  }, []);

  useEffect(() => {
    const fetchNotifCount = async () => {
      const userId = sessionStorage.getItem("user_id");
      if (!userId) return;
      try {
        const res = await axios.get(
          `http://localhost/gearsphere_api/GearSphere-BackEnd/getSellerNotification.php?user_id=${userId}&count=1`
        );
        setNotifCount(res.data.count || 0);
      } catch (err) {
        setNotifCount(0);
      }
    };
    fetchNotifCount();
    const interval = setInterval(fetchNotifCount, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        className=""
        fixed={fixed}
        expanded={expanded}
        onToggle={setExpanded}
        style={{ borderBottom: "none" }}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/technician/dashboard"
            onClick={() => setExpanded(false)}
          >
            <img
              src="/src/images/logo.PNG"
              alt="GearSphere Logo"
              style={{ height: "70px", width: "80px", marginRight: 8 }}
            />
            <span className="fw-bold">GearSphere</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="technician-navbar-nav" />
          <Navbar.Collapse id="technician-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/technician/dashboard"
                onClick={() => setExpanded(false)}
                className={
                  location.pathname === "/technician/dashboard"
                    ? "text-primary fw-bold"
                    : ""
                }
              >
                Dashboard
              </Nav.Link>
              
              <Nav.Link
                as={Link}
                to="/technician/build-requests"
                onClick={() => setExpanded(false)}
                className={
                  location.pathname === "/technician/build-requests"
                    ? "text-primary fw-bold"
                    : ""
                }
              >
                Build Requests
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/technician/reviews"
                onClick={() => setExpanded(false)}
                className={
                  location.pathname === "/technician/reviews"
                    ? "text-primary fw-bold"
                    : ""
                }
              >
                Reviews
              </Nav.Link>
            </Nav>
            <div className="d-flex align-items-center">
              <div style={{ position: "relative", display: "inline-block" }}>
                <Bell
                  ref={bellRef}
                  size={22}
                  className="me-3 cursor-pointer text-secondary"
                  style={{ verticalAlign: "middle" }}
                  onClick={() => setShowNotif((prev) => !prev)}
                />
                {notifCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: -4,
                      right: 2,
                      background: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 7px",
                      fontSize: 12,
                      fontWeight: 700,
                      zIndex: 2,
                    }}
                  >
                    {notifCount}
                  </span>
                )}
              </div>
              <TechnicianNotification
                show={showNotif}
                target={bellRef.current}
                onHide={() => setShowNotif(false)}
              />
              <Nav.Link
                as={Link}
                to="/technician/profile"
                className="d-flex align-items-center p-0 ms-2"
              >
                <img
                  src={technicianData.profile_image}
                  alt="Profile"
                  className="rounded-circle"
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                    border: "2px solid #4361ee",
                  }}
                />
              </Nav.Link>
              <Button
                variant="outline-danger"
                onClick={() => setShowLogoutModal(true)}
                className="ms-3"
              >
                Logout
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Logout Confirmation Modal */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TechnicianNavbar;
