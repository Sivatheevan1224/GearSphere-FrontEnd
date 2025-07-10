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

export default function CompareCPUCoolerPage() {
  const [coolers, setCoolers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const compareCoolers = sessionStorage.getItem("compare_cpucoolers");
    if (compareCoolers) {
      try {
        setCoolers(JSON.parse(compareCoolers));
      } catch (error) {
        toast.error("Error loading CPU Cooler comparison data");
      }
    }
    setLoading(false);
  }, []);
  const handleSelect = (cooler) => {
    sessionStorage.setItem("selected_cpucooler", JSON.stringify(cooler));
    toast.success(`Selected ${cooler.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?cpucoolerSelected=1");
    }, 1000);
  };
  const handleBackToSelection = () => {
    navigate("/cpucooler");
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
  if (coolers.length === 0) {
    return (
      <>
        <CustomerNavbar />
        <Container className="py-5">
          <Alert variant="warning">
            <h4>No CPU Coolers to Compare</h4>
            <p>No CPU Coolers were selected for comparison.</p>
            <Button onClick={handleBackToSelection} variant="primary">
              Back to CPU Cooler Selection
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
          <h1 className="mb-0">Compare CPU Coolers</h1>
        </div>
        <Row className="mb-4">
          {coolers.map((cooler) => (
            <Col key={cooler.name} md={12 / coolers.length} className="mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <img
                    src={cooler.image}
                    alt={cooler.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      objectFit: "cover",
                      marginBottom: 8,
                    }}
                  />
                  <Card.Title>{cooler.name}</Card.Title>
                  <Card.Text className="fw-bold text-success">
                    LKR {cooler.price?.toLocaleString() || "N/A"}
                  </Card.Text>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleSelect(cooler)}
                  >
                    Select This Cooler
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
              {coolers.map((cooler) => (
                <th key={cooler.name}>{cooler.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Type</td>
              {coolers.map((cooler) => (
                <td key={cooler.name}>{cooler.specs?.type || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Height</td>
              {coolers.map((cooler) => (
                <td key={cooler.name}>{cooler.specs?.height || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Fans</td>
              {coolers.map((cooler) => (
                <td key={cooler.name}>{cooler.specs?.fans || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Noise</td>
              {coolers.map((cooler) => (
                <td key={cooler.name}>{cooler.specs?.noise || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>TDP</td>
              {coolers.map((cooler) => (
                <td key={cooler.name}>{cooler.specs?.tdp || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Features</td>
              {coolers.map((cooler) => (
                <td key={cooler.name}>
                  <ul style={{ textAlign: "left" }}>
                    {cooler.features?.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td>Price</td>
              {coolers.map((cooler) => (
                <td key={cooler.name} className="fw-bold text-success">
                  LKR {cooler.price?.toLocaleString() || "N/A"}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
        <div className="text-center mt-4">
          <Button variant="primary" size="lg" onClick={handleBackToSelection}>
            Back to CPU Cooler Selection
          </Button>
        </div>
      </Container>
    </>
  );
}
