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
                  <div onClick={() => setUserType("customer")} className={`p-3 border rounded text-center ${userType === 'customer' ? 'border-primary bg-light' : ''}} style={{ cursor: "pointer" }`}>
                    <Person size={24} className="mb-2" />
                    <div>Customer</div>
                  </div>
                </Col>
                <Col>
                  <div onClick={() => setUserType("builder")} className={`p-3 border rounded text-center ${userType === 'builder' ? 'border-primary bg-light' : ''}} style={{ cursor: "pointer" }`}>
                    <Tools size={24} className="mb-2" />
                    <div>PC Builder</div>
                  </div>
                </Col>
              </Row>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control value={firstName} onChange={e => setFirstName(e.target.value)} required />
                </Form.Group>
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
    </>
  );
}

export default RegisterModal;