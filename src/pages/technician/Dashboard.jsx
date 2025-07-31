
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Accordion, Alert, Nav, Badge, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  CurrencyDollar, 
  Star, 
  Tools, 
  People, 
  Clock 
} from 'react-bootstrap-icons';
import { Envelope, Telephone, GeoAlt } from 'react-bootstrap-icons';
import logo from '../../images/logo.PNG';
import pcpic2 from '../../images/pcpic2.jpeg';
import { toast } from 'react-toastify';
import axios from 'axios';

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
  Calendar,
  CurrencyDollar,
  Star,
  Tools,
  People,
  Clock,
} from "react-bootstrap-icons";
import { Envelope, Telephone, GeoAlt } from "react-bootstrap-icons";
import logo from "../../images/logo.PNG";
import pcpic2 from "../../images/pcpic2.jpeg";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingScreen from "../../components/loading/LoadingScreen";


function TechnicianDashboard() {
  const [stats, setStats] = useState({
    pendingAppointments: 0,
    completedAppointments: 0,
    totalEarnings: 0,
    averageRating: 0,
    activeServices: 0,
    totalCustomers: 0,
  });

  const [buildStats, setBuildStats] = useState({
    total_requests: 0,
    pending_requests: 0,
    accepted_requests: 0
  });
  const [recentPendingRequests, setRecentPendingRequests] = useState([]);
  const [technicianName, setTechnicianName] = useState('');
  const [systemReviews, setSystemReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buildStatsLoading, setBuildStatsLoading] = useState(true);
  const [contactFirstName, setContactFirstName] = useState('');
  const [contactLastName, setContactLastName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - Replace with actual API call
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setStats({
        pendingAppointments: 5,
        completedAppointments: 28,
        totalEarnings: 125000,
        averageRating: 4.8,
        activeServices: 3,
        totalCustomers: 15,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  // Contact form state
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactLoading, setContactLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Get session data from backend
        const sessionResponse = await axios.get(
          "http://localhost/gearsphere_api/GearSphere-BackEnd/getSession.php",
          { withCredentials: true }
        );

        if (!sessionResponse.data.success || !sessionResponse.data.user_id) {
          return;
        }

        const userId = sessionResponse.data.user_id;
        const technicianId = sessionResponse.data.technician_id;

        // Get technician details
        const technicianResponse = await axios.get(
          `http://localhost/gearsphere_api/GearSphere-BackEnd/getTechnicianDetail.php?technician_id=${technicianId}`,
          { withCredentials: true }
        );

        if (technicianResponse.data.success) {
          setTechnicianName(technicianResponse.data.technician.name || '');
        }

        // Fetch build request statistics
        const buildStatsResponse = await axios.get(
          `http://localhost/gearsphere_api/GearSphere-BackEnd/getBuildRequestStats.php?technician_id=${technicianId}`,
          { withCredentials: true }
        );

        if (buildStatsResponse.data.success) {
          setBuildStats(buildStatsResponse.data.stats);
          setRecentPendingRequests(buildStatsResponse.data.recent_pending);
        }
        setBuildStatsLoading(false);
        
        // Fetch all technicians to get their user IDs
        const techniciansResponse = await axios.get(
          "http://localhost/gearsphere_api/GearSphere-BackEnd/getAllTechnicians.php?action=getAll"
        );
        
        let technicianUserIds = [];
        if (techniciansResponse.data && Array.isArray(techniciansResponse.data)) {
          technicianUserIds = techniciansResponse.data.map(tech => tech.user_id || tech.id);
        }
        
        // Fetch system reviews and filter to show only reviews BY technicians about the system
        const systemReviewsResponse = await fetch(
          `http://localhost/gearsphere_api/GearSphere-BackEnd/getReviews.php?target_type=system&status=approved`
        );
        const systemReviewsData = await systemReviewsResponse.json();
        
        // Filter to show only system reviews written BY technicians
        const technicianSystemReviews = Array.isArray(systemReviewsData) 
          ? systemReviewsData.filter(review => technicianUserIds.includes(review.user_id))
          : [];
        
        setSystemReviews(technicianSystemReviews);
        
        setStats({
          pendingAppointments: 5,
          completedAppointments: 28,
          totalEarnings: 125000,
          averageRating: 4.8,
          activeServices: 3,
          totalCustomers: 15
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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


  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`me-1 ${i < rating ? "text-warning" : "text-muted"}`}
        fill={i < rating ? "currentColor" : "none"}
        size={16}
      />
    ));
  };

  const renderReviewCard = (review) => (
    <Col key={review.id} lg={3} md={6} sm={6} xs={12}>
      <Card className="h-100 shadow-sm">
        <Card.Body className="d-flex flex-column">
          <div className="d-flex align-items-center mb-3">
            <img
              src={review.profile_image 
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
                {renderStars(review.rating)}
                <span className="ms-2 text-muted small">
                  ({review.rating}/5)
                </span>
              </div>
            </div>
          </div>
          <p className="text-muted mb-0">{review.comment}</p>
          <div className="mt-auto">
            <small className="text-muted">
              {new Date(review.created_at).toLocaleDateString()}
            </small>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  // Show loading screen while data is being fetched
  if (isLoading) {
    return (
      <LoadingScreen
        message="Loading Technician Dashboard"
        subMessage="Fetching your appointment data"
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

              <h1 className="display-3 fw-bold mb-4 rise-up" style={{ animationDelay: '0s' }}>
                Welcome to Your Dashboard, <span className="text-primary">{technicianName || 'GearSphere Technician'}</span>
              </h1>
              <p
                className="lead mb-5 rise-up"
                style={{ animationDelay: "0.3s" }}
              >
                Manage your appointments, services, earnings, and more. Deliver
                the best PC building experience!
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
        <h1 className="mb-4">Technician Dashboard</h1>

        {/* Build Request Statistics */}
        <Row className="g-4 mb-4">
          <Col md={4}>
            <StatCard
              title="Total Build Requests"
              value={buildStats.total_requests}
              icon={Tools}
              color="info"
            />
          </Col>
          <Col md={4}>
            <StatCard
              title="Pending Build Requests"
              value={buildStats.pending_requests}
              icon={Clock}
              color="warning"
            />
          </Col>
          <Col md={4}>
            <StatCard
              title="Accepted Build Requests"
              value={buildStats.accepted_requests}
              icon={Star}
              color="success"
            />
          </Col>
        </Row>

        {/* Recent Pending Build Requests */}
        <Row className="mb-4">
          <Col>
            <h3 className="mb-4">Recent Pending Build Requests</h3>
            {buildStatsLoading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading requests...</span>
                </div>
              </div>
            ) : recentPendingRequests && recentPendingRequests.length > 0 ? (
              <Card>
                <Card.Body>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date Assigned</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPendingRequests.map((request, index) => (
                        <tr key={request.assignment_id || index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={
                                  request.customer_profile_image
                                    ? `http://localhost/gearsphere_api/GearSphere-BackEnd/profile_images/${request.customer_profile_image}`
                                    : "/profile_images/user_image.jpg"
                                }
                                alt={request.customer_name}
                                className="rounded-circle me-2"
                                width="32"
                                height="32"
                                style={{ objectFit: "cover" }}
                              />
                              {request.customer_name}
                            </div>
                          </td>
                          <td>{request.customer_email}</td>
                          <td>{request.customer_phone}</td>
                          <td>
                            {new Date(request.assigned_at).toLocaleDateString()}
                          </td>
                          <td>
                            <Badge bg="warning">Pending</Badge>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button variant="success" size="sm">
                                Accept
                              </Button>
                              <Button variant="outline-primary" size="sm">
                                View Details
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="text-center mt-3">
                    <Link to="/technician/build-requests" className="btn btn-primary">
                      View All Build Requests
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            ) : (
              <Alert variant="info">No recent pending build requests.</Alert>
            )}
          </Col>
        </Row>

        {/* Technicians Reviews Section */}
        <Row className="mt-5">
          <Col>
            <h3 className="mb-4">Technicians Reviews</h3>
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading reviews...</span>
                </div>
              </div>
            ) : systemReviews.length > 0 ? (
              <Row className="g-4">
                {systemReviews.map(review => renderReviewCard(review))}
              </Row>
            ) : (
              <Alert variant="info">No technicians reviews yet.</Alert>
            )}
          </Col>
        </Row>

        {/* Contact Section */}
        <Row className="mt-4">
          <Col></Col>
        </Row>
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
                Have questions about your appointments or need support? Fill out
                the form and our team will get back to you as soon as possible.
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
                    <option>Appointment Inquiry</option>
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

export default TechnicianDashboard;
