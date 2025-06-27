import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function SellerNavbar({ fixed = "top" }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    navigate("/");
  };
  return (
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
        <Navbar.Toggle aria-controls="seller-navbar-nav" />
        <Navbar.Collapse id="seller-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/seller/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/seller/inventory">Inventory</Nav.Link>
            <Nav.Link as={Link} to="/seller/orders">Orders</Nav.Link>
            <Nav.Link as={Link} to="/seller/analytics">Analytics</Nav.Link>
            <Nav.Link as={Link} to="/seller/profile">My Profile</Nav.Link>
          </Nav>
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SellerNavbar; 