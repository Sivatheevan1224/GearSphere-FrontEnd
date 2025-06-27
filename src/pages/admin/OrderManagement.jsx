import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Modal, Pagination } from 'react-bootstrap';

const OrderManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const ordersPerPage = 10;

  // Mock data - replace with actual API calls
  const orders = [
    {
      id: 'ORD001',
      type: 'PC Build',
      customer: {
        id: 'C001',
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+1 (555) 123-4567'
      },
      technician: {
        id: 'T001',
        name: 'Mike Brown'
      },
      status: 'In Progress',
      date: '2024-03-15',
      total: 2500,
      items: [
        { name: 'Custom PC Build', quantity: 1, price: 2500 }
      ],
      notes: 'High-end gaming PC with RGB lighting'
    },
    {
      id: 'ORD002',
      type: 'Parts',
      customer: {
        id: 'C002',
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '+1 (555) 234-5678'
      },
      status: 'Delivered',
      date: '2024-03-14',
      total: 800,
      items: [
        { name: 'RTX 4070', quantity: 1, price: 600 },
        { name: '32GB DDR5 RAM', quantity: 1, price: 200 }
      ],
      tracking: 'TRK123456789'
    },
    {
      id: 'ORD003',
      type: 'Service',
      customer: {
        id: 'C003',
        name: 'David Wilson',
        email: 'david.w@example.com',
        phone: '+1 (555) 345-6789'
      },
      technician: {
        id: 'T002',
        name: 'Emily Davis'
      },
      status: 'Scheduled',
      date: '2024-03-20',
      total: 150,
      items: [
        { name: 'Laptop Repair Service', quantity: 1, price: 150 }
      ],
      notes: 'Screen replacement and thermal paste application'
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      'Pending': 'warning',
      'Confirmed': 'info',
      'In Progress': 'primary',
      'Scheduled': 'info',
      'Shipped': 'primary',
      'Delivered': 'success',
      'Cancelled': 'danger',
      'Refunded': 'secondary'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const getTypeBadge = (type) => {
    const variants = {
      'PC Build': 'primary',
      'Parts': 'success',
      'Service': 'info'
    };
    return <Badge bg={variants[type] || 'secondary'}>{type}</Badge>;
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleStatusChange = (orderId, newStatus) => {
    // TODO: Implement status update logic
    console.log('Updating status for order:', orderId, 'to:', newStatus);
  };

  const filteredOrders = orders.filter(order =>
    (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (statusFilter === 'all' || order.status === statusFilter) &&
    (typeFilter === 'all' || order.type === typeFilter)
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Order Management</h1>

      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex gap-2">
              <Form.Select
                style={{ width: '200px' }}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="PC Build">PC Builds</option>
                <option value="Parts">Parts</option>
                <option value="Service">Services</option>
              </Form.Select>
              <Form.Select
                style={{ width: '200px' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="In Progress">In Progress</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Refunded">Refunded</option>
              </Form.Select>
            </div>
            <Form.Control
              type="search"
              placeholder="Search orders..."
              style={{ width: '300px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Table responsive hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Type</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{getTypeBadge(order.type)}</td>
                  <td>
                    <div>{order.customer.name}</div>
                    <small className="text-muted">{order.customer.email}</small>
                  </td>
                  <td>{order.date}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>${order.total}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </Button>
                    <Form.Select
                      size="sm"
                      style={{ width: 'auto', display: 'inline-block' }}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Refunded">Refunded</option>
                    </Form.Select>
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
      <Modal
        show={showDetailsModal}
        onHide={() => setShowDetailsModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <Row>
              <Col md={6}>
                <h5>Order Information</h5>
                <p className="mb-1"><strong>Order ID:</strong> {selectedOrder.id}</p>
                <p className="mb-1"><strong>Type:</strong> {getTypeBadge(selectedOrder.type)}</p>
                <p className="mb-1"><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</p>
                <p className="mb-1"><strong>Date:</strong> {selectedOrder.date}</p>
                <p className="mb-1"><strong>Total:</strong> ${selectedOrder.total}</p>
                {selectedOrder.tracking && (
                  <p className="mb-1"><strong>Tracking:</strong> {selectedOrder.tracking}</p>
                )}
              </Col>
              <Col md={6}>
                <h5>Customer Information</h5>
                <p className="mb-1"><strong>Name:</strong> {selectedOrder.customer.name}</p>
                <p className="mb-1"><strong>Email:</strong> {selectedOrder.customer.email}</p>
                <p className="mb-1"><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                {selectedOrder.technician && (
                  <>
                    <h5 className="mt-3">Technician Information</h5>
                    <p className="mb-1"><strong>Name:</strong> {selectedOrder.technician.name}</p>
                    <p className="mb-1"><strong>ID:</strong> {selectedOrder.technician.id}</p>
                  </>
                )}
              </Col>
              <Col md={12}>
                <h5 className="mt-3">Order Items</h5>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                        <td>${item.quantity * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {selectedOrder.notes && (
                  <div className="mt-3">
                    <h5>Notes</h5>
                    <p className="mb-0">{selectedOrder.notes}</p>
                  </div>
                )}
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
          <Button variant="primary">
            Update Status
          </Button>
          {selectedOrder?.status !== 'Delivered' && selectedOrder?.status !== 'Cancelled' && (
            <Button variant="danger">
              Cancel Order
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrderManagement; 