import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Alert, Spinner } from "react-bootstrap";

export default function AdminModerateReviews() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost/gearsphere_api/GearSphere-BackEnd/getReviews.php?status=pending")
      .then(res => res.json())
      .then(data => {
        setPending(data);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
      });
  }, []);

  const moderate = async (id, status) => {
    setAlert(null);
    try {
      const res = await fetch("http://localhost/gearsphere_api/GearSphere-BackEnd/moderateReview.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setPending(pending.filter(r => r.id !== id));
        setAlert({ type: "success", msg: `Review ${status}` });
      } else {
        setAlert({ type: "danger", msg: data.error || "Error moderating review" });
      }
    } catch (e) {
      setAlert({ type: "danger", msg: "Error moderating review" });
    }
  };

  return (
    <div className="container py-4">
      <Card>
        <Card.Body>
          <Card.Title>Pending Reviews</Card.Title>
          {alert && <Alert variant={alert.type}>{alert.msg}</Alert>}
          {loading ? <Spinner animation="border" /> : (
            <Row>
              {pending.length === 0 && <Col><Alert variant="info">No pending reviews.</Alert></Col>}
              {pending.map(r => (
                <Col md={6} key={r.id} className="mb-3">
                  <Card>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold">{r.target_type === "part" ? "Part" : "Technician"} #{r.target_id}</span>
                        <span className="text-warning">{r.rating} ★</span>
                      </div>
                      <div>{r.comment}</div>
                      <div className="mt-3">
                        <Button variant="success" size="sm" className="me-2" onClick={() => moderate(r.id, "approved")}>Approve</Button>
                        <Button variant="danger" size="sm" onClick={() => moderate(r.id, "rejected")}>Reject</Button>
                      </div>
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