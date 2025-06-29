import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Modal } from 'react-bootstrap';
import { OrdersContext } from './OrdersContext';

const Orders = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orders } = useContext(OrdersContext);

  const formatLKR = (amount) => 'LKR ' + Number(amount).toLocaleString('en-LK');

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

      {orders.length === 0 ? (
        <Card className="shadow-sm">
          <Card.Body className="text-center py-5">
            <h4 className="text-muted mb-3">No Orders Yet</h4>
            <p className="text-muted">You haven't placed any orders yet.</p>
            <Button variant="primary" href="/marketplace">
              Browse Products
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Payment Method</th>
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
                    <td>
                      <Badge bg="success">{order.paymentMethod}</Badge>
                    </td>
                    <td>{formatLKR(order.total)}</td>
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
      )}

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
                  <p className="mb-1"><strong>Payment Method:</strong> <Badge bg="success">{selectedOrder.paymentMethod}</Badge></p>
                  <p className="mb-1"><strong>Payment Status:</strong> <Badge bg="success">{selectedOrder.paymentStatus}</Badge></p>
                  <p className="mb-1"><strong>Total:</strong> {formatLKR(selectedOrder.total)}</p>
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
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.quantity}</td>
                      <td>{formatLKR(item.price)}</td>
                      <td>{formatLKR(item.quantity * item.price)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" className="text-end"><strong>Total:</strong></td>
                    <td><strong>{formatLKR(selectedOrder.total)}</strong></td>
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