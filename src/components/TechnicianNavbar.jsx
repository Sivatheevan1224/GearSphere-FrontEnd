import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Bell } from "react-bootstrap-icons";

function TechnicianNavbar({ fixed = "top" }) {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    navigate("/");
  };
  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4" fixed={fixed} expanded={expanded} onToggle={setExpanded}>
        <Container>
          <Navbar.Brand as={Link} to="/technician/dashboard" onClick={() => setExpanded(false)}>
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
              <Nav.Link as={Link} to="/technician/dashboard" onClick={() => setExpanded(false)}>Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/technician/services" onClick={() => setExpanded(false)}>Services</Nav.Link>
              <Nav.Link as={Link} to="/technician/build-requests" onClick={() => setExpanded(false)}>Build Requests</Nav.Link>
              <Nav.Link as={Link} to="/technician/appointments" onClick={() => setExpanded(false)}>Appointments</Nav.Link>
              <Nav.Link as={Link} to="/technician/earnings" onClick={() => setExpanded(false)}>Earnings</Nav.Link>
              <Nav.Link as={Link} to="/technician/reviews" onClick={() => setExpanded(false)}>Reviews</Nav.Link>
              <Nav.Link as={Link} to="/technician/profile" onClick={() => setExpanded(false)}>My Profile</Nav.Link>
            </Nav>
            <Bell size={22} className="me-3 cursor-pointer text-secondary" style={{ verticalAlign: 'middle' }} />
            <Button variant="outline-danger" onClick={() => setShowLogoutModal(true)}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to logout?
        </Modal.Body>
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