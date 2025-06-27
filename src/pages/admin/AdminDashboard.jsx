import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { People, ClipboardCheck, GraphUp, Tools, Award } from 'react-bootstrap-icons';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    pendingVerifications: 0,
    reports: 0,
    analytics: 0
  });

  // Mock data - Replace with actual API call
  useEffect(() => {
    setStats({
      totalUsers: 1200,
      totalOrders: 350,
      pendingVerifications: 7,
      reports: 12,
      analytics: 1
    });
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
    <Container className="py-5">
      <h1 className="mb-4">Admin Dashboard</h1>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
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

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <h4>Quick Actions</h4>
              <div className="d-flex gap-3 mt-3">
                <a href="/admin/users" className="btn btn-primary">
                  <People className="me-2" /> Manage Users
                </a>
                <a href="/admin/orders" className="btn btn-success">
                  <ClipboardCheck className="me-2" /> View Orders
                </a>
                <a href="/admin/technician-verification" className="btn btn-warning">
                  <Award className="me-2" /> Technician Verification
                </a>
                <a href="/admin/analytics" className="btn btn-info text-white">
                  <GraphUp className="me-2" /> Analytics
                </a>
                <a href="/admin/settings" className="btn btn-secondary">
                  <Tools className="me-2" /> Settings
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard; 