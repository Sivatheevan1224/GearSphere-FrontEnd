import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Upload, GeoAltFill, Person, Tools, Telephone } from 'react-bootstrap-icons';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterModal({ show, onHide, switchToLogin }) {
  const [userType, setUserType] = useState('customer');
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contact_number, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [registeringAs, setRegisteringAs] = useState('customer');

  const districtsList = [ "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota",
                          "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara",
                          "Monaragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya" 
                        ];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [pendingUser, setPendingUser] = useState(null);
  const [showRequestOTPModal, setShowRequestOTPModal] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const sendOTP = async () => {
    try {
      const res = await axios.post("http://localhost/gearsphere_api/GearSphere-BackEnd/emailValidationOTP.php", { email });
      if (res.data.success) {
        setSentOtp(res.data.otp);
        toast.success("OTP sent to your email.");
        setOtpModalVisible(true);
        //console.log("OTP Response:", res);

      } else {
        toast.error(res.data.message || "Failed to send OTP.");
        //console.log("OTP Response:", res);
      }
    } catch (err) {
      toast.error("Error sending OTP.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !confirmPassword || !contact_number || !city || !district || !postalCode) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }


    setRegisteringAs(userType);
    await sendOTP();
  };

  const handleOtpSubmit = async () => {
  // Trim and compare OTPs as strings
  if (enteredOtp.toString().trim() !== sentOtp.toString().trim()) {
    toast.error("Incorrect OTP.");
    return;
  }
  const fullName = `${firstName} ${lastName}`;
  const fullAddress = `${city} | ${district} | ${postalCode}`;
  // Prepare form data for registration
  const formData = new FormData();
  formData.append("name", fullName);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("contact_number", contact_number);
  formData.append("address", fullAddress);
  formData.append("userType", registeringAs === "builder" ? "technician" : "customer");

    const newUser = { email, password, role };
    setPendingUser(newUser);
    setRegisteredEmail(email);
    setShowRequestOTPModal(true);
  };

  const handleRequestOTP = () => {
    // Simulate OTP sending
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    setShowRequestOTPModal(false);
    setShowOTPModal(true);
    alert(`Your OTP is: ${generatedOtp}`);
  };

  const handleOTPInputChange = (e) => {
    setEnteredOtp(e.target.value);
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    if (!enteredOtp) {
      setError('Please enter the OTP.');
      return;
    }
    if (enteredOtp === otp) {
      // Now save the user
      const users = JSON.parse(localStorage.getItem("gs_users") || "[]");
      if (pendingUser && !users.some(u => u.email === pendingUser.email)) {
        users.push(pendingUser);
    localStorage.setItem("gs_users", JSON.stringify(users));
      }
      setShowOTPModal(false);
      setSuccess("Registration and OTP verification successful! You can now log in.");
    setTimeout(() => {
      onHide();
      switchToLogin();
    }, 1200);
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <>
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


  if (registeringAs === "builder") {
    formData.append("experience", experience);
    formData.append("specialization", specialization);
    if (file) formData.append("cv", file);
  }

  try {
    const res = await axios.post("http://localhost/gearsphere_api/GearSphere-BackEnd/customersignup.php", formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // explicit header for FormData
      }
    });


    if (res.data.status === "success") {
      toast.success("Registration successful!");
      setTimeout(() => {
        setOtpModalVisible(false);
        onHide();
        switchToLogin();
      }, 1500);
    } else {
      toast.error(res.data.message || "Registration failed.");
    }
  } 
   catch (err) {
  console.error("Signup Error:", err);
  if (err.response) {
    // Server responded with a status other than 2xx
    console.error("Server responded with error:", err.response.data);
    toast.error(`Server Error: ${err.response.data.message || "Check PHP error log"}`);
  } else if (err.request) {
    // Request was made but no response
    console.error("No response received:", err.request);
    toast.error("No response from server. Check if PHP backend is running.");
  } else {
    // Other error
    console.error("Axios error:", err.message);
    toast.error("Request setup error.");
  }
}

  // catch (err) {
  //   console.error("Signup Error:", err);
  //   toast.error("Error registering user.");
  // }
};

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create an Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-4">
              <Form.Label>Register as</Form.Label>
              <Row>
                <Col>
                  <div onClick={() => setUserType("customer")} className={`p-3 border rounded text-center ${userType === 'customer' ? 'border-primary bg-light' : ''}`} style={{ cursor: "pointer" }}>
                    <Person size={24} className="mb-2" />
                    <div>Customer</div>
                  </div>
                </Col>
                <Col>
                  <div onClick={() => setUserType("builder")} className={`p-3 border rounded text-center ${userType === 'builder' ? 'border-primary bg-light' : ''}`} style={{ cursor: "pointer" }}>
                    <Tools size={24} className="mb-2" />
                    <div>PC Builder</div>
                  </div>
                </Col>
              </Row>
            </Form.Group>

          {/* Phone Number Field - Added for both user types */}
          <Form.Group className="mb-3">
            <Form.Label>
              <Telephone className="me-1" /> Phone Number
            </Form.Label>
            <Form.Control 
              type="tel" 
                placeholder="07X XXX XXXX" 
                pattern="0[0-9]{2} [0-9]{3} [0-9]{4}" 
                title="Enter a valid Sri Lankan phone number (e.g., 077 123 4567)" 
            />
            <Form.Text className="text-muted">
              Enter a valid Sri Lankan phone number
            </Form.Text>
          </Form.Group>


            <Row>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control value={firstName} onChange={e => setFirstName(e.target.value)} required />
                </Form.Group>

              <Col md={6} className="mb-2">
                <Form.Control 
                    placeholder="City (e.g., Colombo)" 
                />

              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control value={lastName} onChange={e => setLastName(e.target.value)} required />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><Telephone className="me-1" />Phone Number</Form.Label>
              <Form.Control type="tel" value={contact_number} onChange={e => setPhone(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label><GeoAltFill className="me-1" />Address</Form.Label>
              <Row>
                <Col><Form.Control placeholder="City" value={city} onChange={e => setCity(e.target.value)} required /></Col>
                <Col>
                  <Form.Select value={district} onChange={e => setDistrict(e.target.value)} required>
                    <option value="">Select District</option>
                    {districtsList.map((d, i) => <option key={i} value={d}>{d}</option>)}
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col><Form.Control placeholder="Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} required /></Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </Form.Group>

            {userType === 'builder' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Experience (Years)</Form.Label>
                  <Form.Control type="number" value={experience} onChange={e => setExperience(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Select value={specialization} onChange={e => setSpecialization(e.target.value)}>
                    <option>Select</option>
                    <option>Gaming PCs</option>
                    <option>Workstations</option>
                    <option>Custom Water Cooling</option>
                    <option>Small Form Factor</option>
                    <option>General PC Building</option>
                  </Form.Select>
                </Form.Group> 
                <Form.Group className="mb-4">
                  <Form.Label>Upload CV</Form.Label>
                  <div className={`p-3 border rounded text-center ${dragActive ? 'border-primary bg-light' : ''}`} onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}>
                    {file ? (
                      <div>
                        <p>Uploaded: {file.name}</p>
                        <Button size="sm" variant="danger" onClick={() => setFile(null)}>Remove</Button>
                      </div>
                    ) : (
                      <>
                        <Upload size={24} className="mb-2" />
                        <p>Drag and drop or browse your CV</p>
                        <Form.Control type="file" accept=".pdf,.doc,.docx" onChange={e => setFile(e.target.files[0])} />
                      </>
                    )}
                  </div>
                </Form.Group>
              </>
            )}

            <Button type="submit" variant="primary" className="w-100">Create Account</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <span>
            Already have an account?{" "}
            <a href="#" onClick={() => { onHide(); switchToLogin(); }}>Login</a>
          </span>
        </Modal.Footer>
      </Modal>

      {/* OTP Modal */}
      <Modal show={otpModalVisible} onHide={() => setOtpModalVisible(false)} centered>
        <Modal.Header closeButton><Modal.Title>Verify OTP</Modal.Title></Modal.Header>
        <Modal.Body>
          <p>Enter the OTP sent to your email:</p>
          <Form.Control type="text" value={enteredOtp} onChange={e => setEnteredOtp(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOtpModalVisible(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleOtpSubmit}>Verify</Button>
        </Modal.Footer>
      </Modal>


      <ToastContainer />

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
      {/* Request OTP Modal */}
      <Modal show={showRequestOTPModal} onHide={() => setShowRequestOTPModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Request OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Click the button below to request an OTP for email verification.</p>
          <Button variant="primary" className="w-100" onClick={handleRequestOTP}>
            Request OTP
          </Button>
        </Modal.Body>
      </Modal>
      {/* Inline OTP Modal */}
      <Modal show={showOTPModal} onHide={() => setShowOTPModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>An OTP has been sent to your email: <b>{registeredEmail}</b></p>
          <Form onSubmit={handleOTPSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                value={enteredOtp}
                onChange={handleOTPInputChange}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
              />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button variant="primary" type="submit">
              Verify OTP
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </>
  );
}

export default RegisterModal;
