import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  Card,
  Badge,
  Alert,
} from "react-bootstrap";
import { CartContext } from "./CartContext";
import { OrdersContext } from "./OrdersContext";
import { useNavigate } from "react-router-dom";

const Checkout = ({
  show,
  onHide,
  // Custom order props for PC builds
  customOrderItems = null,
  customOrderTotal = null,
  customOrderType = null,
  onCustomOrderSuccess = null,
}) => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrdersContext);
  const [paymentMethod, setPaymentMethod] = useState("visa");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Reset states when modal is closed
  const handleClose = () => {
    setShowSuccess(false);
    setIsProcessing(false);
    setCardNumber("");
    setCardHolder("");
    setExpiryDate("");
    setCvv("");
    setErrors({});
    onHide();
  };

  // Reset success state when modal is opened
  useEffect(() => {
    if (show) {
      setShowSuccess(false);
      setIsProcessing(false);
    }
  }, [show]);

  // Use custom order data if provided, otherwise use cart data
  const orderItems =
    customOrderItems ||
    cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      quantity: item.quantity,
    }));

  const orderTotal = customOrderTotal || getCartTotal();
  const orderType = customOrderType || "Cart Order";

  const formatLKR = (amount) => "LKR " + Number(amount).toLocaleString("en-LK");

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const validateExpiryDate = (dateString) => {
    if (!dateString.match(/^\d{2}\/\d{2}$/)) {
      return "Please enter expiry date (MM/YY)";
    }

    const [month, year] = dateString.split("/");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11

    const expiryMonth = parseInt(month);
    const expiryYear = parseInt(year);

    // Check if month is valid (1-12)
    if (expiryMonth < 1 || expiryMonth > 12) {
      return "Please enter a valid month (01-12)";
    }
    // Check if year is valid (current year or future)
    else if (expiryYear < currentYear) {
      return "Card has expired";
    }
    // If same year, check if month is in the future
    else if (expiryYear === currentYear && expiryMonth < currentMonth) {
      return "Card has expired";
    }

    return null; // No error
  };

  const validateForm = () => {
    const newErrors = {};

    if (!cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
    }

    if (!cardHolder.trim()) {
      newErrors.cardHolder = "Please enter cardholder name";
    }

    const expiryError = validateExpiryDate(expiryDate);
    if (expiryError) {
      newErrors.expiryDate = expiryError;
    }

    if (!cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = "Please enter a valid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing to mimic a real-world scenario
    setTimeout(async () => {
      try {
        // Get user session from backend
        const sessionResponse = await axios.get(
          "http://localhost/gearsphere_api/GearSphere-BackEnd/getSession.php",
          { withCredentials: true }
        );

        if (!sessionResponse.data.success) {
          alert("You must be logged in to place an order.");
          setIsProcessing(false);
          return;
        }

        const user_id = sessionResponse.data.user_id;
        // Prepare payload for the backend. `orderItems` is already defined
        // to handle both cart and custom PC builds.
        const payload = {
          user_id,
          items: orderItems.map((item) => ({
            product_id: item.product_id || item.id, // Use product_id or fallback to id
            quantity: item.quantity,
            price: item.price,
          })),
          total_amount: orderTotal,
          payment_method: paymentMethod.toUpperCase(),
        };

        const response = await fetch(
          "http://localhost/gearsphere_api/GearSphere-BackEnd/createOrder.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
          }
        );

        const data = await response.json();

        if (data.success) {
          setShowSuccess(true);

          // Handle post-order actions based on order type
          if (onCustomOrderSuccess) {
            // PC Builder flow: trigger the success callback
            setTimeout(() => {
              onHide();
              onCustomOrderSuccess({
                total: orderTotal,
                items: orderItems,
                paymentMethod: payload.payment_method,
                order_id: data.order_id,
                payment_id: data.payment_id,
              });
            }, 1500);
          } else {
            // Standard cart flow: clear cart and navigate
            clearCart();
            setTimeout(() => {
              onHide();
              navigate("/orders");
            }, 1500);
          }
        } else {
          alert(data.message || "Failed to save the order. Please try again.");
          setIsProcessing(false);
        }
      } catch (err) {
        console.error("Order submission error:", err);
        alert("A network or server error occurred. Please try again later.");
        setIsProcessing(false);
      }
    }, 1500); // Simulating network delay
  };

  const getCardIcon = () => {
    return paymentMethod === "visa" ? "💳" : "💳";
  };

  const getCardPrefix = () => {
    return paymentMethod === "visa" ? "4" : "5";
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value;
    const formatted = formatCardNumber(value);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value;
    const formatted = formatExpiryDate(value);
    setExpiryDate(formatted);

    // Real-time validation
    if (formatted.length === 5) {
      // MM/YY format
      const error = validateExpiryDate(formatted);
      setErrors((prev) => ({
        ...prev,
        expiryDate: error,
      }));
    } else {
      // Clear error if not complete
      setErrors((prev) => ({
        ...prev,
        expiryDate: null,
      }));
    }
  };

  if (showSuccess) {
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body className="text-center py-5">
          <div className="mb-4">
            <div className="text-success" style={{ fontSize: "4rem" }}>
              ✅
            </div>
          </div>
          <h4 className="text-success mb-3">Payment Successful!</h4>
          <p className="text-muted">Your order has been placed successfully.</p>
          <p className="text-muted">Redirecting to orders page...</p>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {/* Order Summary */}
          <Col md={5}>
            <h5 className="mb-3">Order Summary</h5>
            <div className="border rounded p-3 mb-3">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <div>
                    <h6 className="mb-0">{item.name}</h6>
                    <small className="text-muted">Qty: {item.quantity}</small>
                  </div>
                  <span className="fw-bold">
                    {formatLKR(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Total:</h6>
                <h5 className="mb-0 text-primary">{formatLKR(orderTotal)}</h5>
              </div>
            </div>
          </Col>

          {/* Payment Form */}
          <Col md={7}>
            <h5 className="mb-3">Payment Details</h5>

            {/* Card Type Selection */}
            <div className="mb-3">
              <Form.Label>Card Type</Form.Label>
              <div className="d-flex gap-2">
                <Button
                  variant={
                    paymentMethod === "visa" ? "primary" : "outline-primary"
                  }
                  onClick={() => setPaymentMethod("visa")}
                  className="flex-fill"
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="me-2">💳</span>
                    Visa
                  </div>
                </Button>
                <Button
                  variant={
                    paymentMethod === "mastercard"
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => setPaymentMethod("mastercard")}
                  className="flex-fill"
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="me-2">💳</span>
                    Mastercard
                  </div>
                </Button>
              </div>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`${getCardPrefix()}000 0000 0000 0000`}
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength="19"
                  isInvalid={!!errors.cardNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cardNumber}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cardholder Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter cardholder name"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  isInvalid={!!errors.cardHolder}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cardHolder}
                </Form.Control.Feedback>
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      maxLength="5"
                      isInvalid={!!errors.expiryDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.expiryDate}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) =>
                        setCvv(e.target.value.replace(/\D/g, ""))
                      }
                      maxLength="4"
                      isInvalid={!!errors.cvv}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cvv}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Alert variant="info" className="mb-3">
                <small>
                  <strong>Secure Payment:</strong> Your payment information is
                  encrypted and secure. We use industry-standard SSL encryption
                  to protect your data.
                </small>
              </Alert>

              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing Payment...
                    </>
                  ) : (
                    `Pay ${formatLKR(orderTotal)}`
                  )}
                </Button>
                <Button variant="outline-secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default Checkout;
