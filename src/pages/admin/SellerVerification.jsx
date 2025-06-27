import React from 'react';
import { Container, Card, Button, Table } from 'react-bootstrap';

function SellerVerification() {
  // Only one seller for the website
  const seller = {
    name: 'Main Seller',
    email: 'seller@gmail.com',
    joinDate: 'Jan 1, 2024',
    status: 'Active',
    username: '@seller',
    avatar: '/placeholder.svg?height=40&width=40',
    business: 'Tech Solutions Inc.',
    address: '123 Tech Street, New York, NY',
    phone: '+1 234-567-8900',
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
                  <span className="badge bg-success">{seller.status}</span>
                </td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-2">
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm">
                    Suspend
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