import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Tab, Nav, Alert } from 'react-bootstrap';

const SellerProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  // Mock data - replace with actual API calls
  const profileData = {
    store: {
      name: 'TechParts Store',
      description: 'Your one-stop shop for high-quality PC components and accessories.',
      logo: '/src/images/store-logo.png',
      banner: '/src/images/store-banner.jpg',
      email: 'contact@techparts.com',
      phone: '+1 234-567-8900',
      address: {
        street: '123 Tech Street',
        city: 'San Francisco',
        state: 'CA',
        zip: '94105',
        country: 'USA'
      },
      socialMedia: {
        facebook: 'techparts',
        twitter: '@techparts',
        instagram: 'techparts'
      }
    },
    account: {
      name: 'John Smith',
      email: 'john@techparts.com',
      phone: '+1 234-567-8901',
      role: 'Store Owner',
      joinDate: '2023-01-15'
    },
    preferences: {
      notifications: {
        newOrders: true,
        lowStock: true,
        salesReports: true,
        marketingUpdates: false
      },
      display: {
        currency: 'USD',
        timezone: 'America/Los_Angeles',
        language: 'English'
      }
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // TODO: Implement API call to update profile
    setAlertMessage('Profile updated successfully!');
    setAlertVariant('success');
    setShowAlert(true);
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    // TODO: Implement API call to update preferences
    setAlertMessage('Preferences updated successfully!');
    setAlertVariant('success');
    setShowAlert(true);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Store Profile</h1>

      {showAlert && (
        <Alert
          variant={alertVariant}
          onClose={() => setShowAlert(false)}
          dismissible
          className="mb-4"
        >
          {alertMessage}
        </Alert>
      )}

      <Row>
        <Col md={3}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <div className="text-center mb-4">
                <img
                  src={profileData.store.logo}
                  alt="Store Logo"
                  className="rounded-circle mb-3"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <h4>{profileData.store.name}</h4>
                <p className="text-muted">{profileData.account.role}</p>
              </div>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'profile'}
                    onClick={() => setActiveTab('profile')}
                  >
                    Store Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'account'}
                    onClick={() => setActiveTab('account')}
                  >
                    Account Settings
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === 'preferences'}
                    onClick={() => setActiveTab('preferences')}
                  >
                    Preferences
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <Card className="shadow-sm">
            <Card.Body>
              <Tab.Content>
                {/* Store Profile Tab */}
                <Tab.Pane active={activeTab === 'profile'}>
                  <h4 className="mb-4">Store Profile</h4>
                  <Form onSubmit={handleSaveProfile}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Store Name</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={profileData.store.name}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Store Email</Form.Label>
                          <Form.Control
                            type="email"
                            defaultValue={profileData.store.email}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Store Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        defaultValue={profileData.store.description}
                      />
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            defaultValue={profileData.store.phone}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Store Logo</Form.Label>
                          <Form.Control type="file" accept="image/*" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <h5 className="mt-4 mb-3">Store Address</h5>
                    <Row>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Street Address</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={profileData.store.address.street}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={profileData.store.address.city}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={profileData.store.address.state}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label>ZIP Code</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={profileData.store.address.zip}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <h5 className="mt-4 mb-3">Social Media</h5>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Facebook</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={profileData.store.socialMedia.facebook}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Twitter</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={profileData.store.socialMedia.twitter}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Instagram</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={profileData.store.socialMedia.instagram}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="text-end mt-4">
                      <Button type="submit" variant="primary">
                        Save Changes
                      </Button>
                    </div>
                  </Form>
                </Tab.Pane>

                {/* Account Settings Tab */}
                <Tab.Pane active={activeTab === 'account'}>
                  <h4 className="mb-4">Account Settings</h4>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={profileData.account.name}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            defaultValue={profileData.account.email}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            defaultValue={profileData.account.phone}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Role</Form.Label>
                          <Form.Control
                            type="text"
                            defaultValue={profileData.account.role}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <h5 className="mt-4 mb-3">Change Password</h5>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Current Password</Form.Label>
                          <Form.Control type="password" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>New Password</Form.Label>
                          <Form.Control type="password" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Confirm New Password</Form.Label>
                          <Form.Control type="password" />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="text-end mt-4">
                      <Button variant="primary">Update Account</Button>
                    </div>
                  </Form>
                </Tab.Pane>

                {/* Preferences Tab */}
                <Tab.Pane active={activeTab === 'preferences'}>
                  <h4 className="mb-4">Preferences</h4>
                  <Form onSubmit={handleSavePreferences}>
                    <h5 className="mb-3">Notifications</h5>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="newOrders"
                        label="New Orders"
                        defaultChecked={profileData.preferences.notifications.newOrders}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="lowStock"
                        label="Low Stock Alerts"
                        defaultChecked={profileData.preferences.notifications.lowStock}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="salesReports"
                        label="Sales Reports"
                        defaultChecked={profileData.preferences.notifications.salesReports}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        id="marketingUpdates"
                        label="Marketing Updates"
                        defaultChecked={profileData.preferences.notifications.marketingUpdates}
                      />
                    </Form.Group>

                    <h5 className="mt-4 mb-3">Display Settings</h5>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Currency</Form.Label>
                          <Form.Select defaultValue={profileData.preferences.display.currency}>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Timezone</Form.Label>
                          <Form.Select defaultValue={profileData.preferences.display.timezone}>
                            <option value="America/Los_Angeles">Pacific Time</option>
                            <option value="America/New_York">Eastern Time</option>
                            <option value="Europe/London">London Time</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>Language</Form.Label>
                          <Form.Select defaultValue={profileData.preferences.display.language}>
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="text-end mt-4">
                      <Button type="submit" variant="primary">
                        Save Preferences
                      </Button>
                    </div>
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

export default SellerProfile; 