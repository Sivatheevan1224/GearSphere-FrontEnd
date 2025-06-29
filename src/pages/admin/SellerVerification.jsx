import React, { useState } from 'react';
import { Container, Card, Button, Table } from 'react-bootstrap';

function SellerVerification() {
  // Only one seller for the website
  const [seller, setSeller] = useState({
    name: 'Main Seller',
    email: 'seller@gmail.com',
    joinDate: 'Jan 1, 2024',
    status: 'Active',
    username: '@seller',
    avatar: '/placeholder.svg?height=40&width=40',
    business: 'Tech Solutions Inc.',
    address: '123 Galle Road, Colombo, Western',
    phone: '077 123 4567',
  });

  const handleSuspend = () => {
    setSeller(prev => ({
      ...prev,
      status: prev.status === 'Active' ? 'Suspended' : 'Active'
    }));
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Seller Management</h1>
      <Card>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Seller</th>
                <th>Email</th>
                <th>Business</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={seller.avatar}
                      alt="Seller"
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                    />
                    <div>
                      <div>{seller.name}</div>
                      <small className="text-muted">{seller.username}</small>
                    </div>
                  </div>
                </td>
                <td>{seller.email}</td>
                <td>{seller.business}</td>
                <td>{seller.address}</td>
                <td>{seller.phone}</td>
                <td>{seller.joinDate}</td>
                <td>
                  <span className={`badge ${seller.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>{seller.status}</span>
                </td>
                <td>
                  <Button 
                    variant={seller.status === 'Active' ? 'outline-danger' : 'outline-success'} 
                    size="sm"
                    onClick={handleSuspend}
                  >
                    {seller.status === 'Active' ? 'Suspend' : 'Activate'}
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SellerVerification; 