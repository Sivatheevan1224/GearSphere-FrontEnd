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
import { Cpu, ArrowLeft } from "react-bootstrap-icons";
import CustomerNavbar from "../../pageNavbars/CustomerNavbar";
import { toast } from "react-toastify";

const compareCpuHeadingStyle = `
  .compare-cpu-heading {
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
  .comparison-table .cpu-name {
    font-weight: 600;
    color: #1a237e;
  }
  .comparison-table .cpu-img {
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

const cpuIconMap = {
  "Intel Core i9-13900K": <Cpu size={24} className="text-primary" />,
  "AMD Ryzen 9 7950X": <Cpu size={24} className="text-danger" />,
  "Intel Core i7-13700K": <Cpu size={24} className="text-primary" />,
  "AMD Ryzen 7 7700X": <Cpu size={24} className="text-danger" />,
  "Intel Core i5-13600K": <Cpu size={24} className="text-primary" />,
  "AMD Ryzen 5 7600X": <Cpu size={24} className="text-danger" />,
  "Intel Core i3-13100": <Cpu size={24} className="text-primary" />,
  "AMD Ryzen 5 5600X": <Cpu size={24} className="text-danger" />,
  "Intel Pentium Gold G6400": <Cpu size={24} className="text-primary" />,
  "AMD Athlon 3000G": <Cpu size={24} className="text-danger" />,
  "Intel Core i9-12900K": <Cpu size={24} className="text-primary" />,
  "AMD Ryzen 9 5900X": <Cpu size={24} className="text-danger" />,
  "Intel Core i5-12400F": <Cpu size={24} className="text-primary" />,
  "AMD Ryzen 7 5800X": <Cpu size={24} className="text-danger" />,
  "Intel Core i7-12700F": <Cpu size={24} className="text-primary" />,
  "AMD Ryzen 3 3200G": <Cpu size={24} className="text-danger" />,
};

export default function CompareCPUPage() {
  const [cpus, setCpus] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const compareCpus = sessionStorage.getItem("compare_cpus");
    if (compareCpus) {
      try {
        const parsedCpus = JSON.parse(compareCpus);
        const cpusWithIcons = parsedCpus.map((cpu) => ({
          ...cpu,
          icon: cpuIconMap[cpu.name] || null,
        }));
        setCpus(cpusWithIcons);
      } catch (error) {
        console.error("Error parsing CPU data:", error);
        toast.error("Error loading CPU comparison data");
      }
    }
    setLoading(false);
  }, []);

  const handleSelectCPU = (cpu) => {
    const { icon, ...cpuWithoutIcon } = cpu;
    sessionStorage.setItem("selected_cpu", JSON.stringify(cpuWithoutIcon));
    toast.success(`Selected ${cpu.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?cpuSelected=1");
    }, 1000);
  };

  const handleBackToSelection = () => {
    navigate("/cpu");
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

  if (cpus.length === 0) {
    return (
      <>
        <CustomerNavbar />
        <Container className="py-5">
          <Alert variant="warning">
            <h4>No CPUs to Compare</h4>
            <p>No CPUs were selected for comparison.</p>
            <Button onClick={handleBackToSelection} variant="primary">
              <ArrowLeft className="me-2" />
              Back to CPU Selection
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
        <style>{compareCpuHeadingStyle}</style>
        <style>{comparisonTableStyle}</style>

        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="mb-0 compare-cpu-heading">Compare CPUs</h1>
        </div>

        <Row className="mb-4">
          {cpus.map((cpu, index) => (
            <Col key={cpu.name} md={12 / cpus.length} className="mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <img
                    src={cpu.icon || "/profile_images/user_image.jpg"}
                    alt={cpu.name}
                    className="cpu-img mb-2"
                  />
                  <Card.Title className="cpu-name">{cpu.name}</Card.Title>
                  <Card.Text className="price">
                    LKR {cpu.price?.toLocaleString() || "N/A"}
                  </Card.Text>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleSelectCPU(cpu)}
                  >
                    Select This CPU
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
              {cpus.map((cpu) => (
                <th key={cpu.name}>{cpu.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Cores</strong>
              </td>
              {cpus.map((cpu) => (
                <td key={cpu.name}>{cpu.specs?.cores || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Threads</strong>
              </td>
              {cpus.map((cpu) => (
                <td key={cpu.name}>{cpu.specs?.threads || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Base Speed</strong>
              </td>
              {cpus.map((cpu) => (
                <td key={cpu.name}>{cpu.specs?.baseSpeed || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Boost Speed</strong>
              </td>
              {cpus.map((cpu) => (
                <td key={cpu.name}>{cpu.specs?.boostSpeed || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Cache</strong>
              </td>
              {cpus.map((cpu) => (
                <td key={cpu.name}>{cpu.specs?.cache || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>TDP</strong>
              </td>
              {cpus.map((cpu) => (
                <td key={cpu.name}>{cpu.specs?.tdp || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Architecture</strong>
              </td>
              {cpus.map((cpu) => (
                <td key={cpu.name}>{cpu.features?.architecture || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Socket</strong>
              </td>
              {cpus.map((cpu) => (
                <td key={cpu.name}>{cpu.features?.socket || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Rating</strong>
              </td>
              {cpus.map((cpu) => (
                <td key={cpu.name}>
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
              {cpus.map((cpu) => (
                <td key={cpu.name} className="price">
                  LKR {cpu.price?.toLocaleString() || "N/A"}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>

        <div className="text-center mt-4">
          <Button variant="primary" size="lg" onClick={handleBackToSelection}>
            <ArrowLeft className="me-2" />
            Back to CPU Selection
          </Button>
        </div>
      </Container>
    </>
  );
}
