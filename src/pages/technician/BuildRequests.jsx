import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Badge, Modal } from 'react-bootstrap';

const BuildRequests = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [response, setResponse] = useState({
    price: '',
    estimatedTime: '',
    notes: ''
  });

  // Mock data - replace with actual API call
  const buildRequests = [
    {
      id: 'BR001',
      customer: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1 (555) 123-4567'
      },
      date: '2024-03-15',
      status: 'Pending',
      budget: 1500,
      requirements: {
        purpose: 'Gaming',
        performance: 'High',
        specialRequirements: 'RGB lighting, quiet operation'
      },
      components: [
        { type: 'CPU', preference: 'Intel i7 or better' },
        { type: 'GPU', preference: 'NVIDIA RTX 4070 or better' },
        { type: 'RAM', preference: '32GB DDR5' },
        { type: 'Storage', preference: '1TB NVMe SSD' }
      ],
      timeline: 'Within 2 weeks'
    },
    // Add more mock requests here
  ];

  const getStatusBadge = (status) => {
    const variants = {
      'Pending': 'warning',
      'In Progress': 'primary',
      'Completed': 'success',
      'Cancelled': 'danger',
      'Rejected': 'secondary'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleRespond = (request) => {
    setSelectedRequest(request);
    setShowResponseModal(true);
  };

  const handleSubmitResponse = (e) => {
    e.preventDefault();
    // TODO: Implement response submission logic
    console.log('Submitting response:', { requestId: selectedRequest.id, response });
    setShowResponseModal(false);
    setResponse({
      price: '',
      estimatedTime: '',
      notes: ''
    });
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Build Requests</h1>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Budget</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Timeline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buildRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>
                    <div>
                      <strong>{request.customer.name}</strong>
                      <p className="text-muted mb-0 small">{request.customer.email}</p>
                    </div>
                  </td>
                  <td>{request.date}</td>
                  <td>${request.budget}</td>
                  <td>{request.requirements.purpose}</td>
                  <td>{getStatusBadge(request.status)}</td>
                  <td>{request.timeline}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleViewDetails(request)}
                    >
                      View Details
                    </Button>
                    {request.status === 'Pending' && (
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleRespond(request)}
                      >
                        Respond
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Request Details Modal */}
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Build Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <>
              <Row className="mb-4">
                <Col md={6}>
                  <h5>Customer Information</h5>
                  <p className="mb-1"><strong>Name:</strong> {selectedRequest.customer.name}</p>
                  <p className="mb-1"><strong>Email:</strong> {selectedRequest.customer.email}</p>
                  <p className="mb-1"><strong>Phone:</strong> {selectedRequest.customer.phone}</p>
                </Col>
                <Col md={6}>
                  <h5>Request Information</h5>
                  <p className="mb-1"><strong>Request ID:</strong> {selectedRequest.id}</p>
                  <p className="mb-1"><strong>Date:</strong> {selectedRequest.date}</p>
                  <p className="mb-1"><strong>Status:</strong> {getStatusBadge(selectedRequest.status)}</p>
                  <p className="mb-1"><strong>Budget:</strong> ${selectedRequest.budget}</p>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <h5>Requirements</h5>
                  <p className="mb-1"><strong>Purpose:</strong> {selectedRequest.requirements.purpose}</p>
                  <p className="mb-1"><strong>Performance Level:</strong> {selectedRequest.requirements.performance}</p>
                  <p className="mb-1"><strong>Special Requirements:</strong> {selectedRequest.requirements.specialRequirements}</p>
                </Col>
                <Col md={6}>
                  <h5>Timeline</h5>
                  <p className="mb-1"><strong>Required By:</strong> {selectedRequest.timeline}</p>
                </Col>
              </Row>

              <h5>Component Preferences</h5>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Component Type</th>
                    <th>Preference</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRequest.components.map((component, index) => (
                    <tr key={index}>
                      <td>{component.type}</td>
                      <td>{component.preference}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
          {selectedRequest?.status === 'Pending' && (
            <Button variant="primary" onClick={() => {
              setShowDetailsModal(false);
              handleRespond(selectedRequest);
            }}>
              Respond to Request
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Response Modal */}
      <Modal show={showResponseModal} onHide={() => setShowResponseModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Respond to Build Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitResponse}>
            <Form.Group className="mb-3">
              <Form.Label>Proposed Price ($)</Form.Label>
              <Form.Control
                type="number"
                value={response.price}
                onChange={(e) => setResponse(prev => ({ ...prev, price: e.target.value }))}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estimated Build Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., 2-3 days"
                value={response.estimatedTime}
                onChange={(e) => setResponse(prev => ({ ...prev, estimatedTime: e.target.value }))}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={response.notes}
                onChange={(e) => setResponse(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add any additional information or recommendations..."
              />
            </Form.Group>

            <div className="text-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowResponseModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit Response
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default BuildRequests; 