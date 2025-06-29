import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Nav, Tab, Badge, Modal } from 'react-bootstrap';

const TechnicianProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    experience: '5 years',
    specialization: ['PC Building', 'Hardware Repair', 'Software Installation'],
    certifications: [
      { name: 'CompTIA A+', year: '2022' },
      { name: 'Microsoft Certified Professional', year: '2021' }
    ],
    hourlyRate: 50,
    availability: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' }
    }
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newRequests: true,
    buildUpdates: true,
    customerMessages: true,
    paymentNotifications: true,
    systemUpdates: false
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

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
    setSuccessMessage('Profile updated successfully!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    // TODO: Implement password update logic
    setSuccessMessage('Password updated successfully!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleAvailabilityChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: value
        }
      }
    }));
  };

  const handleAvailabilitySave = (e) => {
    e.preventDefault();
    // TODO: Implement availability update logic
    setSuccessMessage('Availability updated successfully!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handlePreferencesSave = (e) => {
    e.preventDefault();
    // TODO: Implement preferences update logic
    setSuccessMessage('Preferences updated successfully!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <Container className="py-5">
      <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered backdrop="static" keyboard={false}>
        <Modal.Body className="text-center">
          <h5 className="mb-0">{successMessage}</h5>
        </Modal.Body>
      </Modal>

      <h1 className="text-center mb-5">Technician Profile</h1>

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
                <p className="text-muted">PC Technician</p>
                <div className="mb-3">
                  <Badge bg="primary" className="me-2">
                    {formData.experience} Experience
                  </Badge>
                  <Badge bg="success">
                    LKR {formData.hourlyRate}/hr
                  </Badge>
                </div>
              </div>

              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'personal'}
                    onClick={() => setActiveTab('personal')}
                  >
                    Personal Information
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'availability'}
                    onClick={() => setActiveTab('availability')}
                  >
                    Availability
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'security'}
                    onClick={() => setActiveTab('security')}
                  >
                    Security
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'notifications'}
                    onClick={() => setActiveTab('notifications')}
                  >
                    Notifications
                  </Nav.Link>
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
                <Tab.Pane active={activeTab === 'personal'}>
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
                            placeholder="07X XXX XXXX"
                            pattern="0[0-9]{2} [0-9]{3} [0-9]{4}"
                            title="Enter a valid Sri Lankan phone number (e.g., 077 123 4567)"
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
                        placeholder="Street Address"
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
                            placeholder="City (e.g., Colombo)"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>District</Form.Label>
                          <Form.Control
                            type="text"
                            name="district"
                            value={formData.district || ''}
                            onChange={handleInputChange}
                            placeholder="District (e.g., Colombo)"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Experience</Form.Label>
                      <Form.Control
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Hourly Rate (LKR)</Form.Label>
                      <Form.Control
                        type="number"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Update Profile
                    </Button>
                  </Form>
                </Tab.Pane>

                {/* Availability Tab */}
                <Tab.Pane active={activeTab === 'availability'}>
                  <h4 className="mb-4">Working Hours</h4>
                  <Form onSubmit={handleAvailabilitySave}>
                    {Object.entries(formData.availability).map(([day, hours]) => (
                      <Row key={day} className="mb-3">
                        <Col md={3}>
                          <Form.Label className="text-capitalize">{day}</Form.Label>
                        </Col>
                        <Col md={4}>
                          <Form.Control
                            type="time"
                            value={hours.start}
                            onChange={(e) => handleAvailabilityChange(day, 'start', e.target.value)}
                          />
                        </Col>
                        <Col md={1} className="text-center">
                          <span className="align-middle">to</span>
                        </Col>
                        <Col md={4}>
                          <Form.Control
                            type="time"
                            value={hours.end}
                            onChange={(e) => handleAvailabilityChange(day, 'end', e.target.value)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Button variant="primary">
                      Save Availability
                    </Button>
                  </Form>
                </Tab.Pane>

                {/* Security Tab */}
                <Tab.Pane active={activeTab === 'security'}>
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
                <Tab.Pane active={activeTab === 'notifications'}>
                  <h4 className="mb-4">Notification Preferences</h4>
                  <Form onSubmit={handlePreferencesSave}>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="newRequests"
                        name="newRequests"
                        label="New Build Requests"
                        checked={notificationSettings.newRequests}
                        onChange={handleNotificationChange}
                      />
                      <Form.Text className="text-muted">
                        Get notified when new build requests are available
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="buildUpdates"
                        name="buildUpdates"
                        label="Build Status Updates"
                        checked={notificationSettings.buildUpdates}
                        onChange={handleNotificationChange}
                      />
                      <Form.Text className="text-muted">
                        Receive updates about your ongoing builds
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="customerMessages"
                        name="customerMessages"
                        label="Customer Messages"
                        checked={notificationSettings.customerMessages}
                        onChange={handleNotificationChange}
                      />
                      <Form.Text className="text-muted">
                        Get notified when customers send you messages
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="paymentNotifications"
                        name="paymentNotifications"
                        label="Payment Notifications"
                        checked={notificationSettings.paymentNotifications}
                        onChange={handleNotificationChange}
                      />
                      <Form.Text className="text-muted">
                        Receive notifications about payments and earnings
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="systemUpdates"
                        name="systemUpdates"
                        label="System Updates"
                        checked={notificationSettings.systemUpdates}
                        onChange={handleNotificationChange}
                      />
                      <Form.Text className="text-muted">
                        Get notified about platform updates and maintenance
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
    </Container>
  );
};

export default TechnicianProfile; 