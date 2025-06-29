import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const formatLKR = (amount) => 'LKR ' + Number(amount).toLocaleString('en-LK');

const SalesAnalytics = () => {
  return (
    <Container className="py-4">
      <h2 className="mb-4">Sales Analytics</h2>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Sales</Card.Title>
              <h3>{formatLKR(0)}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>This Month</Card.Title>
              <h3>{formatLKR(0)}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Pending Orders</Card.Title>
              <h3>0</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Top Selling Products</Card.Title>
              <p>No data available</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Recent Orders</Card.Title>
              <p>No data available</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SalesAnalytics; 