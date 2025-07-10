import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Table,
  Alert,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { Display, ArrowLeft } from "react-bootstrap-icons";
import CustomerNavbar from "../../pageNavbars/CustomerNavbar";
import { toast } from "react-toastify";

const compareGpuHeadingStyle = `
  .compare-gpu-heading {
    font-size: 2.1rem;
    font-weight: 700;
    color: #1a237e;
    letter-spacing: 0.5px;
    text-shadow: 0 2px 8px rgba(26,35,126,0.08);
    margin-bottom: 0;
    margin-top: 0.2em;
    line-height: 1.1;
  }
`;

const comparisonTableStyle = `
  .comparison-table th {
    background-color: #f8f9fa;
    font-weight: 600;
    text-align: center;
    vertical-align: middle;
    border: 1px solid #dee2e6;
  }
  .comparison-table td {
    text-align: center;
    vertical-align: middle;
    border: 1px solid #dee2e6;
  }
  .comparison-table .gpu-name {
    font-weight: 600;
    color: #1a237e;
  }
  .comparison-table .gpu-img {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover;
    margin-bottom: 8px;
  }
  .comparison-table .price {
    font-weight: 600;
    color: #28a745;
  }
  .comparison-table .rating {
    color: #f5a623;
  }
`;

export default function CompareGPUPage() {
  const [gpus, setGpus] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const compareGpus = sessionStorage.getItem("compare_gpus");
    if (compareGpus) {
      try {
        const parsedGpus = JSON.parse(compareGpus);
        setGpus(parsedGpus);
      } catch (error) {
        console.error("Error parsing GPU data:", error);
        toast.error("Error loading GPU comparison data");
      }
    }
    setLoading(false);
  }, []);

  const handleSelectGPU = (gpu) => {
    const { icon, ...gpuWithoutIcon } = gpu;
    sessionStorage.setItem("selected_gpu", JSON.stringify(gpuWithoutIcon));
    toast.success(`Selected ${gpu.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?gpuSelected=1");
    }, 1000);
  };

  const handleBackToSelection = () => {
    navigate("/gpu");
  };

  if (loading) {
    return (
      <>
        <CustomerNavbar />
        <Container className="py-5">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Container>
      </>
    );
  }

  if (gpus.length === 0) {
    return (
      <>
        <CustomerNavbar />
        <Container className="py-5">
          <Alert variant="warning">
            <h4>No GPUs to Compare</h4>
            <p>No Video Cards were selected for comparison.</p>
            <Button onClick={handleBackToSelection} variant="primary">
              <ArrowLeft className="me-2" />
              Back to GPU Selection
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
        <style>{compareGpuHeadingStyle}</style>
        <style>{comparisonTableStyle}</style>

        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="mb-0 compare-gpu-heading">Compare Video Cards</h1>
        </div>

        <Row className="mb-4">
          {gpus.map((gpu, index) => (
            <Col key={gpu.name} md={12 / gpus.length} className="mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <img
                    src={gpu.icon || "/profile_images/user_image.jpg"}
                    alt={gpu.name}
                    className="gpu-img mb-2"
                  />
                  <Card.Title className="gpu-name">{gpu.name}</Card.Title>
                  <Card.Text className="price">
                    LKR {gpu.price?.toLocaleString() || "N/A"}
                  </Card.Text>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleSelectGPU(gpu)}
                  >
                    Select This GPU
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Table className="comparison-table">
          <thead>
            <tr>
              <th>Specification</th>
              {gpus.map((gpu) => (
                <th key={gpu.name}>{gpu.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Memory</strong>
              </td>
              {gpus.map((gpu) => (
                <td key={gpu.name}>{gpu.specs?.memory || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Boost Clock</strong>
              </td>
              {gpus.map((gpu) => (
                <td key={gpu.name}>{gpu.specs?.boostClock || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Cores</strong>
              </td>
              {gpus.map((gpu) => (
                <td key={gpu.name}>{gpu.specs?.cores || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Microarchitecture</strong>
              </td>
              {gpus.map((gpu) => (
                <td key={gpu.name}>{gpu.features?.microarchitecture || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>TDP</strong>
              </td>
              {gpus.map((gpu) => (
                <td key={gpu.name}>{gpu.specs?.tdp || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Integrated Graphics</strong>
              </td>
              {gpus.map((gpu) => (
                <td key={gpu.name}>
                  {gpu.features?.integratedGraphics || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Rating</strong>
              </td>
              {gpus.map((gpu) => (
                <td key={gpu.name}>
                  <span className="rating">★★★★★</span>
                  <br />
                  <small className="text-muted">(123 reviews)</small>
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Price</strong>
              </td>
              {gpus.map((gpu) => (
                <td key={gpu.name} className="price">
                  LKR {gpu.price?.toLocaleString() || "N/A"}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>

        <div className="text-center mt-4">
          <Button variant="primary" size="lg" onClick={handleBackToSelection}>
            <ArrowLeft className="me-2" />
            Back to GPU Selection
          </Button>
        </div>
      </Container>
    </>
  );
}
