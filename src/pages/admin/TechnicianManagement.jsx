import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Spinner } from 'react-bootstrap';
import { Tools } from 'react-bootstrap-icons';
import axios from 'axios';
import { toast } from 'react-toastify';

function TechnicianManagement() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const fetchTechnicians = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost/gearsphere_api/GearSphere-BackEnd/getAllTechnicians.php?action=getAll');
      const transformedData = response.data.map((tech) => ({
        id: tech.user_id,
        profile_image: tech.profile_image,
        name: tech.name,
        email: tech.email,
        phone: tech.contact_number,
        district: tech.address,
        status: tech.disable_status,
        joinDate: tech.created_at || '',
        proof: tech.proof,
        chargePerDay: tech.charge_per_day,
        specialization: tech.specialization,
        experience: tech.experience,
      }));
      setTechnicians(transformedData);
    } catch (error) {
      setTechnicians([]);
    }
    setLoading(false);
  };

  const handleDisableUser = async () => {
    if (!selectedUser) return;
    const newStatus = selectedUser.status === 'active' ? 'disabled' : 'active';
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost/gearsphere_api/GearSphere-BackEnd/disableUser.php', {
        params: {
          id: selectedUser.id,
          status: newStatus
        }
      });
      if (response.data.success) {
        toast.warn(`Technician status changed to: ${newStatus}`);
        setIsDisabled(newStatus === 'disabled');
        setTechnicians(prev =>
          prev.map(c => c.id === selectedUser.id ? { ...c, status: newStatus } : c)
        );
        setSelectedUser(prev => prev ? { ...prev, status: newStatus } : prev);
      } else {
        toast.error('Failed to update status: ' + response.data.message);
      }
    } catch (error) {
      toast.error('There was an error updating the user status!');
    }
    setIsLoading(false);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setIsDisabled(false);
  };

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <Spinner animation="border" variant="primary" />
        <h4 className="mt-3">Loading......</h4>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Technician Management</h1>
      <Row className="mb-4">
        <Col md={12}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <Tools size={40} className="text-success me-3" />
                <div>
                  <h3>{technicians.length}</h3>
                  <p className="text-muted mb-0">Total Technicians</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="mb-4">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>District</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map(tech => (
                <tr key={tech.id}>
                  <td>
                    <img
                      src={`http://localhost/gearsphere_api/GearSphere-BackEnd/profile_images/${tech.profile_image}`}
                      alt="Profile"
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/default-profile.png';
                      }}
                    />
                  </td>
                  <td>{tech.name}</td>
                  <td>{tech.email}</td>
                  <td>{tech.phone}</td>
                  <td>{tech.district}</td>
                  <td>
                    <Badge bg={tech.status === 'active' ? 'success' : 'danger'}>
                      {tech.status}
                    </Badge>
                  </td>
                  <td>{tech.joinDate}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setSelectedUser(tech);
                        setIsDisabled(tech.status === 'disabled');
                        setShowDetailsModal(true);
                      }}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {/* User Details Modal */}
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Technician Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                  src={`http://localhost/gearsphere_api/GearSphere-BackEnd/profile_images/${selectedUser.profile_image}`}
                  alt="Profile"
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    marginBottom: '15px',
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-profile.png';
                  }}
                />
              </div>
              <h5 className="mb-3 text-center">{selectedUser.name}</h5>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              {selectedUser.district && <p><strong>District:</strong> {selectedUser.district}</p>}
              {selectedUser.status && <p><strong>Status:</strong> {selectedUser.status}</p>}
              {selectedUser.joinDate && <p><strong>Join Date:</strong> {selectedUser.joinDate}</p>}
              {selectedUser.chargePerDay && <p><strong>Charge Per Day:</strong> Rs. {selectedUser.chargePerDay}</p>}
              {selectedUser.specialization && <p><strong>Specialization:</strong> {selectedUser.specialization}</p>}
              {selectedUser.experience && <p><strong>Experience:</strong> {selectedUser.experience} years</p>}
              {selectedUser.proof && (
                <a
                  href={`http://localhost/gearsphere_api/GearSphere-BackEnd/verifypdfs/${selectedUser.proof}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary mt-2"
                >
                  View Proof PDF
                </a>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: isDisabled ? '#e53935' : '#00008B', border: 'none', minWidth: 170 }}
            className="me-3"
            onClick={handleDisableUser}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : isDisabled ? 'Disabled' : 'Disable User'}
          </Button>
          <Button variant="secondary" className="ms-auto" onClick={handleCloseDetailsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TechnicianManagement; 