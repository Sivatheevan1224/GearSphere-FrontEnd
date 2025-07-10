import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Table,
  Card,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import CustomerNavbar from "../../pageNavbars/CustomerNavbar";
import { toast } from "react-toastify";

export default function CompareMonitorPage() {
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const compareMonitors = sessionStorage.getItem("compare_monitors");
    if (compareMonitors) {
      try {
        setMonitors(JSON.parse(compareMonitors));
      } catch (error) {
        toast.error("Error loading Monitor comparison data");
      }
    }
    setLoading(false);
  }, []);
  const handleSelect = (monitor) => {
    sessionStorage.setItem("selected_monitor", JSON.stringify(monitor));
    toast.success(`Selected ${monitor.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?monitorSelected=1");
    }, 1000);
  };
  const handleBackToSelection = () => {
    navigate("/monitor");
  };
  if (loading) {
    return (
      <>
        <CustomerNavbar />
        <Container className="py-5 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </Container>
      </>
    );
  }
  if (monitors.length === 0) {
    return (
      <>
        <CustomerNavbar />
        <Container className="py-5">
          <Alert variant="warning">
            <h4>No Monitors to Compare</h4>
            <p>No Monitors were selected for comparison.</p>
            <Button onClick={handleBackToSelection} variant="primary">
              Back to Monitor Selection
            </Button>
          </Alert>
        </Container>
      </>
    );
  }
  return (
    <>
      <CustomerNavbar />
      <Container className="py-5">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="mb-0">Compare Monitors</h1>
        </div>
        <Row className="mb-4">
          {monitors.map((monitor) => (
            <Col key={monitor.name} md={12 / monitors.length} className="mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <img
                    src={monitor.image}
                    alt={monitor.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      objectFit: "cover",
                      marginBottom: 8,
                    }}
                  />
                  <Card.Title>{monitor.name}</Card.Title>
                  <Card.Text className="fw-bold text-success">
                    LKR {monitor.price?.toLocaleString() || "N/A"}
                  </Card.Text>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleSelect(monitor)}
                  >
                    Select This Monitor
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Specification</th>
              {monitors.map((monitor) => (
                <th key={monitor.name}>{monitor.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Size</td>
              {monitors.map((monitor) => (
                <td key={monitor.name}>{monitor.specs?.size || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Resolution</td>
              {monitors.map((monitor) => (
                <td key={monitor.name}>{monitor.specs?.resolution || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Refresh Rate</td>
              {monitors.map((monitor) => (
                <td key={monitor.name}>{monitor.specs?.refresh || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Panel</td>
              {monitors.map((monitor) => (
                <td key={monitor.name}>{monitor.specs?.panel || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Response</td>
              {monitors.map((monitor) => (
                <td key={monitor.name}>{monitor.specs?.response || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Features</td>
              {monitors.map((monitor) => (
                <td key={monitor.name}>
                  <ul style={{ textAlign: "left" }}>
                    {monitor.features?.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td>Price</td>
              {monitors.map((monitor) => (
                <td key={monitor.name} className="fw-bold text-success">
                  LKR {monitor.price?.toLocaleString() || "N/A"}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
        <div className="text-center mt-4">
          <Button variant="primary" size="lg" onClick={handleBackToSelection}>
            Back to Monitor Selection
          </Button>
        </div>
      </Container>
    </>
  );
}
