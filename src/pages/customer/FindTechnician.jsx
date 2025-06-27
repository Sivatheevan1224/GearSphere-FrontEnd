import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Star, StarFill, GeoAlt } from 'react-bootstrap-icons';

function FindTechnician() {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedService, setSelectedService] = useState('');

  // Sri Lankan districts
  const districts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 
    'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara', 
    'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 
    'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 
    'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
  ];

  // Sample technicians data with Sri Lankan locations
  const technicians = [
    {
      id: 1,
      name: "Kamal Perera",
      district: "Colombo",
      rating: 4.5,
      reviews: 120,
      services: ["PC Repair", "Hardware Upgrade", "Software Installation"],
      rate: 2500,
      experience: "5 years",
      description: "Experienced PC technician specializing in custom builds and repairs. Available for both in-home and remote services in Colombo and surrounding areas."
    },
    {
      id: 2,
      name: "Nimal Silva",
      district: "Kandy",
      rating: 4.8,
      reviews: 85,
      services: ["PC Building", "Hardware Upgrade", "Network Setup"],
      rate: 2000,
      experience: "3 years",
      description: "Professional PC builder with expertise in gaming rigs and workstations. Serving Kandy and nearby districts."
    },
    {
      id: 3,
      name: "Sunil Fernando",
      district: "Galle",
      rating: 4.2,
      reviews: 65,
      services: ["PC Repair", "Data Recovery", "Virus Removal"],
      rate: 1800,
      experience: "4 years",
      description: "Specialized in PC repairs and data recovery services. Available in Galle and Southern Province."
    },
    {
      id: 4,
      name: "Priya Jayawardena",
      district: "Jaffna",
      rating: 4.7,
      reviews: 95,
      services: ["PC Building", "Software Installation", "System Optimization"],
      rate: 2200,
      experience: "6 years",
      description: "Expert in custom PC building and system optimization. Serving Northern Province with mobile service."
    }
  ];

  // Filter technicians based on selected district and service
  const filteredTechnicians = technicians.filter(tech => {
    const matchesDistrict = !selectedDistrict || tech.district === selectedDistrict;
    const matchesService = !selectedService || tech.services.includes(selectedService);
    return matchesDistrict && matchesService;
  });

  return (
    <Container className="py-5">
      <h1 className="mb-4">Find a Technician</h1>
      
      {/* Filters */}
      <Row className="mb-4">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>District</Form.Label>
                    <Form.Select 
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                    >
                      <option value="">All Districts</option>
                      {districts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Service Type</Form.Label>
                    <Form.Select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      <option value="">All Services</option>
                      <option>PC Repair</option>
                      <option>PC Building</option>
                      <option>Hardware Upgrade</option>
                      <option>Software Installation</option>
                      <option>Data Recovery</option>
                      <option>Network Setup</option>
                      <option>Virus Removal</option>
                      <option>System Optimization</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Technician List */}
      <Row>
        {filteredTechnicians.map((tech) => (
          <Col key={tech.id} md={6} className="mb-4">
            <Card>
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/placeholder.svg?height=80&width=80"
                    alt={tech.name}
                    className="rounded-circle me-3"
                    width="80"
                    height="80"
                  />
                  <div>
                    <h4 className="mb-1">{tech.name}</h4>
                    <p className="text-muted mb-1">
                      <GeoAlt className="me-1" /> {tech.district} District
                    </p>
                    <div className="d-flex align-items-center">
                      <div className="me-2">
                        {Array(5).fill(0).map((_, i) => (
                          i < Math.floor(tech.rating) ? 
                          <StarFill key={i} className="text-warning" /> : 
                          <Star key={i} className="text-warning" />
                        ))}
                      </div>
                      <span>{tech.rating} ({tech.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <p className="mb-3">{tech.description}</p>
                <div className="mb-3">
                  <strong>Services:</strong>
                  <div className="mt-1">
                    {tech.services.map((service, index) => (
                      <span key={index} className="badge bg-primary me-1">{service}</span>
                    ))}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">Rs. {tech.rate}/hr</h5>
                    <small className="text-muted">{tech.experience} experience</small>
                  </div>
                  <Button variant="primary">Contact</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FindTechnician; 