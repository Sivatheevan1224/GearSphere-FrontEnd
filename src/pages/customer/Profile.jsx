import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CustomerProfile = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '0771234567',
    address: 'Colombo',
    profilePic: 'https://via.placeholder.com/150'
  });
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const fileInputRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
    if (profilePicPreview) {
      setFormData(prev => ({
        ...prev,
        profilePic: profilePicPreview
      }));
      setProfilePicPreview(null);
      setProfilePicFile(null);
    }
  };

  return (
    <Container className="">
      <div className="profile-border-wrapper">
        <Row>
          {/* Left: Read-only details card */}
          <Col md={5}>
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <img
                  src={formData.profilePic}
                  alt="Profile"
                  className="rounded-circle mb-3"
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
                <h5>{formData.firstName} {formData.lastName}</h5>
                <p className="text-muted">{formData.email}</p>
                <p><b>Contact:</b> {formData.phone}</p>
                <p><b>Address:</b> {formData.address}</p>
              </Card.Body>
            </Card>
          </Col>
          {/* Right: Update form */}
          <Col md={7}>
            <Card className="shadow-sm profile-update-card">
              <Card.Body>
                <h4>Edit Profile</h4>
                <Form onSubmit={handleProfileUpdate}>
                <div className="text-center mb-4">
                    <img
                      src={profilePicPreview || formData.profilePic || 'https://via.placeholder.com/150'}
                      alt="Profile"
                      className="rounded-circle mb-3"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleProfilePicChange}
                      />
                      <Button variant="outline-primary" size="sm" onClick={() => fileInputRef.current.click()}>
                        Change Photo
                      </Button>
                    </div>
                    <h5>{formData.firstName} {formData.lastName}</h5>
                    <p className="text-muted">Customer</p>
                  </div>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary">Update</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      <style dangerouslySetInnerHTML={{__html: `
        .profile-border-wrapper {
          border: 1.5px solid #dee2e6;
          border-radius: 18px;
          padding: 2rem 1.5rem;
          background: #fff;
          box-shadow: 0 2px 12px rgba(0,0,0,0.03);
          margin-bottom: 2rem;
        }
        .profile-update-card {
          border: 1.5px solid #b6c2ce;
          border-radius: 14px;
          background: #f8f9fa;
        }
        .profile-upload-icon {
          transition: color 0.2s;
        }
        .profile-upload-icon:hover {
          color: #0056b3 !important;
        }
      `}} />
    </Container>
  );
};

export default CustomerProfile;