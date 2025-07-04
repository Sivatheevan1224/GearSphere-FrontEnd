import React from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Accordion } from 'react-bootstrap';
import { Envelope, Telephone, GeoAlt } from 'react-bootstrap-icons';
import { Shop, Box, CurrencyDollar, Star, People, ArrowUp } from 'react-bootstrap-icons';
import pcGif from '../../images/pc_video1.gif';
import logo from '../../images/logo.PNG';
import pcpic2 from '../../images/pcpic2.jpeg';

function SellerDashboard() {
  const formatLKR = (amount) => 'LKR ' + Number(amount).toLocaleString('en-LK');

  return (
    <>
      {/* Hero Section */}
      <section className="py-0 bg-black text-white position-relative overflow-hidden mb-5" style={{borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: '2rem', borderBottomRightRadius: '2rem', boxShadow: '0 4px 32px rgba(0,0,0,0.10)', marginTop: 0, marginBottom: 0, position: 'relative', paddingTop: 0}}>
        {/* Sharp background image (no blur) */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${pcpic2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            opacity: 0.7
          }}
        ></div>
        {/* Overlay for darkening and contrast */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "radial-gradient(circle at 30% 50%, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 70%)",
            zIndex: 1,
          }}
        ></div>
        <Container className="py-0 position-relative" style={{ zIndex: 2 }}>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-3 fw-bold mb-4">
                Welcome to Your Dashboard, <span className="text-primary">GearSphere Seller</span>
              </h1>
              <p className="lead mb-5">
                Manage your products, orders, revenue, and more. Grow your business with GearSphere!
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Existing Dashboard Content */}
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
      {/* Contact Section */}
      <section className="py-0 bg-white" style={{borderRadius: '2rem', boxShadow: '0 4px 32px rgba(0,0,0,0.10)', marginTop: '2rem', marginBottom: 0}}>
        <Container>
          <h1 className="text-center mb-5">Contact Us</h1>
          <Row className="mb-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="mb-4">Get In Touch</h2>
              <p className="mb-4">
                Have questions about your products or need support? Fill out the form and our team will get back to you as soon as possible.
              </p>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter first name" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter last name" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="07X XXX XXXX" pattern="0[0-9]{2} [0-9]{3} [0-9]{4}" title="Enter a valid Sri Lankan phone number (e.g., 077 123 4567)" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Select>
                    <option>Select a subject</option>
                    <option>Product Inquiry</option>
                    <option>Technical Support</option>
                    <option>Account Issues</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Enter your message" />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Send Message
                </Button>
              </Form>
            </Col>
            <Col lg={6}>
              <Row className="mb-4">
                <Col md={12}>
                  <Card className="border-0 shadow-sm">
                    <Card.Body>
                      <h3 className="mb-4">Contact Information</h3>
                      <div className="d-flex mb-3">
                        <div className="me-3">
                          <Envelope size={24} className="text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-1">Email</h5>
                          <p className="mb-0">info@gearsphere.com</p>
                          <p className="mb-0">support@gearsphere.com</p>
                        </div>
                      </div>
                      <div className="d-flex mb-3">
                        <div className="me-3">
                          <Telephone size={24} className="text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-1">Phone</h5>
                          <p className="mb-0">+1 (555) 123-4567</p>
                          <p className="mb-0">+1 (555) 987-6543</p>
                        </div>
                      </div>
                      <div className="d-flex mb-3">
                        <div className="me-3">
                          <GeoAlt size={24} className="text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-1">Address</h5>
                          <p className="mb-0">Street Address, City (e.g., Colombo)</p>
                        </div>
                      </div>
                      {/* Logo at bottom */}
                      <div className="d-flex justify-content-center mt-4">
                        <img src={logo} alt="GearSphere Logo" style={{height: 60, width: 'auto', background: '#fff', padding: 4, borderRadius: 8}} />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default SellerDashboard; 