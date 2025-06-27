import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Modal, Pagination } from 'react-bootstrap';
import { Wrench, Award, FileEarmark, CheckCircle, XCircle } from 'react-bootstrap-icons';

const TechnicianVerification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const requestsPerPage = 10;

  // Mock data - replace with actual API calls
  const verificationRequests = [
    {
      id: 'VR001',
      technicianId: 'T001',
      name: 'Mike Brown',
      email: 'mike.b@example.com',
      phone: '+1 (555) 345-6789',
      status: 'Pending',
      submissionDate: '2024-03-15',
      experience: '5 years',
      certifications: ['CompTIA A+', 'Network+'],
      documents: {
        idProof: 'id_proof.pdf',
        certifications: ['cert1.pdf', 'cert2.pdf'],
        portfolio: 'portfolio.pdf'
      },
      notes: 'Experienced PC technician with focus on custom builds'
    },
    {
      id: 'VR002',
      technicianId: 'T002',
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '+1 (555) 456-7890',
      status: 'Under Review',
      submissionDate: '2024-03-14',
      experience: '3 years',
      certifications: ['Microsoft Certified Professional'],
      documents: {
        idProof: 'id_proof.pdf',
        certifications: ['cert1.pdf'],
        portfolio: 'portfolio.pdf'
      },
      notes: 'Specializes in laptop repairs and upgrades'
    },
    {
      id: 'VR003',
      technicianId: 'T003',
      name: 'John Wilson',
      email: 'john.w@example.com',
      phone: '+1 (555) 567-8901',
      status: 'Approved',
      submissionDate: '2024-03-13',
      experience: '7 years',
      certifications: ['CompTIA A+', 'Security+', 'Cisco CCNA'],
      documents: {
        idProof: 'id_proof.pdf',
        certifications: ['cert1.pdf', 'cert2.pdf', 'cert3.pdf'],
        portfolio: 'portfolio.pdf'
      },
      notes: 'Network security specialist with extensive experience'
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      'Pending': 'warning',
      'Under Review': 'info',
      'Approved': 'success',
      'Rejected': 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleStatusChange = (requestId, newStatus) => {
    // TODO: Implement status update logic
    console.log('Updating status for request:', requestId, 'to:', newStatus);
  };

  const filteredRequests = verificationRequests.filter(request =>
    (request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (statusFilter === 'all' || request.status === statusFilter)
  );

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Technician Verification</h1>

      {/* Stats */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <h3>Pending</h3>
              <h2 className="text-warning">12</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <h3>Approved</h3>
              <h2 className="text-success">45</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <h3>Rejected</h3>
              <h2 className="text-danger">8</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Form.Select
              style={{ width: '200px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </Form.Select>
            <Form.Control
              type="search"
              placeholder="Search requests..."
              style={{ width: '300px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Submission Date</th>
                <th>Experience</th>
                <th>Certifications</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.name}</td>
                  <td>{request.email}</td>
                  <td>{request.phone}</td>
                  <td>{getStatusBadge(request.status)}</td>
                  <td>{request.submissionDate}</td>
                  <td>{request.experience}</td>
                  <td>{request.certifications.length}</td>
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
                      <Form.Select
                        size="sm"
                        style={{ width: 'auto', display: 'inline-block' }}
                        value={request.status}
                        onChange={(e) => handleStatusChange(request.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Approved">Approve</option>
                        <option value="Rejected">Reject</option>
                      </Form.Select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Request Details Modal */}
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Verification Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <Row>
              <Col md={6}>
                <h5>Personal Information</h5>
                <p className="mb-1"><strong>ID:</strong> {selectedRequest.id}</p>
                <p className="mb-1"><strong>Name:</strong> {selectedRequest.name}</p>
                <p className="mb-1"><strong>Email:</strong> {selectedRequest.email}</p>
                <p className="mb-1"><strong>Phone:</strong> {selectedRequest.phone}</p>
                <p className="mb-1"><strong>Status:</strong> {getStatusBadge(selectedRequest.status)}</p>
                <p className="mb-1"><strong>Submission Date:</strong> {selectedRequest.submissionDate}</p>
              </Col>
              <Col md={6}>
                <h5>Professional Information</h5>
                <p className="mb-1"><strong>Experience:</strong> {selectedRequest.experience}</p>
                <p className="mb-1"><strong>Certifications:</strong></p>
                <ul className="mb-3">
                  {selectedRequest.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
                <p className="mb-1"><strong>Notes:</strong></p>
                <p className="mb-3">{selectedRequest.notes}</p>
              </Col>
              <Col md={12}>
                <h5>Documents</h5>
                <div className="d-flex gap-3">
                  <Button variant="outline-primary" size="sm">
                    View ID Proof
                  </Button>
                  {selectedRequest.documents.certifications.map((cert, index) => (
                    <Button key={index} variant="outline-primary" size="sm">
                      View Certification {index + 1}
                    </Button>
                  ))}
                  <Button variant="outline-primary" size="sm">
                    View Portfolio
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
          {selectedRequest?.status === 'Pending' && (
            <>
              <Button variant="success" onClick={() => handleStatusChange(selectedRequest.id, 'Approved')}>
                Approve
              </Button>
              <Button variant="danger" onClick={() => handleStatusChange(selectedRequest.id, 'Rejected')}>
                Reject
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TechnicianVerification; 