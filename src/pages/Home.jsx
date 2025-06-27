import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PcDisplay, Tools, Shop } from 'react-bootstrap-icons';

function Home() {
  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="mb-5">
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h1 className="display-4 mb-4">Build Your Dream Tech With GearSphere</h1>
          <p className="lead mb-4">
            Create your perfect custom PC with our expert builders and premium components. 
            From gaming rigs to professional workstations, we've got you covered.
          </p>
          <div className="d-flex gap-3">
            <Button as={Link} to="/marketplace" variant="primary" size="lg">
              Start Shopping
            </Button>
            <Button as={Link} to="/pc-builder" variant="outline-primary" size="lg">
              Build Your PC
            </Button>
          </div>
        </Col>
        <Col md={6}>
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="Custom PC"
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="mb-5">
        <Col md={4}>
          <div className="text-center mb-4">
            <PcDisplay size={48} className="text-primary mb-3" />
            <h3>Custom PC Building</h3>
            <p>
              Get a professionally built custom PC tailored to your needs and preferences.
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className="text-center mb-4">
            <Tools size={48} className="text-success mb-3" />
            <h3>Expert Technicians</h3>
            <p>
              Access skilled technicians for repairs, upgrades, and maintenance services.
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className="text-center mb-4">
            <Shop size={48} className="text-info mb-3" />
            <h3>Premium Components</h3>
            <p>
              Shop from a wide selection of high-quality PC components and accessories.
            </p>
          </div>
        </Col>
      </Row>

      {/* Call to Action */}
      <Row className="text-center">
        <Col>
          <h2 className="mb-4">Ready to Build Your Dream PC?</h2>
          <Button as={Link} to="/pc-builder" variant="primary" size="lg">
            Get Started Now
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home; 