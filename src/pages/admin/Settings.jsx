import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Gear, Shield, Bell, CreditCard, Globe } from 'react-bootstrap-icons';

function Settings() {
  return (
    <Container className="py-5">
      <h1 className="mb-4">Settings</h1>
      
      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body className="p-0">
              <div className="list-group list-group-flush">
                <button className="list-group-item list-group-item-action active">
                  <Gear className="me-2" />
                  General
                </button>
                <button className="list-group-item list-group-item-action">
                  <Shield className="me-2" />
                  Security
                </button>
                <button className="list-group-item list-group-item-action">
                  <Bell className="me-2" />
                  Notifications
                </button>
                <button className="list-group-item list-group-item-action">
                  <CreditCard className="me-2" />
                  Payment
                </button>
                <button className="list-group-item list-group-item-action">
                  <Globe className="me-2" />
                  Language
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <Card>
            <Card.Body>
              <h4 className="mb-4">General Settings</h4>
              
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label>Platform Name</Form.Label>
                  <Form.Control type="text" defaultValue="GearSphere" />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Platform Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    defaultValue="Your one-stop platform for PC building, repair, and maintenance services."
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Contact Email</Form.Label>
                  <Form.Control type="email" defaultValue="support@gearsphere.com" />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Support Phone</Form.Label>
                  <Form.Control type="tel" defaultValue="+1 (555) 123-4567" />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    defaultValue="123 Tech Street, New York, NY 10001"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Platform Logo</Form.Label>
                  <Form.Control type="file" />
                  <Form.Text className="text-muted">
                    Recommended size: 200x200 pixels
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Favicon</Form.Label>
                  <Form.Control type="file" />
                  <Form.Text className="text-muted">
                    Recommended size: 32x32 pixels
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Maintenance Mode</Form.Label>
                  <Form.Check
                    type="switch"
                    id="maintenance-mode"
                    label="Enable maintenance mode"
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button variant="primary">Save Changes</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Settings; 