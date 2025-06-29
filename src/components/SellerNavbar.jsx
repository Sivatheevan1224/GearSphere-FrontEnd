import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Bell } from "react-bootstrap-icons";

function SellerNavbar({ fixed = "top" }) {
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
          <Navbar.Brand as={Link} to="/seller/dashboard" onClick={() => setExpanded(false)}>
            <img
              src="/src/images/logo.PNG"
              alt="GearSphere Logo"
              style={{ height: "70px", width: "80px", marginRight: 8 }}
            />
            <span className="fw-bold">GearSphere</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="seller-navbar-nav" />
          <Navbar.Collapse id="seller-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/seller/dashboard" onClick={() => setExpanded(false)}>Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/seller/products" onClick={() => setExpanded(false)}>Products</Nav.Link>
              <Nav.Link as={Link} to="/seller/inventory" onClick={() => setExpanded(false)}>Inventory</Nav.Link>
              <Nav.Link as={Link} to="/seller/orders" onClick={() => setExpanded(false)}>Orders</Nav.Link>
              <Nav.Link as={Link} to="/seller/analytics" onClick={() => setExpanded(false)}>Analytics</Nav.Link>
              <Nav.Link as={Link} to="/seller/profile" onClick={() => setExpanded(false)}>My Profile</Nav.Link>
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

export default SellerNavbar; 