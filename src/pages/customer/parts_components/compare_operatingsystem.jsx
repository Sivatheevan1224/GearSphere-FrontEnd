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

export default function CompareOperatingSystemPage() {
  const [oses, setOses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const compareOses = sessionStorage.getItem("compare_operatingsystems");
    if (compareOses) {
      try {
        setOses(JSON.parse(compareOses));
      } catch (error) {
        toast.error("Error loading Operating System comparison data");
      }
    }
    setLoading(false);
  }, []);
  const handleSelect = (os) => {
    sessionStorage.setItem("selected_operatingsystem", JSON.stringify(os));
    toast.success(`Selected ${os.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?operatingsystemSelected=1");
    }, 1000);
  };
  const handleBackToSelection = () => {
    navigate("/operatingsystem");
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
  if (oses.length === 0) {
    return (
      <>
        <CustomerNavbar />
        <Container className="py-5">
          <Alert variant="warning">
            <h4>No Operating Systems to Compare</h4>
            <p>No Operating Systems were selected for comparison.</p>
            <Button onClick={handleBackToSelection} variant="primary">
              Back to Operating System Selection
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
          <h1 className="mb-0">Compare Operating Systems</h1>
        </div>
        <Row className="mb-4">
          {oses.map((os) => (
            <Col key={os.name} md={12 / oses.length} className="mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <img
                    src={os.image}
                    alt={os.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      objectFit: "cover",
                      marginBottom: 8,
                    }}
                  />
                  <Card.Title>{os.name}</Card.Title>
                  <Card.Text className="fw-bold text-success">
                    {os.price === 0
                      ? "Free"
                      : `LKR ${os.price?.toLocaleString()}`}
                  </Card.Text>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleSelect(os)}
                  >
                    Select This OS
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
              {oses.map((os) => (
                <th key={os.name}>{os.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Type</td>
              {oses.map((os) => (
                <td key={os.name}>{os.specs?.type || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Bit</td>
              {oses.map((os) => (
                <td key={os.name}>{os.specs?.bit || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>License</td>
              {oses.map((os) => (
                <td key={os.name}>{os.specs?.license || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Support</td>
              {oses.map((os) => (
                <td key={os.name}>{os.specs?.support || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Features</td>
              {oses.map((os) => (
                <td key={os.name}>
                  <ul style={{ textAlign: "left" }}>
                    {os.features?.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td>Price</td>
              {oses.map((os) => (
                <td key={os.name} className="fw-bold text-success">
                  {os.price === 0
                    ? "Free"
                    : `LKR ${os.price?.toLocaleString()}`}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
        <div className="text-center mt-4">
          <Button variant="primary" size="lg" onClick={handleBackToSelection}>
            Back to Operating System Selection
          </Button>
        </div>
      </Container>
    </>
  );
}
