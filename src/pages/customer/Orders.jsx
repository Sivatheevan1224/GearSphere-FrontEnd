import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Modal } from 'react-bootstrap';

const Orders = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock data - replace with actual API call
  const orders = [
    {
      id: 'ORD001',
      date: '2024-03-15',
      status: 'Delivered',
      total: 1299.99,
      items: [
        { name: 'Intel Core i7-12700K', quantity: 1, price: 349.99 },
        { name: 'NVIDIA RTX 4070', quantity: 1, price: 599.99 },
        { name: 'Corsair 32GB RAM', quantity: 1, price: 149.99 },
        { name: 'Samsung 1TB SSD', quantity: 1, price: 199.99 }
      ],
      shippingAddress: '123 Main St, New York, NY 10001',
      trackingNumber: 'TRK123456789'
    },
    // Add more mock orders here
  ];

  const getStatusBadge = (status) => {
    const variants = {
      'Pending': 'warning',
      'Processing': 'info',
      'Shipped': 'primary',
      'Delivered': 'success',
      'Cancelled': 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">My Orders</h1>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleViewDetails(order)}
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

      {/* Order Details Modal */}
      <Modal
        show={showOrderDetails}
        onHide={() => setShowOrderDetails(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <Row className="mb-4">
                <Col md={6}>
                  <h5>Order Information</h5>
                  <p className="mb-1"><strong>Order ID:</strong> {selectedOrder.id}</p>
                  <p className="mb-1"><strong>Date:</strong> {selectedOrder.date}</p>
                  <p className="mb-1"><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</p>
                  <p className="mb-1"><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
                </Col>
                <Col md={6}>
                  <h5>Shipping Information</h5>
                  <p className="mb-1"><strong>Address:</strong> {selectedOrder.shippingAddress}</p>
                  <p className="mb-1"><strong>Tracking Number:</strong> {selectedOrder.trackingNumber}</p>
                </Col>
              </Row>

              <h5>Order Items</h5>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                    <td><strong>${selectedOrder.total.toFixed(2)}</strong></td>
                  </tr>
                </tfoot>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOrderDetails(false)}>
            Close
          </Button>
          {selectedOrder?.status === 'Delivered' && (
            <Button variant="primary">
              Leave Review
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Orders; 