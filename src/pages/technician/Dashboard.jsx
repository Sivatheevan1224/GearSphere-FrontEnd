import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  CurrencyDollar, 
  Star, 
  Tools, 
  People, 
  Clock 
} from 'react-bootstrap-icons';
import { Envelope, Telephone, GeoAlt } from 'react-bootstrap-icons';
import logo from '../../images/logo.PNG';
import pcpic2 from '../../images/pcpic2.jpeg';

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
    <>
      {/* Hero Section */}
      <section className="py-0 bg-black text-white position-relative overflow-hidden mb-5" style={{borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: '2rem', borderBottomRightRadius: '2rem', boxShadow: '0 4px 32px rgba(0,0,0,0.10)', marginTop: '-1px', marginBottom: 0, position: 'relative', paddingTop: 0}}>
        {/* Sharp background image (no blur) */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${pcpic2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
        <Container className="py-0 position-relative" style={{ zIndex: 2 }}>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-3 fw-bold mb-4 rise-up" style={{ animationDelay: '0s' }}>
                Welcome to Your Dashboard, <span className="text-primary">GearSphere Technician</span>
              </h1>
              <p className="lead mb-5 rise-up" style={{ animationDelay: '0.3s' }}>
                Manage your appointments, services, earnings, and more. Deliver the best PC building experience!
              </p>
              <div className="d-flex gap-3 rise-up" style={{ animationDelay: '0.6s' }}>
                {/* Add dashboard-specific buttons here if needed */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Existing Dashboard Content */}
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
            
          </Col>
        </Row>
      </Container>
      {/* Contact Section */}
      <section className="py-0 bg-white" style={{borderRadius: '2rem', boxShadow: '0 4px 32px rgba(0,0,0,0.10)', marginTop: '2rem', marginBottom: 0}}>
        <Container>
          <h1 className="text-center mb-5">Contact Us</h1>
          <Row className="mb-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="mb-4">Get In Touch</h2>
              <p className="mb-4">
                Have questions about your appointments or need support? Fill out the form and our team will get back to you as soon as possible.
              </p>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter first name" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter last name" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="07X XXX XXXX" pattern="0[0-9]{2} [0-9]{3} [0-9]{4}" title="Enter a valid Sri Lankan phone number (e.g., 077 123 4567)" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Select>
                    <option>Select a subject</option>
                    <option>Appointment Inquiry</option>
                    <option>Technical Support</option>
                    <option>Account Issues</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Enter your message" />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Send Message
                </Button>
              </Form>
            </Col>
            <Col lg={6}>
              <Row className="mb-4">
                <Col md={12}>
                  <Card className="border-0 shadow-sm">
                    <Card.Body>
                      <h3 className="mb-4">Contact Information</h3>
                      <div className="d-flex mb-3">
                        <div className="me-3">
                          <Envelope size={24} className="text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-1">Email</h5>
                          <p className="mb-0">info@gearsphere.com</p>
                          <p className="mb-0">support@gearsphere.com</p>
                        </div>
                      </div>
                      <div className="d-flex mb-3">
                        <div className="me-3">
                          <Telephone size={24} className="text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-1">Phone</h5>
                          <p className="mb-0">+1 (555) 123-4567</p>
                          <p className="mb-0">+1 (555) 987-6543</p>
                        </div>
                      </div>
                      <div className="d-flex mb-3">
                        <div className="me-3">
                          <GeoAlt size={24} className="text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-1">Address</h5>
                          <p className="mb-0">Street Address, City (e.g., Colombo)</p>
                        </div>
                      </div>
                      {/* Logo at bottom */}
                      <div className="d-flex justify-content-center mt-4">
                        <img src={logo} alt="GearSphere Logo" style={{height: 60, width: 'auto', background: '#fff', padding: 4, borderRadius: 8}} />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default TechnicianDashboard; 