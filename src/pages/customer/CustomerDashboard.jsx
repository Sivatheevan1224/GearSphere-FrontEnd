import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Award, Star, Cart, Heart, Person, Headset } from 'react-bootstrap-icons';

function CustomerDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    wishlist: 0,
    reviews: 0,
    supportTickets: 0,
    loyaltyPoints: 0
  });

  // Mock data - Replace with actual API call
  useEffect(() => {
    setStats({
      totalOrders: 8,
      wishlist: 5,
      reviews: 3,
      supportTickets: 1,
      loyaltyPoints: 1200
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
      <h1 className="mb-4">Customer Dashboard</h1>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={Cart}
            color="primary"
          />
        </Col>
        <Col md={4}>
          <StatCard
            title="Wishlist Items"
            value={stats.wishlist}
            icon={Heart}
            color="danger"
          />
        </Col>
        <Col md={4}>
          <StatCard
            title="Loyalty Points"
            value={stats.loyaltyPoints}
            icon={Award}
            color="warning"
          />
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <StatCard
            title="Reviews Written"
            value={stats.reviews}
            icon={Star}
            color="info"
          />
        </Col>
        <Col md={6}>
          <StatCard
            title="Support Tickets"
            value={stats.supportTickets}
            icon={Headset}
            color="secondary"
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <h4>Quick Actions</h4>
              <div className="d-flex gap-3 mt-3">
                <Link to="/orders" className="btn btn-primary">
                  <Cart className="me-2" /> My Orders
                </Link>
                <Link to="/marketplace" className="btn btn-success">
                  <Heart className="me-2" /> Wishlist
                </Link>
                <Link to="/profile" className="btn btn-info text-white">
                  <Person className="me-2" /> My Profile
                </Link>
                <Link to="/support" className="btn btn-warning">
                  <Headset className="me-2" /> Support
                </Link>
                <Link to="/reviews" className="btn btn-secondary">
                  <Star className="me-2" /> My Reviews
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomerDashboard; 