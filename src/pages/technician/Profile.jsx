import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TechnicianProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact_number: "",
    address: "",
    charge_per_day: "",
    profilePic: "/profile_images/user_image.jpg",
    email: "",
    status: "available", // <-- add status to state
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchTechnicianData = async () => {
      try {
        const userId = sessionStorage.getItem("user_id");
        if (!userId) return toast.error("Session expired. Please log in.");

        const token = localStorage.getItem("token");
        // Step 1: Get technician_id from user_id
        const techIdRes = await axios.get(
          `http://localhost/gearsphere_api/GearSphere-BackEnd/getTechnicianIdByUser.php?user_id=${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const technicianId = techIdRes.data.technician_id;
        if (!technicianId) return toast.error("Technician ID not found.");

        // Step 2: Get technician details by technician_id
        const response = await axios.get(
          `http://localhost/gearsphere_api/GearSphere-BackEnd/getTechnicianDetail.php?technician_id=${technicianId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;

        if (data && data.success && data.technician) {
          const profilePicUrl = data.technician.profile_image
            ? `http://localhost/gearsphere_api/GearSphere-BackEnd/profile_images/${data.technician.profile_image}`
            : "/profile_images/user_image.jpg";

          setFormData({
            name: data.technician.name || "",
            contact_number: data.technician.contact_number || "",
            address: data.technician.address || "",
            charge_per_day: data.technician.charge_per_day || "",
            profilePic: profilePicUrl,
            email: data.technician.email || "",
            specialization: data.technician.specialization || "",
            experience: data.technician.experience || "",
            technician_id: data.technician.technician_id || "",
            status: data.technician.status || "available",
          });

          sessionStorage.setItem("technician_profile_pic", profilePicUrl);
          window.dispatchEvent(new Event("profilePicUpdated"));
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        toast.error("Failed to fetch profile");
      }
    };

    fetchTechnicianData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "charge_per_day") {
      // Allow only numbers (and optionally a decimal point)
      if (!/^[0-9]*\.?[0-9]*$/.test(value) && value !== "") return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const handleStatusChange = (e) => {
    setFormData((prev) => ({ ...prev, status: e.target.value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    // Frontend validation for charge_per_day
    if (formData.charge_per_day === "" || isNaN(formData.charge_per_day)) {
      toast.error("Charge per day must be a valid number.");
      return;
    }

    // Ensure technician_id is present
    const technician_id =
      formData.technician_id || sessionStorage.getItem("technician_id");
    if (!technician_id) {
      toast.error("Technician ID missing. Please re-login.");
      return;
    }

    const userId = sessionStorage.getItem("user_id");
    if (!userId) return toast.error("Session expired. Please log in.");

    // Debug: Print payload values
    // console.log(
    //   "Submitting technician_id:",
    //   technician_id,
    //   "charge_per_day:",
    //   formData.charge_per_day
    // );

    const payload = new FormData();
    payload.append("user_id", userId);
    payload.append("technician_id", technician_id);
    payload.append("name", formData.name);
    payload.append("contact_number", formData.contact_number);
    payload.append("address", formData.address);
    payload.append("charge_per_day", formData.charge_per_day);
    payload.append("status", formData.status); // <-- send status

    if (profilePicFile) {
      payload.append("profile_image", profilePicFile);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost/gearsphere_api/GearSphere-BackEnd/updateTechnicianProfile.php",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully");

        // Fetch updated profile using the new two-step backend
        const techIdRes = await axios.get(
          `http://localhost/gearsphere_api/GearSphere-BackEnd/getTechnicianIdByUser.php?user_id=${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const technicianId = techIdRes.data.technician_id;
        if (technicianId) {
          const profileRes = await axios.get(
            `http://localhost/gearsphere_api/GearSphere-BackEnd/getTechnicianDetail.php?technician_id=${technicianId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const data = profileRes.data;
          if (data && data.success && data.technician) {
            const profilePicUrl = data.technician.profile_image
              ? `http://localhost/gearsphere_api/GearSphere-BackEnd/profile_images/${data.technician.profile_image}`
              : "/profile_images/user_image.jpg";

            setFormData((prev) => ({
              ...prev,
              profilePic: profilePicUrl,
            }));
            sessionStorage.setItem("technician_profile_pic", profilePicUrl);
            window.dispatchEvent(new Event("profilePicUpdated"));
            setProfilePicFile(null);
            setProfilePicPreview(null);
          }
        }
      } else {
        toast.error(
          "Update failed: " + (response.data.message || "Unknown error")
        );
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("An error occurred during update");
    }
  };

  return (
    <Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="profile-border-wrapper">
        <Row>
          <Col md={5}>
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <img
                  src={formData.profilePic}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
                <h5>{formData.name}</h5>
                <p>
                  <b>Email:</b> {formData.email}
                </p>
                <p>
                  <b>Contact:</b> {formData.contact_number}
                </p>
                <p>
                  <b>Address:</b> {formData.address}
                </p>
                <p>
                  <b>Charge/Day:</b> Rs. {formData.charge_per_day}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  {formData.status === "available" ? (
                    <span
                      style={{
                        color: "white",
                        background: "green",
                        borderRadius: 8,
                        padding: "2px 10px",
                        fontWeight: 600,
                      }}
                    >
                      Available
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "white",
                        background: "red",
                        borderRadius: 8,
                        padding: "2px 10px",
                        fontWeight: 600,
                      }}
                    >
                      Unavailable
                    </span>
                  )}
                </p>
                <p>
                  <b>specialization:</b> {formData.specialization}
                </p>
                <p>
                  <b>Experience:</b> {formData.experience}
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={7} className="border rounded p-4 shadow-sm bg-white">
            <h1 className="text-center mb-5">My Profile</h1>
            <div className="text-center mb-4">
              <img
                src={profilePicPreview || formData.profilePic}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <div>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleProfilePicChange}
                  autoComplete="off"
                />
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => fileInputRef.current.click()}
                >
                  Change Photo
                </Button>
              </div>
              <h5 className="mt-3">{formData.name}</h5>
              <p className="text-muted">Technician</p>
            </div>

            <Form onSubmit={handleProfileUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  autoComplete="name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  placeholder="07X XXX XXXX"
                  pattern="0[0-9]{9}"
                  title="Enter a valid Sri Lankan phone number"
                  autoComplete="tel"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="e.g., Point Pedro | Jaffna"
                  autoComplete="street-address"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Charge Per Day (Rs.)</Form.Label>
                <Form.Control
                  type="text"
                  name="charge_per_day"
                  value={formData.charge_per_day}
                  onChange={handleInputChange}
                  min="0"
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Availability Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleStatusChange}
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit">
                Update Profile
              </Button>
            </Form>
          </Col>
        </Row>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .profile-border-wrapper {
          border: 1.5px solid #dee2e6;
          border-radius: 18px;
          padding: 2rem 1.5rem;
          background: #fff;
          box-shadow: 0 2px 12px rgba(0,0,0,0.03);
          margin-bottom: 2rem;
        }
      `,
        }}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default TechnicianProfile;
