import React, { useEffect, useState } from "react";
import { Card, Row, Col, Alert, Spinner, Form, Button } from "react-bootstrap";

export default function TechnicianFeedback({ technicianId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the logged-in technician's user_id from sessionStorage
  const userId = sessionStorage.getItem('user_id');

  // General feedback form state
  const [feedbackForm, setFeedbackForm] = useState({
    target_type: 'system',
    rating: 5,
    comment: ''
  });
  const [feedbackAlert, setFeedbackAlert] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [myFeedback, setMyFeedback] = useState([]);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    // Fetch reviews where this technician is the target
    fetch(`http://localhost/gearsphere_api/GearSphere-BackEnd/getReviews.php?target_type=technician&target_id=${userId}&status=approved`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched reviews:', data); // Debug log
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(e => {
        console.error('Error fetching reviews:', e);
        setReviews([]);
        setLoading(false);
      });

    // Fetch technician's own system feedback
    if (userId) {
      fetchMyFeedback();
    }
  }, [userId]);

  const fetchMyFeedback = async () => {
    try {
      const response = await fetch(`http://localhost/gearsphere_api/GearSphere-BackEnd/getReviews.php?user_id=${userId}&target_type=system`);
      if (response.ok) {
        const data = await response.json();
        setMyFeedback(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const handleFeedbackChange = (e) => {
    setFeedbackForm({ ...feedbackForm, [e.target.name]: e.target.value });
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackLoading(true);
    setFeedbackAlert(null);

    if (!userId) {
      setFeedbackAlert({ type: 'danger', msg: 'User ID is required to submit feedback' });
      setFeedbackLoading(false);
      return;
    }

    try {
      const submitData = {
        ...feedbackForm,
        user_id: userId,
        target_id: null // For general feedback
      };

      const response = await fetch('http://localhost/gearsphere_api/GearSphere-BackEnd/addReview.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      const data = await response.json();
      if (data.success) {
        setFeedbackAlert({ type: 'success', msg: 'Feedback submitted successfully!' });
        setFeedbackForm({ target_type: 'system', rating: 5, comment: '' });
        fetchMyFeedback(); // Refresh feedback list
      } else {
        let errorMsg = data.error || data.message || 'Error submitting feedback';
        setFeedbackAlert({ type: 'danger', msg: errorMsg });
      }
    } catch (error) {
      setFeedbackAlert({ type: 'danger', msg: 'Error submitting feedback' });
    }

    setFeedbackLoading(false);
  };

  return (
    <div className="container py-4">
      {/* General Feedback Form */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Submit General Feedback</Card.Title>
          {feedbackAlert && (
            <Alert variant={feedbackAlert.type} className="mb-3">
              {feedbackAlert.msg}
            </Alert>
          )}
          <Form onSubmit={handleFeedbackSubmit}>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Rating</Form.Label>
                  <Form.Select
                    name="rating"
                    value={feedbackForm.rating}
                    onChange={handleFeedbackChange}
                    required
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n}>{n} ★</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Your Feedback</Form.Label>
              <Form.Control
                as="textarea"
                name="comment"
                value={feedbackForm.comment}
                onChange={handleFeedbackChange}
                rows={4}
                placeholder="Share your thoughts about the platform, processes, or general experience..."
                required
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              disabled={feedbackLoading}
            >
              {feedbackLoading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Submitting...
                </>
              ) : (
                'Submit Feedback'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* My Feedback History */}
      {myFeedback.length > 0 && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>My Feedback History</Card.Title>
            <Row>
              {myFeedback.map((feedback, index) => (
                <Col md={6} key={feedback.id || index} className="mb-3">
                  <Card>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-warning">{feedback.rating} ★</span>
                        <small className="text-muted">{feedback.created_at || 'Recently'}</small>
                      </div>
                      <div className="mb-2">{feedback.comment}</div>
                      <div className="text-muted small">
                        Status: <span className={`badge bg-${feedback.status === 'approved' ? 'success' : 'warning'}`}>
                          {feedback.status || 'Pending'}
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}

      <Card>
        <Card.Body>
          <Card.Title>Feedback Received</Card.Title>
          {loading ? <Spinner animation="border" /> : (
            <Row>
              {reviews.length === 0 && <Col><Alert variant="info">No feedback yet.</Alert></Col>}
              {reviews.map(r => (
                <Col md={6} key={r.id} className="mb-3">
                  <Card>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-warning">{r.rating} ★</span>
                      </div>
                      <div>{r.comment}</div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </div>
  );
} 