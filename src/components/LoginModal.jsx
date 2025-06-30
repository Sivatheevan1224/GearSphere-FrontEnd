import { useState, useEffect } from "react"
import { Modal, Button, Form, Alert, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import loginImage from "../images/login.jpg"
import "./loginmodal.css"

function LoginModal({ show, onHide, switchToRegister }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotStep, setForgotStep] = useState(1)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotError, setForgotError] = useState("")
  const [enteredOtp, setEnteredOtp] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const backdrop = document.querySelector(".modal-backdrop")
    if (backdrop) {
      backdrop.style.backdropFilter = "blur(10px)"
      backdrop.style.webkitBackdropFilter = "blur(10px)"
    }
  }, [show])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (email === "customer1@gmail.com" && password === "customer1") {
      onHide()
      navigate("/customer/dashboard")
      return
    }
    if (email === "admin@gmail.com" && password === "admin") {
      onHide()
      navigate("/admin")
      return
    }
    if (email === "pctechnician1@gmail.com" && password === "pctechnician1") {
      onHide()
      navigate("/technician/dashboard")
      return
    }
    if (email === "seller@gmail.com" && password === "seller") {
      onHide()
      navigate("/seller")
      return
    }

    const users = JSON.parse(localStorage.getItem("gs_users") || "[]")
    const found = users.find(u => u.email === email && u.password === password)
    if (found) {
      onHide()
      if (found.role === "customer") navigate("/customer/dashboard")
      else if (found.role === "technician") navigate("/technician/dashboard")
      else navigate("/")
      return
    }
    setError("Invalid email or password.")
  }

  const handleForgotPasswordClick = () => {
    setShowForgotModal(true)
    setForgotStep(1)
    setForgotEmail("")
    setForgotError("")
    setEnteredOtp("")
    setOtp("")
    setNewPassword("")
    if (typeof onHide === 'function') onHide(); // Hide login modal
  }

  // Helper to re-show login modal after forgot password success
  const handleForgotModalCloseAndShowLogin = () => {
    setShowForgotModal(false);
    if (typeof switchToRegister === 'function') {
      // do nothing, only for register
    } else if (typeof onHide === 'function') {
      // Show login modal again if parent controls it
      onHide(false);
    }
  }

  return (
    <>
      {/* Show login modal only if not in forgot password flow */}
      <Modal
        show={show && !showForgotModal}
        onHide={onHide}
        className="custom-login-modal"
        dialogClassName="custom-login-modal"
        backdropClassName="custom-login-backdrop"
        keyboard={true}
        scrollable={false}
      >
        <div className="modal-content login">
          <div className="login-img">
            <img src={loginImage} alt="Login Visual" />
          </div>
          <div className="login-form">
            <Modal.Header closeButton className="border-0 pb-0" />
            <Modal.Title className="mb-3">Login to GearSphere</Modal.Title>
            <Modal.Body className="px-0">
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(prev => !prev)}
                      tabIndex={-1}
                      style={{ borderLeft: 0 }}
                    >
                      {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>
                <div className="d-flex justify-content-end align-items-center mb-3">
                  <a
                    href="#"
                    onClick={handleForgotPasswordClick}
                  >
                    Forgot password?
                  </a>
                </div>
                <Button type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center border-0 px-0">
              <p className="mb-0">
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onHide()
                    switchToRegister()
                  }}
                >
                  Register
                </a>
              </p>
            </Modal.Footer>
          </div>
        </div>
      </Modal>

      {/* Forgot Password Step 1: Enter Email */}
      <Modal show={showForgotModal && forgotStep === 1} onHide={() => setShowForgotModal(false)} className="modal-top">
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {forgotError && <Alert variant="danger">{forgotError}</Alert>}
          <Form onSubmit={e => {
            e.preventDefault();
            setForgotError("");
            const users = JSON.parse(localStorage.getItem("gs_users") || "[]");
            const found = users.find(u => u.email === forgotEmail);
            if (!found) {
              setForgotError("Email not found.");
              return;
            }
            setForgotStep(2);
          }}>
            <Form.Group className="mb-3">
              <Form.Label>Enter your registered email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Next
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Forgot Password Step 2: Request OTP */}
      <Modal show={showForgotModal && forgotStep === 2} onHide={() => setShowForgotModal(false)} className="modal-top">
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Email found: <b>{forgotEmail}</b></p>
          <Button variant="primary" className="w-100" onClick={() => {
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
            setOtp(generatedOtp);
            setForgotStep(3);
            alert(`Your OTP is: ${generatedOtp}`);
          }}>
            Request OTP
          </Button>
        </Modal.Body>
      </Modal>

      {/* Forgot Password Step 3: Enter OTP */}
      <Modal show={showForgotModal && forgotStep === 3} onHide={() => setShowForgotModal(false)} className="modal-top">
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {forgotError && <Alert variant="danger">{forgotError}</Alert>}
          <p>An OTP has been sent to your email: <b>{forgotEmail}</b></p>
          <Form onSubmit={e => {
            e.preventDefault();
            setForgotError("");
            if (enteredOtp === otp) {
              setForgotStep(4);
            } else {
              setForgotError("Invalid OTP. Please try again.");
            }
          }}>
            <Form.Group className="mb-3">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                value={enteredOtp}
                onChange={e => setEnteredOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Verify OTP
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Forgot Password Step 4: Enter New Password */}
      <Modal show={showForgotModal && forgotStep === 4} onHide={() => setShowForgotModal(false)} className="modal-top">
        <Modal.Header closeButton>
          <Modal.Title>Set New Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {forgotError && <Alert variant="danger">{forgotError}</Alert>}
          <Form onSubmit={e => {
            e.preventDefault();
            setForgotError("");
            if (!newPassword) {
              setForgotError("Please enter a new password.");
              return;
            }
            const users = JSON.parse(localStorage.getItem("gs_users") || "[]");
            const idx = users.findIndex(u => u.email === forgotEmail);
            if (idx !== -1) {
              users[idx].password = newPassword;
              localStorage.setItem("gs_users", JSON.stringify(users));
              setForgotStep(5);
            } else {
              setForgotError("Unexpected error. Please try again.");
            }
          }}>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Forgot Password Step 5: Success */}
      <Modal show={showForgotModal && forgotStep === 5} onHide={handleForgotModalCloseAndShowLogin} className="modal-top">
        <Modal.Header closeButton>
          <Modal.Title>Password Changed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success">Your password has been changed successfully. You can now log in with your new password.</Alert>
          <Button variant="primary" className="w-100" onClick={handleForgotModalCloseAndShowLogin}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default LoginModal
