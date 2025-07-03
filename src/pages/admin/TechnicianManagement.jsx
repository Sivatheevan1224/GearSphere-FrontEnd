import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal } from 'react-bootstrap';
import { Tools, PersonCheck, PersonX, ShieldCheck } from 'react-bootstrap-icons';
import styles from './TechnicianManagement.module.css';
import { FaFilePdf } from 'react-icons/fa';

function TechnicianManagement() {
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [disableBtnDisabled, setDisableBtnDisabled] = useState(false);
  const [disableBtnClicked, setDisableBtnClicked] = useState(false);

  // Sample data - replace with actual API data
  const [technicians, setTechnicians] = useState([
    {
      id: 1,
      name: 'Nimal Fernando',
      email: 'nimal@email.com',
      phone: '+94 75 345 6789',
      district: 'Kandy',
      specialization: 'PC Repair',
      status: 'verified',
      joinDate: '2024-01-20',
      rating: 4.8,
      completedJobs: 25,
      profile:'http://localhost/gearsphere_api/GearSphere-BackEnd/profile_images/user_image.jpg',
      cv: 'http://localhost/gearsphere_api/GearSphere-BackEnd/verifypdfs/6863fae8ce7a4_CST 112-2 Calculus Mid 2023.pdf'
    },
    {
      id: 2,
      name: 'Sunil Rajapakse',
      email: 'sunil@email.com',
      phone: '+94 74 456 7890',
      district: 'Matara',
      specialization: 'Laptop Repair',
      status: 'pending',
      joinDate: '2024-03-01',
      rating: 0,
      completedJobs: 0,
      profile:'http://localhost/gearsphere_api/GearSphere-BackEnd/profile_images/user_image.jpg',
      cv: '/verifypdfs/sample_cv2.pdf'
    }
  ]);

  const handleVerifyTechnician = (technicianId) => {
    setTechnicians(prevTechs => prevTechs.map(tech =>
      tech.id === technicianId ? { ...tech, status: 'verified' } : tech
    ));
    setShowVerifyModal(false);
  };

  const handleBlockUser = (userId) => {
    setTechnicians(prev => prev.map(t => {
      if (t.id !== userId) return t;
      // If currently verified, block; if blocked, restore to verified; if pending, block; if blocked from pending, restore to pending
      if (t.status === 'verified') return { ...t, status: 'blocked' };
      if (t.status === 'blocked') return { ...t, status: t.rating > 0 || t.completedJobs > 0 ? 'verified' : 'pending' };
      if (t.status === 'pending') return { ...t, status: 'blocked' };
      return t;
    }));
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setDisableBtnClicked(false);
  };

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
                <th>Specialization</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Jobs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map(technician => (
                <tr key={technician.id}>
                  <td>
                    <img
                      src={`http://localhost/gearsphere_api/GearSphere-BackEnd/profile_images/${technician.profile}`}
                      alt="Profile"
                      style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                  </td>
                  <td>{technician.name}</td>
                  <td>{technician.email}</td>
                  <td>{technician.phone}</td>
                  <td>{technician.district}</td>
                  <td>{technician.specialization}</td>
                  <td>
                    <Badge bg={
                      technician.status === 'verified' ? 'success' :
                      technician.status === 'pending' ? 'warning' :
                      technician.status === 'blocked' ? 'danger' : 'secondary'
                    }>
                      {technician.status}
                    </Badge>
                  </td>
                  <td>{technician.rating || 'N/A'}</td>
                  <td>{technician.completedJobs}</td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="me-2"
                      onClick={() => {
                        setSelectedUser(technician);
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
      {/* Verify Technician Modal */}
      <Modal show={showVerifyModal} onHide={() => setShowVerifyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Technician</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p>Are you sure you want to verify this technician?</p>

              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>District:</strong> {selectedUser.district}</p>
              <p><strong>Specialization:</strong> {selectedUser.specialization}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowVerifyModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={() => handleVerifyTechnician(selectedUser?.id)}
          >
            <ShieldCheck className="me-2" />
            Verify Technician
          </Button>
        </Modal.Footer>
      </Modal>
      {/* User Details Modal */}
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Technician Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalDetailsBody}>
          {selectedUser && (
            <>
              <div className={styles.detailSection}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img
                    src={`http://localhost/gearsphere_api/GearSphere-BackEnd/profile_images/${selectedUser.profile}`}
                    alt="Profile"
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', marginBottom: '15px' }}
                  />
                </div>
                <div className={styles.detailLabel}>Name</div>
                <div className={styles.detailValue}>{selectedUser.name}</div>
                <div className={styles.detailLabel}>Email</div>
                <div className={styles.detailValue}>{selectedUser.email}</div>
                <div className={styles.detailLabel}>Phone</div>
                <div className={styles.detailValue}>{selectedUser.phone}</div>
                <div className={styles.detailLabel}>District</div>
                <div className={styles.detailValue}>{selectedUser.district}</div>
                <div className={styles.detailLabel}>Specialization</div>
                <div className={styles.detailValue}>{selectedUser.specialization}</div>
                <div className={styles.detailLabel}>Join Date</div>
                <div className={styles.detailValue}>{selectedUser.joinDate}</div>
                <div className={styles.detailLabel}>Rating</div>
                <div className={styles.detailValue}>{selectedUser.rating}</div>
                <div className={styles.detailLabel}>Completed Jobs</div>
                <div className={styles.detailValue}>{selectedUser.completedJobs}</div>
              </div>
              <div className={styles.divider}></div>
              {selectedUser.cv && (
                <a
                  href={selectedUser.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.cvButton}
                >
                  <FaFilePdf style={{ marginRight: 8, fontSize: 18 }} />
                  View Proof PDF (CV)
                </a>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: disableBtnClicked ? '#e53935' : '#00008B', border: 'none', minWidth: 170 }}
            className="me-3"
            onClick={() => setDisableBtnClicked(!disableBtnClicked)}
          >
            {disableBtnClicked ? 'Disabled' : 'Disable User'}
          </Button>
          <Button
            variant="danger"
            style={{ minWidth: 170 }}
            className="ms-auto"
            onClick={handleCloseDetailsModal}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TechnicianManagement; 