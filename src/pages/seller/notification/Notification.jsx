import React, { useEffect, useState } from "react";
import {
  Overlay,
  Popover,
  ListGroup,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import axios from "axios";
import "./Notification.css";

const Notification = ({ show, target, onHide, onDeleted }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show) {
      fetchNotifications();
    }
    // eslint-disable-next-line
  }, [show]);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost/gearsphere_api/GearSphere-BackEnd/getSellerNotification.php`,
        {
          withCredentials: true,
        }
      );
      setNotifications(response.data.notifications || []);
    } catch (err) {
      setError("Failed to fetch notifications.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (notification_id) => {
    try {
      await axios.delete(
        "http://localhost/gearsphere_api/GearSphere-BackEnd/getSellerNotification.php",
        {
          data: { notification_id },
          withCredentials: true,
        }
      );
      setNotifications((prev) =>
        prev.filter((n) => n.notification_id !== notification_id)
      );
      if (onDeleted) onDeleted();
    } catch (err) {
      alert("Failed to delete notification.");
    }
  };

  return (
    <Overlay
      show={show}
      target={target}
      placement="bottom"
      containerPadding={20}
      rootClose
      onHide={onHide}
    >
      <Popover
        id="notification-popover"
        style={{
          minWidth: 420,
          maxWidth: 520,
          borderRadius: 18,
          boxShadow: "0 8px 32px rgba(60,60,100,0.18)",
          border: "none",
          background: "linear-gradient(135deg, #f8fafc 80%, #e9ecef 100%)",
        }}
      >
        <Popover.Header
          as="h3"
          style={{
            fontWeight: 700,
            fontSize: 20,
            background: "linear-gradient(90deg, #4f8cff 0%, #4361ee 100%)",
            color: "white",
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            letterSpacing: 1,
            padding: "16px 24px",
            border: "none",
          }}
        >
          Notifications
        </Popover.Header>
        <Popover.Body
          style={{
            maxHeight: 420,
            overflowY: "auto",
            padding: 0,
            borderRadius: 18,
          }}
        >
          {loading && (
            <div className="p-4 text-center">
              <Spinner animation="border" size="sm" />
            </div>
          )}
          {error && (
            <Alert variant="danger" className="m-3">
              {error}
            </Alert>
          )}
          {!loading && !error && notifications.length === 0 && (
            <div
              className="p-5 text-center text-muted"
              style={{ fontSize: 16 }}
            >
              No notifications found.
            </div>
          )}
          {!loading && !error && notifications.length > 0 && (
            <ListGroup variant="flush" className="notification-list-group">
              {notifications.map((notif) => (
                <ListGroup.Item
                  key={notif.notification_id}
                  className="notification-list-item d-flex justify-content-between align-items-start"
                  style={{
                    padding: "18px 22px 14px 22px",
                    borderBottom: "1px solid #f1f3f7",
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: 0,
                    transition: "background 0.2s",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        whiteSpace: "pre-line",
                        fontSize: 16,
                        color: "#222",
                        marginBottom: 6,
                        fontWeight: 500,
                      }}
                    >
                      {notif.message}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#888",
                        fontStyle: "italic",
                      }}
                    >
                      {new Date(notif.date).toLocaleString()}
                    </div>
                  </div>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="notification-delete-btn"
                    style={{
                      marginLeft: 16,
                      marginTop: 2,
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0.7,
                      border: "none",
                      background: "none",
                    }}
                    onClick={() => handleDelete(notif.notification_id)}
                    title="Delete notification"
                  >
                    <Trash size={18} />
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Popover.Body>
      </Popover>
    </Overlay>
  );
};

export default Notification;
