import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Person, Tools, Grid3x3Gap, Wrench, Shield } from 'react-bootstrap-icons';

function RoleSelectionModal({ show, onHide, selectedFunction, onRoleSelect }) {
  const roles = [
    {
      id: 'customer',
      name: 'Customer',
      icon: <Person size={24} />,
      description: 'Browse products, order PC builds, and find technicians'
    },
    {
      id: 'builder',
      name: 'PC Builder',
      icon: <Tools size={24} />,
      description: 'Offer PC building services and manage build requests'
    },
    {
      id: 'seller',
      name: 'Seller',
      icon: <Grid3x3Gap size={24} />,
      description: 'Sell PC components and manage inventory'
    },
    {
      id: 'technician',
      name: 'Technician',
      icon: <Wrench size={24} />,
      description: 'Provide technical services and manage appointments'
    },
    {
      id: 'admin',
      name: 'Admin',
      icon: <Shield size={24} />,
      description: 'Manage users, verify technicians, and monitor platform'
    }
  ];

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Your Role</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-4">Choose your role to access: <strong>{selectedFunction}</strong></p>
        <div className="role-options">
          {roles.map((role) => (
            <div 
              key={role.id}
              className="role-option p-3 mb-3 border rounded cursor-pointer"
              onClick={() => onRoleSelect(role.id)}
            >
              <div className="d-flex align-items-center">
                <div className="role-icon me-3">
                  {role.icon}
                </div>
                <div>
                  <h5 className="mb-1">{role.name}</h5>
                  <p className="mb-0 text-muted small">{role.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RoleSelectionModal; 