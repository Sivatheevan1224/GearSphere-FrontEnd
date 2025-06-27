import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function AdminNavbar({ fixed = "top" }) {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4" fixed={fixed}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src="/src/images/logo.PNG"
              alt="GearSphere Logo"
              style={{ height: "40px", width: "50px", marginRight: 8 }}
            />
            <span className="fw-bold">GearSphere</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar-nav" />
          <Navbar.Collapse id="admin-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin/users">User Management</Nav.Link>
              <Nav.Link as={Link} to="/admin/technician-verification">Technician Verification</Nav.Link>
              <Nav.Link as={Link} to="/admin/seller-verification">Seller Verification</Nav.Link>
              <Nav.Link as={Link} to="/admin/orders">Order Management</Nav.Link>
              <Nav.Link as={Link} to="/admin/analytics">Analytics</Nav.Link>
              <Nav.Link as={Link} to="/admin/reports">Reports</Nav.Link>
              <Nav.Link as={Link} to="/admin/settings">Settings</Nav.Link>
              <Nav.Link as={Link} to="/admin/system-settings">System Settings</Nav.Link>
            </Nav>
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

export default AdminNavbar; 