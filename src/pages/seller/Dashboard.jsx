import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Shop, Box, CurrencyDollar, Star, People, ArrowUp } from 'react-bootstrap-icons';

function SellerDashboard() {
  const formatLKR = (amount) => 'LKR ' + Number(amount).toLocaleString('en-LK');

  return (
    <Container className="py-5">
      <h1 className="mb-4">Seller Dashboard</h1>
      
      {/* Stats */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Shop size={24} className="mb-3 text-primary" />
              <h3>156</h3>
              <p className="text-muted mb-0">Total Products</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Box size={24} className="mb-3 text-success" />
              <h3>89</h3>
              <p className="text-muted mb-0">Orders This Month</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <CurrencyDollar size={24} className="mb-3 text-warning" />
              <h3>{formatLKR(12450)}</h3>
              <p className="text-muted mb-0">Revenue This Month</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Star size={24} className="mb-3 text-info" />
              <h3>4.7</h3>
              <p className="text-muted mb-0">Average Rating</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders */}
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Recent Orders</h4>
                <Button variant="outline-primary" size="sm">View All</Button>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Products</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((item) => (
                      <tr key={item}>
                        <td>#ORD{item.toString().padStart(6, '0')}</td>
                        <td>John Doe</td>
                        <td>{item} items</td>
                        <td>{formatLKR(item * 50)}</td>
                        <td>
                          <span className="badge bg-success">Delivered</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-4">Top Products</h4>
              {[1, 2, 3].map((item) => (
                <div key={item} className="mb-3 pb-3 border-bottom">
                  <div className="d-flex align-items-center">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="Product"
                      className="rounded me-2"
                      width="40"
                      height="40"
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-0">Product Name</h6>
                      <div className="d-flex align-items-center">
                        <Star className="text-warning me-1" size={14} />
                        <span>4.8</span>
                        <span className="ms-2 text-success">
                          <ArrowUp size={14} />
                          +12%
                        </span>
                      </div>
                    </div>
                    <div className="text-end">
                      <h6 className="mb-0">{formatLKR(item * 50)}</h6>
                      <small className="text-muted">{item * 10} sales</small>
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h4 className="mb-4">Recent Reviews</h4>
              {[1, 2, 3].map((item) => (
                <div key={item} className="mb-3 pb-3 border-bottom">
                  <div className="d-flex align-items-center mb-2">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt="User"
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                    />
                    <div>
                      <h6 className="mb-0">John Doe</h6>
                      <div className="d-flex align-items-center">
                        <Star className="text-warning me-1" size={14} />
                        <span>5.0</span>
                      </div>
                    </div>
                  </div>
                  <p className="mb-0">Great product! Exactly what I was looking for.</p>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SellerDashboard; 