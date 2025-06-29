import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { Star, StarFill, GeoAlt } from 'react-bootstrap-icons';

function FindTechnician() {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [showTechnicianModal, setShowTechnicianModal] = useState(false);
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [instructions, setInstructions] = useState('');
  const [showAssignmentSuccess, setShowAssignmentSuccess] = useState(false);

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

  const handleAssignTechnician = () => {
    // Here you would typically send the assignment data to your backend
    console.log('Assigning technician:', selectedTechnician);
    console.log('Instructions:', instructions);
    
    setShowTechnicianModal(false);
    setShowAssignmentSuccess(true);
    setInstructions('');
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      i < Math.floor(rating) ? 
      <StarFill key={i} className="text-warning" /> : 
      <Star key={i} className="text-warning" />
    ));
  };

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
                        {renderStars(tech.rating)}
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
                  <Button variant="primary" onClick={() => {
                    setSelectedTechnician(tech);
                    setShowTechnicianModal(true);
                  }}>Assign</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Technician Details Modal */}
      {showTechnicianModal && selectedTechnician && (
        <Modal show={showTechnicianModal} onHide={() => setShowTechnicianModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Assign Technician - {selectedTechnician.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={4}>
                <div className="text-center mb-3">
                  <img
                    src="/placeholder.svg?height=120&width=120"
                    alt={selectedTechnician.name}
                    className="rounded-circle mb-3"
                    width="120"
                    height="120"
                  />
                  <h4>{selectedTechnician.name}</h4>
                  <p className="text-muted mb-2">
                    <GeoAlt className="me-1" /> {selectedTechnician.district} District
                  </p>
                  <div className="d-flex justify-content-center align-items-center mb-2">
                    {renderStars(selectedTechnician.rating)}
                    <span className="ms-2">{selectedTechnician.rating} ({selectedTechnician.reviews} reviews)</span>
                  </div>
                  <div className="mb-3">
                    <h5 className="text-primary">Rs. {selectedTechnician.rate}/hr</h5>
                    <small className="text-muted">{selectedTechnician.experience} experience</small>
                  </div>
                </div>
              </Col>
              <Col md={8}>
                <h5>Technician Details</h5>
                <p className="mb-3">{selectedTechnician.description}</p>
                
                <div className="mb-3">
                  <strong>Services Offered:</strong>
                  <div className="mt-2">
                    {selectedTechnician.services.map((service, index) => (
                      <span key={index} className="badge bg-primary me-1 mb-1">{service}</span>
                    ))}
                  </div>
                </div>

                <hr />

                <h5>Assignment Instructions</h5>
                <p className="text-muted small mb-3">
                  Provide specific instructions for the technician about your PC build requirements.
                </p>
                
                <Form.Group className="mb-3">
                  <Form.Label>Special Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter any specific instructions, preferences, or requirements for your PC build..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Examples: "Please ensure good cable management", "Prefer quiet cooling solutions", "Need RGB lighting setup"
                  </Form.Text>
                </Form.Group>

                <div className="alert alert-info">
                  <strong>Note:</strong> The technician will contact you within 24 hours to discuss your requirements and schedule the build.
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowTechnicianModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAssignTechnician}>
              Assign Technician
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Assignment Success Modal */}
      <Modal show={showAssignmentSuccess} onHide={() => setShowAssignmentSuccess(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">
            <i className="bi bi-check-circle-fill me-2"></i>
            Technician Assigned Successfully!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="mb-4">
            <div className="text-success" style={{ fontSize: '3rem' }}>✅</div>
          </div>
          <h4 className="text-success mb-3">Assignment Confirmed</h4>
          <p className="mb-3">
            <strong>{selectedTechnician?.name}</strong> has been assigned to your PC build project.
          </p>
          <div className="alert alert-info">
            <strong>Next Steps:</strong>
            <ul className="mb-0 mt-2 text-start">
              <li>The technician will contact you within 24 hours</li>
              <li>You'll discuss your PC build requirements</li>
              <li>Schedule will be arranged for the build</li>
              <li>Payment for technician services will be handled separately</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowAssignmentSuccess(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default FindTechnician; 