import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Spinner, Alert } from 'react-bootstrap';
import { People, ClipboardCheck, GraphUp, Tools, Award } from 'react-bootstrap-icons';
import axios from 'axios';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    pendingVerifications: 0,
    reports: 0,
    analytics: 0
  });
  const [customerCount, setCustomerCount] = useState(0);
  const [technicianCount, setTechnicianCount] = useState(0);

  // Message state
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [msgError, setMsgError] = useState(null);

  // Mock data - Replace with actual API call
  useEffect(() => {
    // Fetch customers
    fetch('http://localhost/gearsphere_api/GearSphere-BackEnd/getAllCustomers.php?action=getAll')
      .then(res => res.json())
      .then(data => setCustomerCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setCustomerCount(0));

    // Fetch technicians
    fetch('http://localhost/gearsphere_api/GearSphere-BackEnd/getAllTechnicians.php?action=getAll')
      .then(res => res.json())
      .then(data => setTechnicianCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setTechnicianCount(0));

    setStats(prev => ({
      ...prev,
      totalOrders: 350,
      pendingVerifications: 7,
      reports: 12,
      analytics: 1
    }));

    // Remove any code related to fetching, displaying, or managing messages in this file.
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted mb-2">{title}</h6>
            <h3 className="mb-0">{value}</h3>
          </div>
          <div className={`bg-${color} bg-opacity-10 p-3 rounded`}>
            <Icon size={24} className={`text-${color}`} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-black text-white position-relative overflow-hidden mb-5" style={{borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: '2rem', borderBottomRightRadius: '2rem', boxShadow: '0 4px 32px rgba(0,0,0,0.10)', marginTop: 0, marginBottom: '2rem'}}>
        {/* Blurred background image */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(/src/images/pcpic2.jpeg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(12px)',
            zIndex: 0,
            opacity: 0.7
          }}
        ></div>
        {/* Overlay for darkening and contrast */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "radial-gradient(circle at 30% 50%, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 70%)",
            zIndex: 1,
          }}
        ></div>
        <Container className="py-5 position-relative" style={{ zIndex: 2 }}>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-3 fw-bold mb-4 rise-up" style={{ animationDelay: '0s' }}>
                GearSphere <span className="text-primary">Admin Dashboard</span>
              </h1>
              <p className="lead mb-5 rise-up" style={{ animationDelay: '0.3s' }}>
                Monitor platform activity, manage users, and oversee all operations from one place.
              </p>
              <div className="d-flex gap-3 rise-up" style={{ animationDelay: '0.6s' }}>
                {/* Add admin-specific buttons here if needed */}
              </div>
            </Col>
            <Col lg={6} className="text-lg-end" style={{backgroundBlendMode: 'darken'}}>
              {/* Optionally add an admin-related image or animation here */}
            </Col>
          </Row>
        </Container>
        {/* Blurred background image */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(/src/images/pcpic2.jpeg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backgroundBlendMode: 'darken',
            zIndex: 0,
            opacity: 1
          }}
        ></div>
        {/* Overlay for darkening and contrast */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "radial-gradient(circle at 30% 50%, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 70%)",
            zIndex: 1,
          }}
        ></div>
      </section>
      {/* Existing Dashboard Content */}
      <Container className="py-5">
        <h1 className="mb-4">Admin Dashboard</h1>

        <Row className="g-4 mb-4">
          <Col md={4}>
            <StatCard
              title="Total Users"
              value={customerCount + technicianCount}
              icon={People}
              color="primary"
            />
          </Col>
          <Col md={4}>
            <StatCard
              title="Total Orders"
              value={stats.totalOrders}
              icon={ClipboardCheck}
              color="success"
            />
          </Col>
          <Col md={4}>
            <StatCard
              title="Pending Verifications"
              value={stats.pendingVerifications}
              icon={Award}
              color="warning"
            />
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={6}>
            <StatCard
              title="Reports"
              value={stats.reports}
              icon={Tools}
              color="danger"
            />
          </Col>
          <Col md={6}>
            <StatCard
              title="Analytics Modules"
              value={stats.analytics}
              icon={GraphUp}
              color="info"
            />
          </Col>
        </Row>

        {/* Remove any code related to fetching, displaying, or managing messages in this file. */}
      </Container>
    </>
  );
}

export default AdminDashboard; 