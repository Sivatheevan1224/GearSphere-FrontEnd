import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function TechnicianNavbar({ fixed = "top" }) {
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
        <Navbar.Toggle aria-controls="technician-navbar-nav" />
        <Navbar.Collapse id="technician-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/technician/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/technician/services">Services</Nav.Link>
            <Nav.Link as={Link} to="/technician/build-requests">Build Requests</Nav.Link>
            <Nav.Link as={Link} to="/technician/appointments">Appointments</Nav.Link>
            <Nav.Link as={Link} to="/technician/earnings">Earnings</Nav.Link>
            <Nav.Link as={Link} to="/technician/reviews">Reviews</Nav.Link>
            <Nav.Link as={Link} to="/technician/profile">My Profile</Nav.Link>
          </Nav>
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TechnicianNavbar; 