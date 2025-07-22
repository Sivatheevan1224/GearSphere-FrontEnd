import React, { useEffect, useState } from "react";
import { Card, Row, Col, Alert, Spinner } from "react-bootstrap";

export default function TechnicianFeedback({ technicianId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost/gearsphere_api/GearSphere-BackEnd/getReviews.php?target_type=technician&target_id=${technicianId}&status=approved`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
      });
  }, [technicianId]);

  return (
    <div className="container py-4">
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