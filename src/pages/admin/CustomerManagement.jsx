import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
  Modal,
  Spinner,
} from "react-bootstrap";
import { People } from "react-bootstrap-icons";
import LoadingScreen from "../../components/loading/LoadingScreen";
import axios from "axios";
import { toast } from "react-toastify";

function CustomerManagement() {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost/gearsphere_api/GearSphere-BackEnd/getAllCustomers.php?action=getAll",
        {
          withCredentials: true,
        }
      );
      const transformedData = response.data.map((customer) => ({
        id: customer.user_id,
        profile_image: customer.profile_image,
        name: customer.name,
        email: customer.email,
        phone: customer.contact_number,
        district: customer.address,
        status: customer.disable_status,
        joinDate: customer.created_at || "",
      }));
      setCustomers(transformedData);
    } catch (error) {
      setCustomers([]);
    }
    setLoading(false);
  };

  const handleDisableUser = async () => {
    if (!selectedUser) return;
    const newStatus = selectedUser.status === "active" ? "disabled" : "active";
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost/gearsphere_api/GearSphere-BackEnd/disableUser.php",
        {
          params: {
            id: selectedUser.id,
            status: newStatus,
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.warn(`Customer status changed to: ${newStatus}`);
        setIsDisabled(newStatus === "disabled");
        setCustomers((prev) =>
          prev.map((c) =>
            c.id === selectedUser.id ? { ...c, status: newStatus } : c
          )
        );
        setSelectedUser((prev) =>
          prev ? { ...prev, status: newStatus } : prev
        );
      } else {
        toast.error("Failed to update status: " + response.data.message);
      }
    } catch (error) {
      toast.error("There was an error updating the user status!");
    }
    setIsLoading(false);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setIsDisabled(false);
  };

  if (loading) {
    return (
      <LoadingScreen
        message="Loading Customers"
        subMessage="Fetching customer management data"
      />
    );
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Customer Management</h1>
      <Row className="mb-4">
        <Col md={12}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex align-items-center">
                <People size={40} className="text-primary me-3" />
                <div>
                  <h3>{customers.length}</h3>
                  <p className="text-muted mb-0">Total Customers</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="mb-4">
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>District</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <img
                      src={`http://localhost/gearsphere_api/GearSphere-BackEnd/profile_images/${customer.profile_image}`}
                      alt="Profile"
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-profile.png"; // optional fallback
                      }}
                    />
                  </td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.district}</td>
                  <td>
                    <Badge
                      bg={customer.status === "active" ? "success" : "danger"}
                    >
                      {customer.status}
                    </Badge>
                  </td>
                  <td>{customer.joinDate}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setSelectedUser(customer);
                        setIsDisabled(customer.status === "disabled");
                        setShowDetailsModal(true);
                      }}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {/* User Details Modal */}
      <Modal show={showDetailsModal} onHide={handleCloseDetailsModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={`http://localhost/gearsphere_api/GearSphere-BackEnd/profile_images/${selectedUser.profile_image}`}
                  alt="Profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginBottom: "15px",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-profile.png";
                  }}
                />
              </div>
              <h5 className="mb-3 text-center">{selectedUser.name}</h5>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUser.phone}
              </p>
              {selectedUser.district && (
                <p>
                  <strong>District:</strong> {selectedUser.district}
                </p>
              )}
              {selectedUser.status && (
                <p>
                  <strong>Status:</strong> {selectedUser.status}
                </p>
              )}
              {selectedUser.joinDate && (
                <p>
                  <strong>Join Date:</strong> {selectedUser.joinDate}
                </p>
              )}
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            style={{
              backgroundColor: isDisabled ? "#e53935" : "#00008B",
              border: "none",
              minWidth: 170,
            }}
            className="me-3"
            onClick={handleDisableUser}
            disabled={isLoading}
          >
            {isLoading
              ? "Processing..."
              : isDisabled
              ? "Disabled"
              : "Disable User"}
          </Button>
          <Button
            variant="secondary"
            className="ms-auto"
            onClick={handleCloseDetailsModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CustomerManagement;
