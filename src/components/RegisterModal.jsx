import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { Upload, GeoAlt, Person, Tools, Telephone, GeoAltFill } from 'react-bootstrap-icons';

function RegisterModal({ show, onHide, switchToLogin }) {
  const [userType, setUserType] = useState('customer');
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Sri Lankan districts
  const sriLankanDistricts = [
    "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", 
    "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", 
    "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", 
    "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", 
    "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
  ];

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Only allow customer or technician
    const role = userType === 'customer' ? 'customer' : (userType === 'builder' ? 'technician' : '');
    if (!role) {
      setError("Please select a valid user type.");
      return;
    }
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem("gs_users") || "[]");
    if (users.some(u => u.email === email)) {
      setError("Email already registered.");
      return;
    }
    users.push({ email, password, role });
    localStorage.setItem("gs_users", JSON.stringify(users));
    setSuccess("Registration successful! You can now log in.");
    setTimeout(() => {
      onHide();
      switchToLogin();
    }, 1200);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create an Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-4">
            <Form.Label>Register as</Form.Label>
            <Row className="mt-2">
              <Col xs={6}>
                <div 
                  className={`user-type-card ${userType === 'customer' ? 'selected' : ''}`}
                  onClick={() => setUserType('customer')}
                  style={{
                    border: userType === 'customer' ? '2px solid #0d6efd' : '1px solid #dee2e6',
                    borderRadius: '8px',
                    padding: '15px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: userType === 'customer' ? 'rgba(13, 110, 253, 0.05)' : 'white',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Person size={32} className={userType === 'customer' ? 'text-primary mb-2' : 'text-muted mb-2'} />
                  <div className={userType === 'customer' ? 'fw-bold text-primary' : ''}>Customer</div>
                  <input 
                    type="radio" 
                    name="userType" 
                    id="customer" 
                    checked={userType === 'customer'} 
                    onChange={() => setUserType('customer')} 
                    className="d-none" 
                  />
                </div>
              </Col>
              <Col xs={6}>
                <div 
                  className={`user-type-card ${userType === 'builder' ? 'selected' : ''}`}
                  onClick={() => setUserType('builder')}
                  style={{
                    border: userType === 'builder' ? '2px solid #0d6efd' : '1px solid #dee2e6',
                    borderRadius: '8px',
                    padding: '15px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: userType === 'builder' ? 'rgba(13, 110, 253, 0.05)' : 'white',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Tools size={32} className={userType === 'builder' ? 'text-primary mb-2' : 'text-muted mb-2'} />
                  <div className={userType === 'builder' ? 'fw-bold text-primary' : ''}>PC Builder</div>
                  <input 
                    type="radio" 
                    name="userType" 
                    id="builder" 
                    checked={userType === 'builder'} 
                    onChange={() => setUserType('builder')} 
                    className="d-none" 
                  />
                </div>
              </Col>
            </Row>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required />
          </Form.Group>

          {/* Phone Number Field - Added for both user types */}
          <Form.Group className="mb-3">
            <Form.Label>
              <Telephone className="me-1" /> Phone Number
            </Form.Label>
            <Form.Control 
              type="tel" 
              placeholder="Enter phone number (e.g., 071 234 5678)" 
            />
            <Form.Text className="text-muted">
              Enter a valid Sri Lankan phone number
            </Form.Text>
          </Form.Group>

          {/* Address Fields - Added for both user types */}
          <Form.Group className="mb-3">
            <Form.Label>
              <GeoAltFill className="me-1" /> Address
            </Form.Label>
            <Row>
              <Col md={12} className="mb-2">
                <Form.Control 
                  placeholder="Street Address" 
                />
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-2">
                <Form.Control 
                  placeholder="City" 
                />
              </Col>
              <Col md={6} className="mb-2">
                <Form.Select>
                  <option value="">Select District</option>
                  {sriLankanDistricts.map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Control 
                  placeholder="Postal Code" 
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Create password" value={password} onChange={e => setPassword(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          </Form.Group>

          {userType === 'builder' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Years of Experience</Form.Label>
                <Form.Control type="number" placeholder="Enter years of experience" min="0" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Specialization</Form.Label>
                <Form.Select>
                  <option>Select specialization</option>
                  <option>Gaming PCs</option>
                  <option>Workstations</option>
                  <option>Custom Water Cooling</option>
                  <option>Small Form Factor</option>
                  <option>General PC Building</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Upload CV/Resume</Form.Label>
                <div 
                  className={`border rounded p-4 text-center ${dragActive ? 'bg-light border-primary' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {file ? (
                    <div className="text-success">
                      <p className="mb-0">File uploaded: {file.name}</p>
                      <Button 
                        variant="link" 
                        className="p-0 text-danger" 
                        onClick={() => setFile(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload size={32} className="text-muted mb-2" />
                      <p className="mb-2">Drag and drop your CV/Resume here</p>
                      <p className="text-muted small mb-3">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                      <div>
                        <label className="btn btn-outline-primary">
                          Browse Files
                          <input 
                            type="file" 
                            className="d-none" 
                            accept=".pdf,.doc,.docx" 
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </Form.Group>
            </>
          )}

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="I agree to the Terms of Service and Privacy Policy"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Create Account
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <p className="mb-0">
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onHide();          // Close register modal
              switchToLogin();   // Show login modal
            }}
            className="text-decoration-none"
          >
            Login
          </a>
        </p>
      </Modal.Footer>
    </Modal>
  );
}

export default RegisterModal;