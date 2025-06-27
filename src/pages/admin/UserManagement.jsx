import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import { People, Tools, PersonPlus, PersonCheck, PersonX, ShieldCheck } from 'react-bootstrap-icons';

function UserManagement() {
  const [activeTab, setActiveTab] = useState('customers');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Sample data - replace with actual API data
  const customers = [
    {
      id: 1,
      name: 'John Silva',
      email: 'john@email.com',
      phone: '+94 77 123 4567',
      district: 'Colombo',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2024-03-10'
    },
    {
      id: 2,
      name: 'Kamal Perera',
      email: 'kamal@email.com',
      phone: '+94 76 234 5678',
      district: 'Gampaha',
      status: 'active',
      joinDate: '2024-02-01',
      lastLogin: '2024-03-09'
    }
  ];

  const technicians = [
    {
      id: 1,
      name: 'Nimal Fernando',
      email: 'nimal@email.com',
      phone: '+94 75 345 6789',
      district: 'Kandy',
      specialization: 'PC Repair',
      status: 'verified',
      joinDate: '2024-01-20',
      lastLogin: '2024-03-10',
      rating: 4.8,
      completedJobs: 25
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
      lastLogin: '2024-03-08',
      rating: 0,
      completedJobs: 0
    }
  ];

  const handleAddTechnician = (userData) => {
    // TODO: Implement technician addition
    console.log('Adding technician:', userData);
    setShowAddModal(false);
  };

  const handleVerifyTechnician = (technicianId) => {
    // TODO: Implement technician verification
    console.log('Verifying technician:', technicianId);
    setShowVerifyModal(false);
  };

  const handleBlockUser = (userId, userType) => {
    // TODO: Implement user blocking
    console.log('Blocking user:', userId, userType);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">User Management</h1>

      {/* Quick Stats */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <People size={40} className="text-primary me-3" />
                <div>
                  <h3>{customers.length}</h3>
                  <p className="text-muted mb-0">Total Customers</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
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

      {/* Tabs */}
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex">
              <Button
                variant={activeTab === 'customers' ? 'primary' : 'outline-primary'}
                className="me-2"
                onClick={() => setActiveTab('customers')}
              >
                <People className="me-2" />
                Customers
              </Button>
              <Button
                variant={activeTab === 'technicians' ? 'primary' : 'outline-primary'}
                onClick={() => setActiveTab('technicians')}
              >
                <Tools className="me-2" />
                Technicians
              </Button>
            </div>
            {activeTab === 'technicians' && (
              <Button
                variant="success"
                onClick={() => setShowAddModal(true)}
              >
                <PersonPlus className="me-2" />
                Add Technician
              </Button>
            )}
          </div>

          {/* Customers Table */}
          {activeTab === 'customers' && (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>District</th>
                  <th>Status</th>
                  <th>Join Date</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.district}</td>
                    <td>
                      <Badge bg={customer.status === 'active' ? 'success' : 'danger'}>
                        {customer.status}
                      </Badge>
                    </td>
                    <td>{customer.joinDate}</td>
                    <td>{customer.lastLogin}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleBlockUser(customer.id, 'customer')}
                      >
                        {customer.status === 'active' ? 'Block' : 'Unblock'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* Technicians Table */}
          {activeTab === 'technicians' && (
            <Table responsive hover>
              <thead>
                <tr>
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
                    <td>{technician.name}</td>
                    <td>{technician.email}</td>
                    <td>{technician.phone}</td>
                    <td>{technician.district}</td>
                    <td>{technician.specialization}</td>
                    <td>
                      <Badge bg={
                        technician.status === 'verified' ? 'success' :
                        technician.status === 'pending' ? 'warning' : 'danger'
                      }>
                        {technician.status}
                      </Badge>
                    </td>
                    <td>{technician.rating || 'N/A'}</td>
                    <td>{technician.completedJobs}</td>
                    <td>
                      {technician.status === 'pending' ? (
                        <>
                          <Button 
                            variant="outline-success" 
                            size="sm" 
                            className="me-2"
                            onClick={() => {
                              setSelectedUser(technician);
                              setShowVerifyModal(true);
                            }}
                          >
                            <PersonCheck className="me-1" />
                            Verify
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleBlockUser(technician.id, 'technician')}
                          >
                            <PersonX className="me-1" />
                            Reject
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-2"
                          >
                            View Details
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleBlockUser(technician.id, 'technician')}
                          >
                            {technician.status === 'verified' ? 'Block' : 'Unblock'}
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Add Technician Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Technician</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" placeholder="Enter phone number" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>District</Form.Label>
              <Form.Select required>
                <option value="">Select District</option>
                <option value="Colombo">Colombo</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Kandy">Kandy</option>
                <option value="Matale">Matale</option>
                <option value="Nuwara Eliya">Nuwara Eliya</option>
                <option value="Galle">Galle</option>
                <option value="Matara">Matara</option>
                <option value="Hambantota">Hambantota</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Kilinochchi">Kilinochchi</option>
                <option value="Mannar">Mannar</option>
                <option value="Vavuniya">Vavuniya</option>
                <option value="Mullaitivu">Mullaitivu</option>
                <option value="Batticaloa">Batticaloa</option>
                <option value="Ampara">Ampara</option>
                <option value="Trincomalee">Trincomalee</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Puttalam">Puttalam</option>
                <option value="Anuradhapura">Anuradhapura</option>
                <option value="Polonnaruwa">Polonnaruwa</option>
                <option value="Badulla">Badulla</option>
                <option value="Monaragala">Monaragala</option>
                <option value="Ratnapura">Ratnapura</option>
                <option value="Kegalle">Kegalle</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control type="text" placeholder="Enter specialization" required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddTechnician}>
            Add Technician
          </Button>
        </Modal.Footer>
      </Modal>

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
    </Container>
  );
}

export default UserManagement; 