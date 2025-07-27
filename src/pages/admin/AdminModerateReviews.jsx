import React, { useEffect, useState } from "react";
import { Card, Button, Spinner, Table, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function AdminModerateReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost/gearsphere_api/GearSphere-BackEnd/getReviews.php")
      .then((res) => res.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  const moderate = async (id, status) => {
    try {
      const res = await fetch(
        "http://localhost/gearsphere_api/GearSphere-BackEnd/moderateReview.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setReviews(reviews.map((r) => (r.id === id ? { ...r, status } : r)));
        toast.success(`Review ${status}`);
      } else {
        toast.error(data.error || "Error moderating review");
      }
    } catch (e) {
      toast.error("Error moderating review");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(
        "http://localhost/gearsphere_api/GearSphere-BackEnd/deleteReview.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: deleteId }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setReviews(reviews.filter((r) => r.id !== deleteId));
        toast.success("Review deleted");
      } else {
        toast.error(data.error || "Error deleting review");
      }
    } catch (e) {
      toast.error("Error deleting review");
    }
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div className="container py-4">
      <Card>
        <Card.Body>
          <Card.Title>All Reviews</Card.Title>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Reviewer</th>
                  <th>Reviewer Type</th>
                  <th>Target</th>
                  <th>Target Email</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length === 0 && (
                  <tr>
                    <td colSpan={7}>
                      <span className="text-muted">No reviews found.</span>
                    </td>
                  </tr>
                )}
                {reviews.map((r) => (
                  <tr key={r.id}>
                    <td>{r.sender_name}</td>
                    <td>{r.sender_type}</td>
                    <td>
                      {r.target_type === "system"
                        ? "System"
                        : `Technician #${r.target_id}`}
                    </td>
                    <td>{r.target_email ? r.target_email : "-"}</td>
                    <td>{r.rating}★</td>
                    <td>{r.comment}</td>
                    <td>{r.status}</td>
                    <td>
                      {r.status !== "approved" && (
                        <Button
                          size="sm"
                          variant="success"
                          className="me-1"
                          onClick={() => moderate(r.id, "approved")}
                        >
                          Approve
                        </Button>
                      )}
                      {r.status !== "rejected" && (
                        <Button
                          size="sm"
                          variant="warning"
                          className="me-1"
                          onClick={() => moderate(r.id, "rejected")}
                        >
                          Reject
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteClick(r.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this review?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
