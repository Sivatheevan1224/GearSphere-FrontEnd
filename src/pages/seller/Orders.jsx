import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, Pagination, InputGroup } from 'react-bootstrap';
import { Search, Box, CheckCircle, XCircle, Truck } from 'react-bootstrap-icons';

const SellerOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const ordersPerPage = 10;
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234-567-8901'
      },
      date: '2024-02-15',
      total: 1299.99,
      status: 'In Process',
      items: [
        {
          id: 'P001',
          name: 'RTX 4070',
          quantity: 1,
          price: 599.99
        },
        {
          id: 'P002',
          name: '32GB DDR5 RAM',
          quantity: 2,
          price: 349.99
        }
      ],
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA'
      },
      paymentMethod: 'Credit Card',
      trackingNumber: 'TRK123456789',
      notes: 'Handle with care'
    },
    {
      id: 'ORD002',
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 234-567-8902'
      },
      date: '2024-02-14',
      total: 799.99,
      status: 'Ready to Deliver',
      items: [
        {
          id: 'P003',
          name: '1TB NVMe SSD',
          quantity: 2,
          price: 399.99
        }
      ],
      shippingAddress: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90001',
        country: 'USA'
      },
      paymentMethod: 'PayPal',
      trackingNumber: 'TRK987654321',
      notes: 'Express shipping'
    }
  ]);
  const [updateStatus, setUpdateStatus] = useState('');

  const getStatusBadge = (status) => {
    const variants = {
      'In Process': 'primary',
      'Ready to Deliver': 'info',
      'Delivered': 'success'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setShowUpdateModal(false);
  };

  const filteredOrders = orders.filter(order =>
    (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (statusFilter === 'all' || order.status === statusFilter) &&
    (dateFilter === 'all' || order.date === dateFilter)
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Order Management</h1>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted mb-2">Total Orders</h6>
              <h3>{orders.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted mb-2">Processing</h6>
              <h3>{orders.filter(order => order.status === 'Processing').length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted mb-2">Shipped</h6>
              <h3>{orders.filter(order => order.status === 'Shipped').length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted mb-2">Total Revenue</h6>
              <h3>${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex gap-2">
              <Form.Select
                style={{ width: '200px' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="In Process">In Process</option>
                <option value="Ready to Deliver">Ready to Deliver</option>
                <option value="Delivered">Delivered</option>
              </Form.Select>
              <Form.Control
                type="date"
                style={{ width: '200px' }}
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
            <Form.Control
              type="search"
              placeholder="Search by order ID, customer name, or email..."
              style={{ width: '300px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Table responsive hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    <div>{order.customer.name}</div>
                    <small className="text-muted">{order.customer.email}</small>
                  </td>
                  <td>{order.date}</td>
                  <td>${order.total}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowDetailsModal(true);
                      }}
                    >
                      Details
                    </Button>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => {
                        setSelectedOrder(order);
                        setUpdateStatus(order.status);
                        setShowUpdateModal(true);
                      }}
                    >
                      Update Status
                    </Button>
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

      {/* Order Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <Row className="mb-4">
                <Col md={6}>
                  <h5>Order Information</h5>
                  <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                  <p><strong>Date:</strong> {selectedOrder.date}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</p>
                  <p><strong>Total:</strong> ${selectedOrder.total}</p>
                  <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                  <p><strong>Tracking Number:</strong> {selectedOrder.trackingNumber}</p>
                </Col>
                <Col md={6}>
                  <h5>Customer Information</h5>
                  <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
                  <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                  <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                  <h5 className="mt-3">Shipping Address</h5>
                  <p>
                    {selectedOrder.shippingAddress.street}<br />
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}<br />
                    {selectedOrder.shippingAddress.country}
                  </p>
                </Col>
              </Row>
              <h5>Order Items</h5>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price}</td>
                      <td>${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {selectedOrder.notes && (
                <div className="mt-3">
                  <h5>Notes</h5>
                  <p>{selectedOrder.notes}</p>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Status Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Order ID</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedOrder.id}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Current Status</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedOrder.status}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>New Status</Form.Label>
                <Form.Select
                  value={updateStatus}
                  onChange={e => setUpdateStatus(e.target.value)}
                >
                  <option value="In Process">In Process</option>
                  <option value="Ready to Deliver">Ready to Deliver</option>
                  <option value="Delivered">Delivered</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tracking Number</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedOrder.trackingNumber}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  defaultValue={selectedOrder.notes}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handleUpdateStatus(selectedOrder?.id, updateStatus)}
          >
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SellerOrders; 