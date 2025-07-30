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
import { Link } from "react-router-dom";
import {
  Award,
  Star,
  StarFill,
  Cart,
  Person,
  Headset,
} from "react-bootstrap-icons";
import { Envelope, Telephone, GeoAlt } from "react-bootstrap-icons";
import pcGif from "../../images/pc_video1.gif";
import logo from "../../images/logo.PNG";
import pcpic2 from "../../images/pcpic2.jpeg";
import { toast } from "react-toastify";
import axios from "axios";

function CustomerDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    deliveredOrders: 0,
    pendingOrders: 0,
    reviews: 0,
    supportTickets: 0,
  });
  const [recentReviews, setRecentReviews] = useState([]);
  const [systemReviews, setSystemReviews] = useState([]);
  const [customerName, setCustomerName] = useState("Customer");
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch real data from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // First check if user is logged in and is a customer
        const sessionResponse = await axios.get(
          "http://localhost/gearsphere_api/GearSphere-BackEnd/getSession.php",
          { withCredentials: true }
        );

        if (!sessionResponse.data.success) {
          setError("Please log in to access the customer dashboard");
          toast.error("Please log in first");
          return;
        }

        const userType = sessionResponse.data.user_type?.toLowerCase();
        if (userType !== "customer") {
          //setError(`Access denied. This dashboard is for customers only. You are logged in as: ${sessionResponse.data.user_type}`);
          // toast.error("Customer access only");
          return;
        }

        // If user is a customer, proceed with fetching dashboard data
        const response = await axios.get(
          "http://localhost/gearsphere_api/GearSphere-BackEnd/getCustomerDashboard.php",
          { withCredentials: true }
        );

        if (response.data.success) {
          const { dashboard_data, customer_name } = response.data;
          setStats({
            totalOrders: dashboard_data.total_orders,
            deliveredOrders: dashboard_data.delivered_orders,
            pendingOrders: dashboard_data.pending_orders,
            reviews: dashboard_data.total_reviews,
            supportTickets: 1, // Keep mock data for now
          });
          setRecentReviews(dashboard_data.recent_reviews);
          setCustomerName(customer_name);
        } else {
          setError(response.data.message || "Failed to fetch dashboard data");
          toast.error("Failed to load dashboard data");
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        if (err.response?.status === 403) {
          setError(
            "Access denied. Please log in as a customer to access this dashboard."
          );
          toast.error("Customer access required");
        } else {
          setError("Failed to connect to server");
          toast.error("Failed to load dashboard data");
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchSystemReviews = async () => {
      try {
        setReviewsLoading(true);
        const response = await axios.get(
          "http://localhost/gearsphere_api/GearSphere-BackEnd/getSystemReviews.php"
        );

        if (response.data.success) {
          setSystemReviews(response.data.reviews);
        } else {
          console.error(
            "Failed to fetch system reviews:",
            response.data.message
          );
        }
      } catch (err) {
        console.error("System reviews fetch error:", err);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchDashboardData();
    fetchSystemReviews();
  }, []);

  // Contact form state
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted mb-2">{title}</h6>
            <h3 className="mb-0">{value}</h3>
          </div>
          <div className={`bg-${color} bg-opacity-10 p-3 rounded`}>
            <Icon size={24} className={`text-${color}`} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );

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
          marginTop: "-1px",
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
                <span className="text-primary">{customerName}</span>
              </h1>
              <p
                className="lead mb-5 rise-up"
                style={{ animationDelay: "0.3s" }}
              >
                Manage your orders, wishlist, reviews, and more. Enjoy your
                personalized PC experience!
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
        <h1 className="mb-4">Customer Dashboard</h1>

        <Row className="g-4 mb-4">
          <Col md={3}>
            <StatCard
              title="Total Orders"
              value={loading ? "..." : stats.totalOrders}
              icon={Cart}
              color="primary"
            />
          </Col>
          <Col md={3}>
            <StatCard
              title="Delivered Orders"
              value={loading ? "..." : stats.deliveredOrders}
              icon={Award}
              color="success"
            />
          </Col>
          <Col md={3}>
            <StatCard
              title="Pending Orders"
              value={loading ? "..." : stats.pendingOrders}
              icon={Cart}
              color="warning"
            />
          </Col>
          <Col md={3}>
            <StatCard
              title="Reviews Written"
              value={loading ? "..." : stats.reviews}
              icon={Star}
              color="info"
            />
          </Col>
        </Row>

        {/* System Reviews Section */}
        <Row className="mt-5">
          <Col>
            <h3 className="mb-4">Customer Reviews</h3>
            {reviewsLoading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading reviews...</span>
                </div>
              </div>
            ) : systemReviews.length > 0 ? (
              <Row className="g-4">
                {systemReviews.map((review) => (
                  <Col key={review.review_id} lg={3} md={6} sm={6} xs={12}>
                    <Card className="h-100 shadow-sm">
                      <Card.Body className="d-flex flex-column">
                        <div className="d-flex align-items-center mb-3">
                          <img
                            src={
                              review.profile_image
                                ? `http://localhost/gearsphere_api/GearSphere-BackEnd/profile_images/${review.profile_image}`
                                : "/profile_images/user_image.jpg"
                            }
                            alt={review.username}
                            className="rounded-circle me-3"
                            width="50"
                            height="50"
                            style={{ objectFit: "cover" }}
                          />
                          <div>
                            <h6 className="mb-1">{review.username}</h6>
                            <div className="d-flex align-items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`me-1 ${
                                    i < review.rating
                                      ? "text-warning"
                                      : "text-muted"
                                  }`}
                                  fill={
                                    i < review.rating ? "currentColor" : "none"
                                  }
                                  size={16}
                                />
                              ))}
                              <span className="ms-2 text-muted small">
                                ({review.rating}/5)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <p className="text-muted mb-2 small">
                            {new Date(review.created_at).toLocaleDateString()}
                          </p>
                          <p className="mb-0">{review.comment}</p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center text-muted">
                <p>No approved system reviews yet.</p>
              </div>
            )}
          </Col>
        </Row>

        {loading && (
          <Row className="mt-4">
            <Col className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading dashboard data...</p>
            </Col>
          </Row>
        )}

        {error && (
          <Row className="mt-4">
            <Col>
              <div
                className={`alert ${
                  error.includes("Access denied")
                    ? "alert-warning"
                    : "alert-danger"
                }`}
                role="alert"
              >
                <div className="d-flex align-items-start">
                  <i
                    className={`bi ${
                      error.includes("Access denied")
                        ? "bi-shield-exclamation"
                        : "bi-exclamation-triangle"
                    } me-2 mt-1`}
                  ></i>
                  <div>
                    <strong>
                      {error.includes("Access denied")
                        ? "Access Restricted"
                        : "Error"}
                    </strong>
                    <p className="mb-0 mt-1">{error}</p>
                    {error.includes("Access denied") && <hr className="my-2" />}
                    {error.includes("Access denied") && (
                      <small className="text-muted">
                        <i className="bi bi-info-circle me-1"></i>
                        To access the customer dashboard, please log out and log
                        in with a customer account.
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
      {/* Contact Section */}
      <section
        className="py-0 bg-white"
        style={{
          borderRadius: "2rem",
          boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
          marginTop: "2rem",
          marginBottom: 0,
        }}
      >
        <Container>
          <h1 className="text-center mb-5">Contact Us</h1>
          <Row className="mb-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="mb-4">Get In Touch</h2>
              <p className="mb-4">
                Have questions about your orders or need support? Fill out the
                form and our team will get back to you as soon as possible.
              </p>
              <Form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (
                    !contactFirstName ||
                    !contactLastName ||
                    !contactEmail ||
                    !contactSubject ||
                    !contactMessage
                  ) {
                    toast.error("Please fill in all fields.");
                    return;
                  }
                  setContactLoading(true);
                  try {
                    const res = await axios.post(
                      "http://localhost/gearsphere_api/GearSphere-BackEnd/addMessage.php",
                      {
                        name: contactFirstName + " " + contactLastName,
                        email: contactEmail,
                        subject: contactSubject,
                        message: contactMessage,
                      }
                    );
                    if (res.data.success) {
                      toast.success("Thanks for contacting admin!");
                      setContactFirstName("");
                      setContactLastName("");
                      setContactEmail("");
                      setContactSubject("");
                      setContactMessage("");
                    } else {
                      toast.error(
                        res.data.message || "Failed to send message."
                      );
                    }
                  } catch (err) {
                    toast.error("Failed to send message.");
                  }
                  setContactLoading(false);
                }}
              >
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter first name"
                        value={contactFirstName}
                        onChange={(e) => setContactFirstName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter last name"
                        value={contactLastName}
                        onChange={(e) => setContactLastName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Select
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                  >
                    <option value="">Select a subject</option>
                    <option>Order Inquiry</option>
                    <option>Technical Support</option>
                    <option>Account Issues</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter your message"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={contactLoading}
                >
                  {contactLoading ? "Sending..." : "Send Message"}
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
                          <p className="mb-0">+94 (76) 375 3730</p>
                          <p className="mb-0">+94 (70) 407 9547</p>
                        </div>
                      </div>
                      <div className="d-flex mb-3">
                        <div className="me-3">
                          <GeoAlt size={24} className="text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-1">Address</h5>
                          <p className="mb-0">
                            Pasara Road, Badulla City, 90 000
                          </p>
                        </div>
                      </div>
                      {/* Logo at bottom */}
                      <div className="d-flex justify-content-center mt-4">
                        <img
                          src={logo}
                          alt="GearSphere Logo"
                          style={{
                            height: 60,
                            width: "auto",
                            background: "#fff",
                            padding: 4,
                            borderRadius: 8,
                          }}
                        />
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

export default CustomerDashboard;
