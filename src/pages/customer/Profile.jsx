import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav, Tab } from 'react-bootstrap';

const CustomerProfile = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    serviceAlerts: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log('Profile update:', formData);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    // TODO: Implement password update logic
    console.log('Password update:', passwordData);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">My Profile</h1>
      <Tab.Container defaultActiveKey="personal">
        <Row>
          <Col lg={3} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <div className="text-center mb-4">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="rounded-circle mb-3"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  <h5>{formData.firstName} {formData.lastName}</h5>
                  <p className="text-muted">Customer</p>
                </div>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="personal">Personal Information</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="security">Security</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="notifications">Notifications</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={9}>
            <Card className="shadow-sm">
              <Card.Body>
                <Tab.Content>
                  {/* Personal Information Tab */}
                  <Tab.Pane eventKey="personal">
                    <h4 className="mb-4">Personal Information</h4>
                    <Form onSubmit={handleProfileUpdate}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3">
                            <Form.Label>ZIP Code</Form.Label>
                            <Form.Control
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Update Profile
                      </Button>
                    </Form>
                  </Tab.Pane>
                  {/* Security Tab */}
                  <Tab.Pane eventKey="security">
                    <h4 className="mb-4">Security Settings</h4>
                    <Form onSubmit={handlePasswordUpdate}>
                      <Form.Group className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Update Password
                      </Button>
                    </Form>
                  </Tab.Pane>
                  {/* Notifications Tab */}
                  <Tab.Pane eventKey="notifications">
                    <h4 className="mb-4">Notification Preferences</h4>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="switch"
                          id="orderUpdates"
                          name="orderUpdates"
                          label="Order Updates"
                          checked={notificationSettings.orderUpdates}
                          onChange={handleNotificationChange}
                        />
                        <Form.Text className="text-muted">
                          Receive notifications about your order status and shipping updates
                        </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="switch"
                          id="promotions"
                          name="promotions"
                          label="Promotions and Deals"
                          checked={notificationSettings.promotions}
                          onChange={handleNotificationChange}
                        />
                        <Form.Text className="text-muted">
                          Get notified about special offers and discounts
                        </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="switch"
                          id="newsletter"
                          name="newsletter"
                          label="Newsletter"
                          checked={notificationSettings.newsletter}
                          onChange={handleNotificationChange}
                        />
                        <Form.Text className="text-muted">
                          Receive our monthly newsletter with tech tips and industry news
                        </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Check
                          type="switch"
                          id="serviceAlerts"
                          name="serviceAlerts"
                          label="Service Alerts"
                          checked={notificationSettings.serviceAlerts}
                          onChange={handleNotificationChange}
                        />
                        <Form.Text className="text-muted">
                          Get notified about service appointments and technician updates
                        </Form.Text>
                      </Form.Group>
                      <Button variant="primary">
                        Save Preferences
                      </Button>
                    </Form>
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default CustomerProfile; 