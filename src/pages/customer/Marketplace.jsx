import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Marketplace() {
  const navigate = useNavigate();
  return (
    <Container className="py-5">
      <h1 className="mb-4">Marketplace</h1>
      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="/placeholder.svg?height=200&width=300" />
            <Card.Body>
              <Card.Title>Gaming PC Components</Card.Title>
              <Card.Text>
                Browse our selection of high-performance gaming components.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/marketplace/gaming')}>View Products</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="/placeholder.svg?height=200&width=300" />
            <Card.Body>
              <Card.Title>Workstation Parts</Card.Title>
              <Card.Text>
                Professional-grade components for content creators and professionals.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/marketplace/workstation')}>View Products</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="/placeholder.svg?height=200&width=300" />
            <Card.Body>
              <Card.Title>Accessories</Card.Title>
              <Card.Text>
                Essential accessories and peripherals for your setup.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/marketplace/accessories')}>View Products</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Marketplace; 