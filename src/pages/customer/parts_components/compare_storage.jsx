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

const compareStorageHeadingStyle = `
  .compare-storage-heading {
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
  .comparison-table .storage-name {
    font-weight: 600;
    color: #1a237e;
  }
  .comparison-table .storage-img {
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

const storageIconMap = {
  "Samsung 970 EVO Plus 1TB NVMe M.2 SSD": "/profile_images/storage1.jpg",
  "Crucial P3 500GB NVMe M.2 SSD": "/profile_images/storage2.jpg",
  "Western Digital Blue 1TB SATA SSD": "/profile_images/storage3.jpg",
  "Seagate Barracuda 2TB HDD": "/profile_images/storage4.jpg",
  "Kingston A2000 1TB NVMe M.2 SSD": "/profile_images/storage5.jpg",
  "Samsung 980 Pro 2TB NVMe M.2 SSD": "/profile_images/storage6.jpg",
  "ADATA XPG SX8200 Pro 512GB NVMe M.2 SSD": "/profile_images/storage7.jpg",
  "Western Digital Black 4TB HDD": "/profile_images/storage8.jpg",
  "Corsair Force MP600 1TB NVMe M.2 SSD": "/profile_images/storage9.jpg",
  "TeamGroup MP33 256GB NVMe M.2 SSD": "/profile_images/storage10.jpg",
};

export default function CompareStoragePage() {
  const [storage, setStorage] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const compareStorage = sessionStorage.getItem("compare_storage");
    if (compareStorage) {
      try {
        const parsedStorage = JSON.parse(compareStorage);
        const storageWithIcons = parsedStorage.map((stor) => ({
          ...stor,
          icon: storageIconMap[stor.name] || "/profile_images/user_image.jpg",
        }));
        setStorage(storageWithIcons);
      } catch (error) {
        console.error("Error parsing storage data:", error);
        toast.error("Error loading storage comparison data");
      }
    }
    setLoading(false);
  }, []);

  const handleSelectStorage = (stor) => {
    const { icon, ...storWithoutIcon } = stor;
    sessionStorage.setItem("selected_storage", JSON.stringify(storWithoutIcon));
    toast.success(`Selected ${stor.name}. Redirecting to PC Builder...`);
    setTimeout(() => {
      navigate("/pc-builder?storageSelected=1");
    }, 1000);
  };

  const handleBackToSelection = () => {
    navigate("/storage");
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

  if (storage.length === 0) {
    return (
      <>
        <CustomerNavbar />
        <Container className="py-5">
          <Alert variant="warning">
            <h4>No Storage to Compare</h4>
            <p>No storage devices were selected for comparison.</p>
            <Button onClick={handleBackToSelection} variant="primary">
              <ArrowLeft className="me-2" />
              Back to Storage Selection
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
        <style>{compareStorageHeadingStyle}</style>
        <style>{comparisonTableStyle}</style>

        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className="mb-0 compare-storage-heading">Compare Storage</h1>
        </div>

        <Row className="mb-4">
          {storage.map((stor, index) => (
            <Col key={stor.name} md={12 / storage.length} className="mb-3">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <img
                    src={stor.icon || "/profile_images/user_image.jpg"}
                    alt={stor.name}
                    className="storage-img mb-2"
                  />
                  <Card.Title className="storage-name">{stor.name}</Card.Title>
                  <Card.Text className="price">
                    LKR {stor.price?.toLocaleString() || "N/A"}
                  </Card.Text>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleSelectStorage(stor)}
                  >
                    Select This Storage
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
              {storage.map((stor) => (
                <th key={stor.name}>
                  <div className="text-center">
                    <img
                      src={stor.icon || "/profile_images/user_image.jpg"}
                      alt={stor.name}
                      className="storage-img"
                    />
                    <div className="storage-name">{stor.name}</div>
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
              {storage.map((stor) => (
                <td key={stor.name}>{stor.specs?.capacity || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Type</strong>
              </td>
              {storage.map((stor) => (
                <td key={stor.name}>{stor.specs?.type || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Interface</strong>
              </td>
              {storage.map((stor) => (
                <td key={stor.name}>{stor.specs?.interface || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Read Speed</strong>
              </td>
              {storage.map((stor) => (
                <td key={stor.name}>{stor.specs?.readSpeed || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Write Speed</strong>
              </td>
              {storage.map((stor) => (
                <td key={stor.name}>{stor.specs?.writeSpeed || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Form Factor</strong>
              </td>
              {storage.map((stor) => (
                <td key={stor.name}>{stor.specs?.formFactor || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Performance</strong>
              </td>
              {storage.map((stor) => (
                <td key={stor.name}>
                  {stor.features?.functionality?.performance || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Reliability</strong>
              </td>
              {storage.map((stor) => (
                <td key={stor.name}>
                  {stor.features?.functionality?.reliability || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Durability</strong>
              </td>
              {storage.map((stor) => (
                <td key={stor.name}>
                  {stor.features?.functionality?.durability || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Gaming</strong>
              </td>
              {storage.map((stor) => (
                <td key={stor.name}>{stor.features?.usage?.gaming || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Workstation</strong>
              </td>
              {storage.map((stor) => (
                <td key={stor.name}>
                  {stor.features?.usage?.workstation || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Productivity</strong>
              </td>
              {storage.map((stor) => (
                <td key={stor.name}>
                  {stor.features?.usage?.productivity || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Boot Drive</strong>
              </td>
              {storage.map((stor) => (
                <td key={stor.name}>
                  {stor.features?.usage?.bootDrive || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Value</strong>
              </td>
              {storage.map((stor) => (
                <td key={stor.name}>
                  {stor.features?.priceAnalysis?.value || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Target Market</strong>
              </td>
              {storage.map((stor) => (
                <td key={stor.name}>
                  {stor.features?.priceAnalysis?.targetMarket || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td>
                <strong>Rating</strong>
              </td>
              {storage.map((stor) => (
                <td key={stor.name}>
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
              {storage.map((stor) => (
                <td key={stor.name} className="price">
                  LKR {stor.price?.toLocaleString() || "N/A"}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>

        <div className="text-center mt-4">
          <Button variant="primary" size="lg" onClick={handleBackToSelection}>
            <ArrowLeft className="me-2" />
            Back to Storage Selection
          </Button>
        </div>
      </Container>
    </>
  );
}
