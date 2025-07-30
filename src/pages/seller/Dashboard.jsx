import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Accordion,
} from "react-bootstrap";
import { Envelope, Telephone, GeoAlt } from "react-bootstrap-icons";
import {
  Shop,
  Box,
  CashStack,
  Star,
  People,
  ArrowUp,
} from "react-bootstrap-icons";
import pcGif from "../../images/pc_video1.gif";
import logo from "../../images/logo.PNG";
import pcpic2 from "../../images/pcpic2.jpeg";
import LoadingScreen from "../../components/loading/LoadingScreen";

function SellerDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const formatLKR = (amount) => "LKR " + Number(amount).toLocaleString("en-LK");

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost/gearsphere_api/GearSphere-BackEnd/getProducts.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products)) {
          setProductCount(data.products.length);
          // Sort by price descending and take top 3
          const sorted = [...data.products].sort(
            (a, b) => Number(b.price) - Number(a.price)
          );
          setTopProducts(sorted.slice(0, 3));
        } else {
          setProductCount(0);
          setTopProducts([]);
        }
      })
      .catch(() => {
        setProductCount(0);
        setTopProducts([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Show loading screen while data is being fetched
  if (isLoading) {
    return (
      <LoadingScreen
        message="Loading Seller Dashboard"
        subMessage="Fetching your seller analytics"
      />
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="py-0 bg-black text-white position-relative overflow-hidden mb-5"
        style={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: "2rem",
          borderBottomRightRadius: "2rem",
          boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
          marginTop: 0,
          marginBottom: 0,
          position: "relative",
          paddingTop: 0,
        }}
      >
        {/* Sharp background image (no blur) */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${pcpic2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
            opacity: 0.7,
          }}
        ></div>
        {/* Overlay for darkening and contrast */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 70%)",
            zIndex: 1,
          }}
        ></div>
        <Container className="py-0 position-relative" style={{ zIndex: 2 }}>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1
                className="display-3 fw-bold mb-4 rise-up"
                style={{ animationDelay: "0s" }}
              >
                Welcome to Your Dashboard,{" "}
                <span className="text-primary">GearSphere Seller</span>
              </h1>
              <p
                className="lead mb-5 rise-up"
                style={{ animationDelay: "0.3s" }}
              >
                Manage your products, orders, revenue, and more. Grow your
                business with GearSphere!
              </p>
              <div
                className="d-flex gap-3 rise-up"
                style={{ animationDelay: "0.6s" }}
              >
                {/* Add dashboard-specific buttons here if needed */}
              </div>
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
                <h3>{productCount}</h3>
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
                <CashStack size={24} className="mb-3 text-warning" />
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
                  <Button variant="outline-primary" size="sm">
                    View All
                  </Button>
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
                          <td>#ORD{item.toString().padStart(6, "0")}</td>
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
                {topProducts.length === 0 ? (
                  <div className="text-center text-muted">
                    No products found.
                  </div>
                ) : (
                  topProducts.map((product, idx) => (
                    <div
                      key={product.product_id || idx}
                      className={`mb-3 pb-3${
                        idx < topProducts.length - 1 ? " border-bottom" : ""
                      }`}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={
                            product.image_url
                              ? `http://localhost/gearsphere_api/GearSphere-BackEnd/${product.image_url}`
                              : "/placeholder.svg?height=40&width=40"
                          }
                          alt={product.name}
                          className="rounded me-2"
                          width="40"
                          height="40"
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-0">{product.name}</h6>
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
                          <h6 className="mb-0">{formatLKR(product.price)}</h6>
                          <small className="text-muted">N/A sales</small>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
                    <p className="mb-0">
                      Great product! Exactly what I was looking for.
                    </p>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SellerDashboard;
