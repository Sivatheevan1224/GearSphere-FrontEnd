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
import { ArrowLeft } from "react-bootstrap-icons";
import CustomerNavbar from "../../pageNavbars/CustomerNavbar";
import { toast } from "react-toastify";

const compareMemoryHeadingStyle = `
  .compare-memory-heading {
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
  .comparison-table .memory-name {
    font-weight: 600;
    color: #1a237e;
  }
  .comparison-table .memory-img {
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

const memoryIconMap = {
  "Corsair Vengeance RGB Pro 32GB (2x16GB) DDR4-3600":
    "/profile_images/memory1.jpg",
  "G.Skill Ripjaws V 16GB (2x8GB) DDR4-3200": "/profile_images/memory2.jpg",
  "Crucial Ballistix 8GB (1x8GB) DDR4-2666": "/profile_images/memory3.jpg",
  "Kingston Fury Beast 64GB (2x32GB) DDR5-6000": "/profile_images/memory4.jpg",
  "TeamGroup T-Force Vulcan Z 16GB (2x8GB) DDR4-3000":
    "/profile_images/memory5.jpg",
  "Patriot Viper Steel 32GB (2x16GB) DDR4-4400": "/profile_images/memory6.jpg",
  "ADATA XPG Gammix D10 8GB (1x8GB) DDR4-3200": "/profile_images/memory7.jpg",
  "Corsair Dominator Platinum RGB 64GB (2x32GB) DDR5-7200":
    "/profile_images/memory8.jpg",
  "G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5-6400":
    "/profile_images/memory9.jpg",
  "Crucial P5 Plus 16GB (2x8GB) DDR4-3600": "/profile_images/memory10.jpg",
};

export default function CompareMemoryPage() {
  const [memory, setMemory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const compareMemory = sessionStorage.getItem("compare_memory");
    if (compareMemory) {
      try {
        const parsedMemory = JSON.parse(compareMemory);
        const memoryWithIcons = parsedMemory.map((mem) => ({
          ...mem,
          icon: memoryIconMap[mem.name] || "/profile_images/user_image.jpg",
        }));
        setMemory(memoryWithIcons);
      } catch (error) {
        console.error("Error parsing memory data:", error);
        toast.error("Error loading memory comparison data");
      }
    }
    setLoading(false);
  }, []);

  const handleSelectMemory = (mem) => {
    const { icon, ...memWithoutIcon } = mem;
    sessionStorage.setItem("selected_memory", JSON.stringify(memWithoutIcon));
    toast.success(`Selected ${mem.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?memorySelected=1");
    }, 1000);
  };

  const handleBackToSelection = () => {
    navigate("/memory");
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

  if (memory.length === 0) {
    return (
      <>
        <CustomerNavbar />
        <Container className="py-5">
          <Alert variant="warning">
            <h4>No Memory to Compare</h4>
            <p>No memory modules were selected for comparison.</p>
            <Button onClick={handleBackToSelection} variant="primary">
              <ArrowLeft className="me-2" />
              Back to Memory Selection
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
        <style>{compareMemoryHeadingStyle}</style>
        <style>{comparisonTableStyle}</style>

        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="mb-0 compare-memory-heading">Compare Memory</h1>
        </div>

        <Row className="mb-4">
          {memory.map((mem, index) => (
            <Col key={mem.name} md={12 / memory.length} className="mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <img
                    src={mem.icon || "/profile_images/user_image.jpg"}
                    alt={mem.name}
                    className="memory-img mb-2"
                  />
                  <Card.Title className="memory-name">{mem.name}</Card.Title>
                  <Card.Text className="price">
                    LKR {mem.price?.toLocaleString() || "N/A"}
                  </Card.Text>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleSelectMemory(mem)}
                  >
                    Select This Memory
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
              {memory.map((mem) => (
                <th key={mem.name}>
                  <div className="text-center">
                    <img
                      src={mem.icon || "/profile_images/user_image.jpg"}
                      alt={mem.name}
                      className="memory-img"
                    />
                    <div className="memory-name">{mem.name}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Capacity</strong>
              </td>
              {memory.map((mem) => (
                <td key={mem.name}>{mem.specs?.capacity || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Type</strong>
              </td>
              {memory.map((mem) => (
                <td key={mem.name}>{mem.specs?.type || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Speed</strong>
              </td>
              {memory.map((mem) => (
                <td key={mem.name}>{mem.specs?.speed || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Latency</strong>
              </td>
              {memory.map((mem) => (
                <td key={mem.name}>{mem.specs?.latency || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Voltage</strong>
              </td>
              {memory.map((mem) => (
                <td key={mem.name}>{mem.specs?.voltage || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Performance</strong>
              </td>
              {memory.map((mem) => (
                <td key={mem.name}>
                  {mem.features?.functionality?.performance || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Compatibility</strong>
              </td>
              {memory.map((mem) => (
                <td key={mem.name}>
                  {mem.features?.functionality?.compatibility || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Reliability</strong>
              </td>
              {memory.map((mem) => (
                <td key={mem.name}>
                  {mem.features?.functionality?.reliability || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Gaming</strong>
              </td>
              {memory.map((mem) => (
                <td key={mem.name}>{mem.features?.usage?.gaming || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Workstation</strong>
              </td>
              {memory.map((mem) => (
                <td key={mem.name}>
                  {mem.features?.usage?.workstation || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Productivity</strong>
              </td>
              {memory.map((mem) => (
                <td key={mem.name}>
                  {mem.features?.usage?.productivity || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Value</strong>
              </td>
              {memory.map((mem) => (
                <td key={mem.name}>
                  {mem.features?.priceAnalysis?.value || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Target Market</strong>
              </td>
              {memory.map((mem) => (
                <td key={mem.name}>
                  {mem.features?.priceAnalysis?.targetMarket || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Rating</strong>
              </td>
              {memory.map((mem) => (
                <td key={mem.name}>
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
              {memory.map((mem) => (
                <td key={mem.name} className="price">
                  LKR {mem.price?.toLocaleString() || "N/A"}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>

        <div className="text-center mt-4">
          <Button variant="primary" size="lg" onClick={handleBackToSelection}>
            <ArrowLeft className="me-2" />
            Back to Memory Selection
          </Button>
        </div>
      </Container>
    </>
  );
}
