import { useState } from "react"
import { Modal, Button, Form, Alert, InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { BsEye, BsEyeSlash } from "react-icons/bs"

function LoginModal({ show, onHide, switchToRegister }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  // Forgot password states
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotError, setForgotError] = useState("")
  const [forgotStep, setForgotStep] = useState(1) // 1=email, 2=otp, 3=new password, 4=success
  const [otp, setOtp] = useState("")
  const [enteredOtp, setEnteredOtp] = useState("")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    // Hardcoded users
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
    // Check registered users in localStorage
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

  // Forgot password handlers
  const handleForgotPasswordClick = () => {
    setShowForgotModal(true)
    setForgotStep(1)
    setForgotEmail("")
    setForgotError("")
    setEnteredOtp("")
    setOtp("")
    setNewPassword("")
    // Hide login modal
    if (onHide) onHide();
  }

  // Helper to close forgot password and re-show login modal
  const handleForgotModalClose = () => {
    setShowForgotModal(false);
    if (show === false && typeof onHide === 'function') {
      // If parent controls show, do nothing
    } else {
      // If parent expects to re-show login, trigger it
      // (You may need to trigger a parent state update here if needed)
    }
  }

  const handleForgotEmailSubmit = (e) => {
    e.preventDefault()
    setForgotError("")
    const users = JSON.parse(localStorage.getItem("gs_users") || "[]")
    const found = users.find(u => u.email === forgotEmail)
    if (!found) {
      setForgotError("Email not found.")
      return
    }
    setForgotStep(2)
  }

  const handleRequestOtp = () => {
    // Simulate OTP sending
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setOtp(generatedOtp)
    setForgotStep(3)
    // For demo: show OTP in alert
    alert(`Your OTP is: ${generatedOtp}`)
  }

  const handleOtpSubmit = (e) => {
    e.preventDefault()
    setForgotError("")
    if (enteredOtp === otp) {
      setForgotStep(4)
    } else {
      setForgotError("Invalid OTP. Please try again.")
    }
  }

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault()
    setForgotError("")
    if (!newPassword) {
      setForgotError("Please enter a new password.")
      return
    }
    // Update password in localStorage
    const users = JSON.parse(localStorage.getItem("gs_users") || "[]")
    const idx = users.findIndex(u => u.email === forgotEmail)
    if (idx !== -1) {
      users[idx].password = newPassword
      localStorage.setItem("gs_users", JSON.stringify(users))
      setForgotStep(5)
    } else {
      setForgotError("Unexpected error. Please try again.")
    }
  }

  return (
    <>
      <Modal show={show && !showForgotModal} onHide={onHide} centered className="modal-top">
        <Modal.Header closeButton>
          <Modal.Title>Login to GearSphere</Modal.Title>
        </Modal.Header>

        <Modal.Body>
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
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  style={{ borderLeft: 0 }}
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <div className="d-flex justify-content-end align-items-center mb-3">
              <a href="#" className="text-decoration-none" onClick={handleForgotPasswordClick}>
                Forgot password?
              </a>
            </div>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer className="justify-content-center">
          <p className="mb-0">
            Don't have an account?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onHide();          // Close login modal
                switchToRegister(); // Show register modal
              }}
              className="text-decoration-none"
            >
              Register
            </a>
          </p>
        </Modal.Footer>
      </Modal>

      {/* Forgot Password Step 1: Enter Email */}
      <Modal show={showForgotModal && forgotStep === 1} onHide={handleForgotModalClose} className="modal-top">
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {forgotError && <Alert variant="danger">{forgotError}</Alert>}
          <Form onSubmit={handleForgotEmailSubmit}>
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
      <Modal show={showForgotModal && forgotStep === 2} onHide={handleForgotModalClose} className="modal-top">
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Email found: <b>{forgotEmail}</b></p>
          <Button variant="primary" className="w-100" onClick={handleRequestOtp}>
            Request OTP
          </Button>
        </Modal.Body>
      </Modal>

      {/* Forgot Password Step 3: Enter OTP */}
      <Modal show={showForgotModal && forgotStep === 3} onHide={handleForgotModalClose} className="modal-top">
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {forgotError && <Alert variant="danger">{forgotError}</Alert>}
          <p>An OTP has been sent to your email: <b>{forgotEmail}</b></p>
          <Form onSubmit={handleOtpSubmit}>
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
      <Modal show={showForgotModal && forgotStep === 4} onHide={handleForgotModalClose} className="modal-top">
        <Modal.Header closeButton>
          <Modal.Title>Set New Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {forgotError && <Alert variant="danger">{forgotError}</Alert>}
          <Form onSubmit={handleNewPasswordSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  tabIndex={-1}
                  style={{ borderLeft: 0 }}
                >
                  {showNewPassword ? <BsEyeSlash /> : <BsEye />}
                </Button>
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Forgot Password Step 5: Success */}
      <Modal show={showForgotModal && forgotStep === 5} onHide={handleForgotModalClose} className="modal-top">
        <Modal.Header closeButton>
          <Modal.Title>Password Changed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success">Your password has been changed successfully. You can now log in with your new password.</Alert>
          <Button variant="primary" className="w-100" onClick={() => setShowForgotModal(false)}>
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default LoginModal
