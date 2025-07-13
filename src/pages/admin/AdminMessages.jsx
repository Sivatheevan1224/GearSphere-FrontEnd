import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Alert, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost/gearsphere_api/GearSphere-BackEnd/getMessages.php');
        setMessages(Array.isArray(res.data) ? res.data : []);
        setError(null);
      } catch (err) {
        setMessages([]);
        setError('Failed to load messages.');
      }
      setLoading(false);
    };
    fetchMessages();
  }, []);

  const handleDelete = async () => {
    if (!messageToDelete) return;
    try {
      const res = await axios.post('http://localhost/gearsphere_api/GearSphere-BackEnd/deleteMessage.php', { message_id: messageToDelete });
      if (res.data.success) {
        setMessages(messages.filter(msg => msg.message_id !== messageToDelete));
        toast.success('Message deleted successfully.');
      } else {
        toast.error(res.data.message || 'Failed to delete message.');
      }
    } catch (err) {
      toast.error('Failed to delete message.');
    }
    setShowDeleteModal(false);
    setMessageToDelete(null);
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Contact Messages</h1>
      <Card>
        <Card.Body>
          {loading ? (
            <Spinner animation="border" />
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : messages.length === 0 ? (
            <div className="text-muted">No messages found.</div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map(msg => (
                  <tr key={msg.message_id}>
                    <td>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td style={{whiteSpace: 'pre-line', maxWidth: 400}}>{msg.message}</td>
                    <td>{new Date(msg.date).toLocaleString()}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => { setShowDeleteModal(true); setMessageToDelete(msg.message_id); }}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      <Modal show={showDeleteModal} onHide={() => { setShowDeleteModal(false); setMessageToDelete(null); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this message? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowDeleteModal(false); setMessageToDelete(null); }}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminMessages; 