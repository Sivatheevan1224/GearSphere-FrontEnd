import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { 
  Calendar, 
  CurrencyDollar, 
  Star, 
  Tools, 
  People, 
  Clock 
} from 'react-bootstrap-icons';

function TechnicianDashboard() {
  const [stats, setStats] = useState({
    pendingAppointments: 0,
    completedAppointments: 0,
    totalEarnings: 0,
    averageRating: 0,
    activeServices: 0,
    totalCustomers: 0
  });

  // Mock data - Replace with actual API call
  useEffect(() => {
    setStats({
      pendingAppointments: 5,
      completedAppointments: 28,
      totalEarnings: 125000,
      averageRating: 4.8,
      activeServices: 3,
      totalCustomers: 15
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
      <h1 className="mb-4">Technician Dashboard</h1>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <StatCard
            title="Pending Appointments"
            value={stats.pendingAppointments}
            icon={Calendar}
            color="warning"
          />
        </Col>
        <Col md={4}>
          <StatCard
            title="Total Earnings"
            value={`LKR ${stats.totalEarnings.toLocaleString()}`}
            icon={CurrencyDollar}
            color="success"
          />
        </Col>
        <Col md={4}>
          <StatCard
            title="Average Rating"
            value={`${stats.averageRating}/5.0`}
            icon={Star}
            color="primary"
          />
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <StatCard
            title="Active Services"
            value={stats.activeServices}
            icon={Tools}
            color="info"
          />
        </Col>
        <Col md={4}>
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={People}
            color="secondary"
          />
        </Col>
        <Col md={4}>
          <StatCard
            title="Completed Appointments"
            value={stats.completedAppointments}
            icon={Clock}
            color="success"
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <h4>Quick Actions</h4>
              <div className="d-flex gap-3 mt-3">
                <a href="/technician/appointments" className="btn btn-primary">
                  <Calendar className="me-2" /> View Appointments
                </a>
                <a href="/technician/services" className="btn btn-success">
                  <Tools className="me-2" /> Manage Services
                </a>
                <a href="/technician/earnings" className="btn btn-info text-white">
                  <CurrencyDollar className="me-2" /> View Earnings
                </a>
                <a href="/technician/reviews" className="btn btn-warning">
                  <Star className="me-2" /> Check Reviews
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TechnicianDashboard; 