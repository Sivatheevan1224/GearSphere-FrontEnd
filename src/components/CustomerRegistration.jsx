import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pcGif from '../images/pc_video.gif';

const districtsList = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota',
  'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale', 'Matara',
  'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

function CustomerRegistration({ show, onHide, switchToLogin }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [contact_number, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');

  const sendOTP = async () => {
    try {
      const res = await axios.post('http://localhost/gearsphere_api/GearSphere-BackEnd/emailValidationOTP.php', { email });
      if (res.data.success) {
        setSentOtp(res.data.otp);
        toast.success('OTP sent to your email.');
        setOtpModalVisible(true);
      } else {
        toast.error(res.data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      toast.error('Error sending OTP.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !confirmPassword || !contact_number || !city || !district || !postalCode) {
      toast.error('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    await sendOTP();
  };

  const handleOtpSubmit = async () => {
    if (enteredOtp.toString().trim() !== sentOtp.toString().trim()) {
      toast.error('Incorrect OTP.');
      return;
    }
    const fullName = `${firstName} ${lastName}`;
    const fullAddress = `${city} | ${district} | ${postalCode}`;
    try {
      const res = await axios.post('http://localhost/gearsphere_api/GearSphere-BackEnd/customersignup.php', {
        name: fullName,
        email,
        password,
        contact_number,
        address: fullAddress,
        userType: 'customer',
      });
      if (res.data.status === 'success') {
        toast.success('Registration successful!');
        setTimeout(() => {
          setOtpModalVisible(false);
          onHide();
          switchToLogin();
        }, 1500);
      } else {
        toast.error(res.data.message || 'Registration failed.');
      }
    } catch (err) {
      toast.error('Error registering user.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="xl" backdrop="static">
      <div className="d-flex" style={{ minHeight: 600 }}>
        {/* Left image section */}
        <div className="d-none d-md-flex align-items-center justify-content-center bg-dark" style={{ width: 400, borderRadius: '12px 0 0 12px' }}>
          <img src={pcGif} alt="Register" style={{ width: 350, borderRadius: 12 }} />
        </div>
        {/* Right form section */}
        <div className="flex-grow-1 p-4" style={{ background: '#fff', borderRadius: '0 12px 12px 0' }}>
          <h2 className="mb-4 text-center">Customer Sign Up</h2>
          <Form onSubmit={handleRegister}>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Control placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Control placeholder="City" value={city} onChange={e => setCity(e.target.value)} required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Select value={district} onChange={e => setDistrict(e.target.value)} required>
                    <option value="">District</option>
                    {districtsList.map((d, i) => <option key={i} value={d}>{d}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Control type="tel" placeholder="Phone Number" value={contact_number} onChange={e => setPhone(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control placeholder="Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3 position-relative">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder="Create password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)', cursor: 'pointer', zIndex: 2 }}
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </span>
            </Form.Group>
            <Form.Group className="mb-3 position-relative">
              <Form.Control
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)', cursor: 'pointer', zIndex: 2 }}
              >
                {showConfirmPassword ? <EyeSlash /> : <Eye />}
              </span>
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Register as Customer
            </Button>
            <div className="text-center mt-3">
              Already have an account?{' '}
              <a href="#" onClick={() => { onHide(); switchToLogin(); }}>Login</a>
            </div>
          </Form>
        </div>
      </div>
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
    </Modal>
  );
}

export default CustomerRegistration; 