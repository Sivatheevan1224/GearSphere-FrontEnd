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

export default function CompareCasePage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const compareCases = sessionStorage.getItem("compare_cases");
    if (compareCases) {
      try {
        setCases(JSON.parse(compareCases));
      } catch (error) {
        toast.error("Error loading Case comparison data");
      }
    }
    setLoading(false);
  }, []);
  const handleSelect = (pcCase) => {
    sessionStorage.setItem("selected_case", JSON.stringify(pcCase));
    toast.success(`Selected ${pcCase.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?caseSelected=1");
    }, 1000);
  };
  const handleBackToSelection = () => {
    navigate("/case");
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
  if (cases.length === 0) {
    return (
      <>
        <CustomerNavbar />
        <Container className="py-5">
          <Alert variant="warning">
            <h4>No Cases to Compare</h4>
            <p>No Cases were selected for comparison.</p>
            <Button onClick={handleBackToSelection} variant="primary">
              Back to Case Selection
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
          <h1 className="mb-0">Compare PC Cases</h1>
        </div>
        <Row className="mb-4">
          {cases.map((pcCase) => (
            <Col key={pcCase.name} md={12 / cases.length} className="mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <img
                    src={pcCase.image}
                    alt={pcCase.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      objectFit: "cover",
                      marginBottom: 8,
                    }}
                  />
                  <Card.Title>{pcCase.name}</Card.Title>
                  <Card.Text className="fw-bold text-success">
                    LKR {pcCase.price?.toLocaleString() || "N/A"}
                  </Card.Text>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleSelect(pcCase)}
                  >
                    Select This Case
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
              {cases.map((pcCase) => (
                <th key={pcCase.name}>{pcCase.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Type</td>
              {cases.map((pcCase) => (
                <td key={pcCase.name}>{pcCase.specs?.type || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Color</td>
              {cases.map((pcCase) => (
                <td key={pcCase.name}>{pcCase.specs?.color || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Side Panel</td>
              {cases.map((pcCase) => (
                <td key={pcCase.name}>{pcCase.specs?.sidePanel || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Fans Included</td>
              {cases.map((pcCase) => (
                <td key={pcCase.name}>{pcCase.specs?.fansIncluded || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Max GPU Length</td>
              {cases.map((pcCase) => (
                <td key={pcCase.name}>{pcCase.specs?.maxGPU || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Features</td>
              {cases.map((pcCase) => (
                <td key={pcCase.name}>
                  <ul style={{ textAlign: "left" }}>
                    {pcCase.features?.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td>Price</td>
              {cases.map((pcCase) => (
                <td key={pcCase.name} className="fw-bold text-success">
                  LKR {pcCase.price?.toLocaleString() || "N/A"}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
        <div className="text-center mt-4">
          <Button variant="primary" size="lg" onClick={handleBackToSelection}>
            Back to Case Selection
          </Button>
        </div>
      </Container>
    </>
  );
}
