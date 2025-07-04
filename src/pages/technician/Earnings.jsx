import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const Earnings = () => {
  return (
    <Container className="py-4">
      <br /><br /><br /><br />
      <h2 className="mb-4">Earnings Dashboard</h2>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Earnings</Card.Title>
              <h3>0.00 LKR</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>This Month</Card.Title>
              <h3>0.00 LKR</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Pending</Card.Title>
              <h3>0.00 LKR</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Earnings; 