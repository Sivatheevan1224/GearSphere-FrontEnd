import React, { useState, useContext } from "react";
import { Navbar, Container, Nav, Button, Modal, Badge, ListGroup, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Cart } from "react-bootstrap-icons";
import { CartContext } from "../pages/customer/CartContext";
import Checkout from "../pages/customer/Checkout";
import profile1 from '../images/profile/pp1.png';

function CustomerNavbar({ fixed = "top" }) {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useContext(CartContext);

  const formatLKR = (amount) => 'LKR ' + Number(amount).toLocaleString('en-LK');

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    setShowCartModal(false);
    setShowCheckoutModal(true);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4" fixed={fixed} expanded={expanded} onToggle={setExpanded}>
        <Container>
          <Navbar.Brand as={Link} to="/customer/dashboard" onClick={() => setExpanded(false)}>
            <img
              src="/src/images/logo.PNG"
              alt="GearSphere Logo"
              style={{ height: "70px", width: "80px", marginRight: 8 }}
            />
            <span className="fw-bold">GearSphere</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="customer-navbar-nav" />
          <Navbar.Collapse id="customer-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/customer/dashboard" onClick={() => setExpanded(false)}>Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/marketplace" onClick={() => setExpanded(false)}>Marketplace</Nav.Link>
              <Nav.Link as={Link} to="/pc-builder" onClick={() => setExpanded(false)}>PC Builder</Nav.Link>
              <Nav.Link as={Link} to="/orders" onClick={() => setExpanded(false)}>My Orders</Nav.Link>
            </Nav>
            <div className="d-flex align-items-center">
              <Bell size={22} className="me-3 cursor-pointer text-secondary" style={{ verticalAlign: 'middle' }} />
              <div className="position-relative me-3">
                <Cart 
                  size={22} 
                  className="cursor-pointer text-secondary" 
                  style={{ verticalAlign: 'middle' }}
                  onClick={() => setShowCartModal(true)}
                />
                {getCartCount() > 0 && (
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: '0.7rem' }}
                  >
                    {getCartCount()}
                  </Badge>
                )}
              </div>
              <Nav.Link as={Link} to="/profile" className="d-flex align-items-center p-0 ms-2">
                <img
                  src={profile1}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: 40, height: 40, objectFit: 'cover', border: '2px solid #4361ee' }}
                />
              </Nav.Link>
              <Button variant="outline-danger" onClick={() => setShowLogoutModal(true)} className="ms-3">
                Logout
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Cart Modal */}
      <Modal show={showCartModal} onHide={() => setShowCartModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart ({getCartCount()} items)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.length === 0 ? (
            <div className="text-center py-4">
              <Cart size={48} className="text-muted mb-3" />
              <h5 className="text-muted">Your cart is empty</h5>
              <p className="text-muted">Add some products from the marketplace to get started!</p>
            </div>
          ) : (
            <>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className="d-flex align-items-center">
                    <img
                      src={item.image || "/placeholder.svg?height=60&width=60"}
                      alt={item.name}
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      className="rounded me-3"
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{item.name}</h6>
                      <p className="text-muted mb-1">{item.category}</p>
                      <p className="text-primary mb-0 fw-bold">{formatLKR(item.price)}</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                        style={{ width: '70px' }}
                        className="me-2"
                      />
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="border-top pt-3 mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Total:</h5>
                  <h5 className="mb-0 text-primary">{formatLKR(getCartTotal())}</h5>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCartModal(false)}>
            Continue Shopping
          </Button>
          {cartItems.length > 0 && (
            <Button variant="primary" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Checkout Modal */}
      <Checkout 
        show={showCheckoutModal} 
        onHide={() => setShowCheckoutModal(false)} 
      />

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to logout?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomerNavbar; 