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

const compareMotherboardHeadingStyle = `
  .compare-mb-heading {
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
  .comparison-table .mb-name {
    font-weight: 600;
    color: #1a237e;
  }
  .comparison-table .mb-img {
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

const motherboardIconMap = {
  "ASUS ROG Strix Z790-E Gaming": "/profile_images/motherboard1.jpg",
  "MSI MAG B650 Tomahawk WiFi": "/profile_images/motherboard2.jpg",
  "Gigabyte B760M DS3H AX": "/profile_images/motherboard3.jpg",
  "ASRock X670E Taichi": "/profile_images/motherboard4.jpg",
  "ASUS PRIME H610M-E D4": "/profile_images/motherboard5.jpg",
  "MSI PRO B550M-VC": "/profile_images/motherboard6.jpg",
  "Gigabyte Z690 AORUS Master": "/profile_images/motherboard7.jpg",
  "ASRock B650M Pro RS": "/profile_images/motherboard8.jpg",
  "ASUS TUF Gaming B760M-Plus WiFi": "/profile_images/motherboard9.jpg",
  "MSI MPG B550 Gaming Edge WiFi": "/profile_images/motherboard10.jpg",
  "Gigabyte H610M S2H": "/profile_images/motherboard11.jpg",
  "ASRock A520M-HDV": "/profile_images/motherboard12.jpg",
  "ASUS ROG Strix B760-F Gaming WiFi": "/profile_images/motherboard13.jpg",
  "MSI MEG X670E ACE": "/profile_images/motherboard14.jpg",
  "Gigabyte B660M DS3H": "/profile_images/motherboard15.jpg",
};

export default function CompareMotherboardPage() {
  const [motherboards, setMotherboards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const compareMotherboards = sessionStorage.getItem("compare_motherboards");
    if (compareMotherboards) {
      try {
        const parsedMotherboards = JSON.parse(compareMotherboards);
        const motherboardsWithIcons = parsedMotherboards.map((mb) => ({
          ...mb,
          icon: motherboardIconMap[mb.name] || "/profile_images/user_image.jpg",
        }));
        setMotherboards(motherboardsWithIcons);
      } catch (error) {
        console.error("Error parsing motherboard data:", error);
        toast.error("Error loading motherboard comparison data");
      }
    }
    setLoading(false);
  }, []);

  const handleSelectMotherboard = (mb) => {
    const { icon, ...mbWithoutIcon } = mb;
    sessionStorage.setItem(
      "selected_motherboard",
      JSON.stringify(mbWithoutIcon)
    );
    toast.success(`Selected ${mb.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?motherboardSelected=1");
    }, 1000);
  };

  const handleBackToSelection = () => {
    navigate("/motherboard");
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

  if (motherboards.length === 0) {
    return (
      <>
        <CustomerNavbar />
        <Container className="py-5">
          <Alert variant="warning">
            <h4>No Motherboards to Compare</h4>
            <p>No motherboards were selected for comparison.</p>
            <Button onClick={handleBackToSelection} variant="primary">
              <ArrowLeft className="me-2" />
              Back to Motherboard Selection
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
        <style>{compareMotherboardHeadingStyle}</style>
        <style>{comparisonTableStyle}</style>

        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="mb-0 compare-mb-heading">Compare Motherboards</h1>
        </div>

        <Row className="mb-4">
          {motherboards.map((mb, index) => (
            <Col key={mb.name} md={12 / motherboards.length} className="mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <img
                    src={mb.icon || "/profile_images/user_image.jpg"}
                    alt={mb.name}
                    className="mb-img"
                  />
                  <Card.Title className="mb-name">{mb.name}</Card.Title>
                  <Card.Text className="price">
                    LKR {mb.price?.toLocaleString() || "N/A"}
                  </Card.Text>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleSelectMotherboard(mb)}
                  >
                    Select This Motherboard
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
              {motherboards.map((mb) => (
                <th key={mb.name}>
                  <div className="text-center">
                    <img
                      src={mb.icon || "/profile_images/user_image.jpg"}
                      alt={mb.name}
                      className="mb-img"
                    />
                    <div className="mb-name">{mb.name}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Chipset</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>{mb.specs?.chipset || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Socket</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>{mb.specs?.socket || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Form Factor</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>{mb.specs?.formFactor || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Memory Slots</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>{mb.specs?.memorySlots || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Max Memory</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>{mb.specs?.maxMemory || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Memory Speed</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>{mb.specs?.memorySpeed || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>PCIe Support</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>
                  {mb.features?.uniqueFeatures?.find((f) =>
                    f.includes("PCIe")
                  ) || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>WiFi</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>
                  {mb.features?.uniqueFeatures?.find((f) =>
                    f.includes("WiFi")
                  ) || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>LAN</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>
                  {mb.features?.uniqueFeatures?.find(
                    (f) => f.includes("LAN") || f.includes("GbE")
                  ) || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>USB Support</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>
                  {mb.features?.uniqueFeatures?.find((f) =>
                    f.includes("USB")
                  ) || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Overclocking</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>
                  {mb.features?.functionality?.overclocking || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Connectivity</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>
                  {mb.features?.functionality?.connectivity || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Features</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>
                  {mb.features?.functionality?.features || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Power Efficiency</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>
                  {mb.features?.functionality?.powerEfficiency || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Gaming</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>{mb.features?.usage?.gaming || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Workstation</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>{mb.features?.usage?.workstation || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Productivity</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>{mb.features?.usage?.productivity || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Value</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>
                  {mb.features?.priceAnalysis?.value || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Target Market</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>
                  {mb.features?.priceAnalysis?.targetMarket || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Rating</strong>
              </td>
              {motherboards.map((mb) => (
                <td key={mb.name}>
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
              {motherboards.map((mb) => (
                <td key={mb.name} className="price">
                  LKR {mb.price?.toLocaleString() || "N/A"}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>

        <div className="text-center mt-4">
          <Button variant="primary" size="lg" onClick={handleBackToSelection}>
            <ArrowLeft className="me-2" />
            Back to Motherboard Selection
          </Button>
        </div>
      </Container>
    </>
  );
}
