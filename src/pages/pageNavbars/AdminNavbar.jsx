import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button, Modal } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bell } from "react-bootstrap-icons";
import axios from 'axios';

function AdminNavbar({ fixed = "top" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [adminData, setAdminData] = useState({
    name: '',
    profile_image: '/src/images/profile/default_admin.png'
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const userId = sessionStorage.getItem('user_id');
        if (!userId) return;

        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost/gearsphere_api/GearSphere-BackEnd/getAdmin.php?user_id=${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;

        if (data) {
          const profilePicUrl = data.profile_image
            ? `http://localhost/gearsphere_api/GearSphere-BackEnd/profile_images/${data.profile_image}`
            : '/src/images/profile/default_admin.png';

          setAdminData({
            name: data.name || '',
            profile_image: profilePicUrl,
          });
        }
      } catch (err) {
        console.error('Failed to fetch admin data:', err);
      }
    };

    fetchAdminData();

    // Listen for profile updates
    const handleProfileUpdate = () => {
      fetchAdminData();
    };

    window.addEventListener('profilePicUpdated', handleProfileUpdate);
    return () => window.removeEventListener('profilePicUpdated', handleProfileUpdate);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4" fixed={fixed} expanded={expanded} onToggle={setExpanded}>
        <Container>
          <Navbar.Brand as={Link} to="/admin" onClick={() => setExpanded(false)}>
            <img
              src="/src/images/logo.PNG"
              alt="GearSphere Logo"
              style={{ height: "70px", width: "80px", marginRight: 8 }}
            />
            <span className="fw-bold">GearSphere</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar-nav" />
          <Navbar.Collapse id="admin-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/admin" onClick={() => setExpanded(false)} className={location.pathname === "/admin" ? "text-primary fw-bold" : ""}>Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/admin/customers" onClick={() => setExpanded(false)} className={location.pathname === "/admin/customers" ? "text-primary fw-bold" : ""}>Customer Management</Nav.Link>
              <Nav.Link as={Link} to="/admin/technicians" onClick={() => setExpanded(false)} className={location.pathname === "/admin/technicians" ? "text-primary fw-bold" : ""}>Technician Management</Nav.Link>
              <Nav.Link as={Link} to="/admin/analytics" onClick={() => setExpanded(false)} className={location.pathname === "/admin/analytics" ? "text-primary fw-bold" : ""}>Analytics</Nav.Link>
              <Nav.Link as={Link} to="/admin/reports" onClick={() => setExpanded(false)} className={location.pathname === "/admin/reports" ? "text-primary fw-bold" : ""}>Reports</Nav.Link>
            </Nav>
            <div className="d-flex align-items-center">
              <Bell size={22} className="me-3 cursor-pointer text-secondary" style={{ verticalAlign: 'middle' }} />
              <Nav.Link as={Link} to="/admin/profile" className="d-flex align-items-center p-0 ms-2">
                <img
                  src={adminData.profile_image}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: 40, height: 40, objectFit: 'cover', border: '2px solid #4361ee' }}
                />
              </Nav.Link>
              <Button variant="outline-danger" onClick={() => setShowLogoutModal(true)} className="ms-3">
                Logout
              </Button>
            </div>
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