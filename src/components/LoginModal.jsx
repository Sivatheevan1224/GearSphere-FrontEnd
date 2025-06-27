"use client"

import { useState } from "react"
import { Modal, Button, Form, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

function LoginModal({ show, onHide, switchToRegister }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    // Hardcoded users
    if (email === "customer1@gmail.com" && password === "customer1") {
      onHide()
      navigate("/customer")
      return
    }
    if (email === "admin@gmail.com" && password === "admin") {
      onHide()
      navigate("/admin")
      return
    }
    if (email === "pctechnician1@gmail.com" && password === "pctechnician1") {
      onHide()
      navigate("/technician")
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
      if (found.role === "customer") navigate("/customer")
      else if (found.role === "technician") navigate("/technician")
      else navigate("/")
      return
    }
    setError("Invalid email or password.")
  }

  return (
    <Modal show={show} onHide={onHide} centered>
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
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Check type="checkbox" label="Remember me" />
            <a href="#" className="text-decoration-none">
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
  )
}

export default LoginModal
