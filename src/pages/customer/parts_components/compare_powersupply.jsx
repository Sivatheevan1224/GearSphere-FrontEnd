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

export default function ComparePowerSupplyPage() {
  const [psus, setPsus] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const comparePsus = sessionStorage.getItem("compare_powersupplies");
    if (comparePsus) {
      try {
        setPsus(JSON.parse(comparePsus));
      } catch (error) {
        toast.error("Error loading Power Supply comparison data");
      }
    }
    setLoading(false);
  }, []);
  const handleSelect = (psu) => {
    sessionStorage.setItem("selected_powersupply", JSON.stringify(psu));
    toast.success(`Selected ${psu.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?powersupplySelected=1");
    }, 1000);
  };
  const handleBackToSelection = () => {
    navigate("/powersupply");
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
  if (psus.length === 0) {
    return (
      <>
        <CustomerNavbar />
        <Container className="py-5">
          <Alert variant="warning">
            <h4>No Power Supplies to Compare</h4>
            <p>No Power Supplies were selected for comparison.</p>
            <Button onClick={handleBackToSelection} variant="primary">
              Back to Power Supply Selection
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
          <h1 className="mb-0">Compare Power Supplies</h1>
        </div>
        <Row className="mb-4">
          {psus.map((psu) => (
            <Col key={psu.name} md={12 / psus.length} className="mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <img
                    src={psu.image}
                    alt={psu.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      objectFit: "cover",
                      marginBottom: 8,
                    }}
                  />
                  <Card.Title>{psu.name}</Card.Title>
                  <Card.Text className="fw-bold text-success">
                    LKR {psu.price?.toLocaleString() || "N/A"}
                  </Card.Text>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleSelect(psu)}
                  >
                    Select This Power Supply
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
              {psus.map((psu) => (
                <th key={psu.name}>{psu.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wattage</td>
              {psus.map((psu) => (
                <td key={psu.name}>{psu.specs?.wattage || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Efficiency</td>
              {psus.map((psu) => (
                <td key={psu.name}>{psu.specs?.efficiency || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Modular</td>
              {psus.map((psu) => (
                <td key={psu.name}>{psu.specs?.modular || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Fan</td>
              {psus.map((psu) => (
                <td key={psu.name}>{psu.specs?.fan || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Warranty</td>
              {psus.map((psu) => (
                <td key={psu.name}>{psu.specs?.warranty || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Features</td>
              {psus.map((psu) => (
                <td key={psu.name}>
                  <ul style={{ textAlign: "left" }}>
                    {psu.features?.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td>Price</td>
              {psus.map((psu) => (
                <td key={psu.name} className="fw-bold text-success">
                  LKR {psu.price?.toLocaleString() || "N/A"}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
        <div className="text-center mt-4">
          <Button variant="primary" size="lg" onClick={handleBackToSelection}>
            Back to Power Supply Selection
          </Button>
        </div>
      </Container>
    </>
  );
}
