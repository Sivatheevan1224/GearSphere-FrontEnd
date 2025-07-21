import React, { useState, useEffect } from "react";

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: 16,
  background: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  borderRadius: 8,
  overflow: "hidden",
};
const thStyle = {
  background: "#1976d2",
  color: "#fff",
  padding: "12px 8px",
  textAlign: "left",
  fontWeight: 600,
  borderBottom: "2px solid #1565c0",
};
const tdStyle = {
  padding: "10px 8px",
  borderBottom: "1px solid #eee",
  color: "#222",
};
const trHover = {
  background: "#f5faff",
};
const imgStyle = {
  width: 48,
  height: 48,
  borderRadius: "50%",
  objectFit: "cover",
  border: "1px solid #ddd",
  background: "#f0f0f0",
};
const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};
const modalContent = {
  background: "#fff",
  borderRadius: 10,
  padding: 32,
  minWidth: 320,
  maxWidth: 400,
  boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
  position: "relative",
};
const closeBtn = {
  position: "absolute",
  top: 12,
  right: 16,
  background: "none",
  border: "none",
  fontSize: 22,
  cursor: "pointer",
  color: "#888",
};
const actionBtn = {
  padding: "8px 18px",
  margin: "0 8px",
  border: "none",
  borderRadius: 5,
  fontWeight: 500,
  fontSize: 15,
  cursor: "pointer",
};
const confirmModalContent = {
  background: "#fff",
  borderRadius: 10,
  padding: 28,
  minWidth: 300,
  maxWidth: 350,
  boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
  textAlign: "center",
  position: "relative",
};
const confirmBtn = {
  ...actionBtn,
  minWidth: 80,
  margin: "0 12px",
};
const statusBadge = {
  display: "inline-block",
  minWidth: 80,
  padding: "4px 12px",
  borderRadius: 16,
  fontWeight: 600,
  fontSize: 14,
  textAlign: "center",
  textTransform: "capitalize",
};
const statusColors = {
  pending: { background: "#1976d2", color: "#fff" },
  accepted: { background: "#43a047", color: "#fff" },
  rejected: { background: "#e53935", color: "#fff" },
};

const BuildRequests = () => {
  const [buildRequests, setBuildRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState("");
  const [localStatus, setLocalStatus] = useState("");
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    action: null,
  });

  useEffect(() => {
    fetchBuildRequests();
    // eslint-disable-next-line
  }, []);

  const fetchBuildRequests = () => {
    const technician_id = sessionStorage.getItem("technician_id");
    if (!technician_id) {
      setError("Technician not logged in.");
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(
      `http://localhost/gearsphere_api/GearSphere-BackEnd/getBuildRequests.php?technician_id=${technician_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBuildRequests(data.data);
        } else {
          setError(data.message || "Failed to fetch build requests.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch build requests.");
        setLoading(false);
      });
  };

  // Helper to get customer profile image
  const getProfileImage = (req) => {
    if (req.customer_profile_image) {
      return `http://localhost/gearsphere_api/GearSphere-BackEnd/profile_images/${req.customer_profile_image}`;
    }
    return `http://localhost/gearsphere_api/GearSphere-BackEnd/profile_images/user_image.jpg`;
  };

  // Custom confirmation modal
  const ConfirmModal = ({ show, action, onConfirm, onCancel, loading }) => {
    if (!show) return null;
    return (
      <div style={modalOverlay}>
        <div style={confirmModalContent}>
          <div style={{ fontSize: 18, marginBottom: 18 }}>
            Are you sure you want to <b>{action}</b> this request?
          </div>
          <button
            style={{
              ...confirmBtn,
              background: action === "accept" ? "#43a047" : "#e53935",
              color: "#fff",
            }}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Processing..." : "Yes"}
          </button>
          <button
            style={{
              ...confirmBtn,
              background: "#eee",
              color: "#333",
              border: "1px solid #bbb",
            }}
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  // Modal for customer details and actions
  const CustomerDetailModal = ({ request, onClose }) => {
    if (!request) return null;
    const statusToShow = localStatus || request.status;

    const handleStatusUpdate = (status) => {
      setConfirmModal({ show: true, action: status });
    };

    const doStatusUpdate = (status) => {
      setModalLoading(true);
      setModalError("");
      fetch(
        "http://localhost/gearsphere_api/GearSphere-BackEnd/updateAssignmentStatus.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assignment_id: request.assignment_id,
            status,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setModalLoading(false);
          setConfirmModal({ show: false, action: null });
          if (data.success) {
            setLocalStatus(status);
            fetchBuildRequests();
          } else {
            setModalError(data.message || "Failed to update status.");
          }
        })
        .catch(() => {
          setModalLoading(false);
          setConfirmModal({ show: false, action: null });
          setModalError("Failed to update status.");
    });
  };

    return (
      <div style={modalOverlay}>
        <div style={modalContent}>
          <button style={closeBtn} onClick={onClose}>
            &times;
          </button>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <img
              src={getProfileImage(request)}
              alt={request.customer_name}
              style={{ ...imgStyle, width: 72, height: 72, marginBottom: 8 }}
            />
            <h3 style={{ margin: 0 }}>{request.customer_name}</h3>
            <div style={{ color: "#888", fontSize: 14 }}>
              {request.customer_email}
            </div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <b>Phone:</b> {request.customer_phone}
          </div>
          <div style={{ marginBottom: 8 }}>
            <b>Address:</b> {request.customer_address}
          </div>
          <div style={{ marginBottom: 8 }}>
            <b>Date Assigned:</b> {request.assigned_at}
          </div>
          <div style={{ marginBottom: 8 }}>
            <b>Status:</b> {statusToShow}
          </div>
          <div style={{ marginBottom: 8 }}>
            <b>Instructions:</b> {request.instructions}
          </div>
          {modalError && (
            <div style={{ color: "red", marginBottom: 8 }}>{modalError}</div>
          )}
          <div style={{ textAlign: "center", marginTop: 18 }}>
            {statusToShow === "pending" && (
              <>
                <button
                  style={{ ...actionBtn, background: "#43a047", color: "#fff" }}
                  disabled={modalLoading}
                  onClick={() => handleStatusUpdate("accepted")}
                >
                  Accept
                </button>
                <button
                  style={{ ...actionBtn, background: "#e53935", color: "#fff" }}
                  disabled={modalLoading}
                  onClick={() => handleStatusUpdate("rejected")}
                >
                  Reject
                </button>
              </>
            )}
            {statusToShow === "accepted" && (
              <button
                style={{ ...actionBtn, background: "#43a047", color: "#fff" }}
                disabled
              >
                Accepted
              </button>
            )}
            {statusToShow === "rejected" && (
              <button
                style={{ ...actionBtn, background: "#e53935", color: "#fff" }}
                disabled
              >
                Rejected
              </button>
            )}
          </div>
        </div>
        <ConfirmModal
          show={confirmModal.show}
          action={confirmModal.action === "accepted" ? "accept" : "reject"}
          onConfirm={() => doStatusUpdate(confirmModal.action)}
          onCancel={() => setConfirmModal({ show: false, action: null })}
          loading={modalLoading}
        />
      </div>
    );
  };

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <h2 className="mb-4" style={{ fontWeight: 700, color: '#1976d2' }}>Build Requests</h2>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <span className="spinner-border text-primary" role="status" />
        </div>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{error}</div>
      ) : buildRequests.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: 80, color: '#888' }}>
          <img src="/no-data.svg" alt="No Requests" style={{ width: 120, marginBottom: 18, opacity: 0.7 }} />
          <div style={{ fontSize: 22, fontWeight: 500 }}>No build requests found</div>
          <div style={{ fontSize: 15, marginTop: 6 }}>You have not been assigned any build requests yet.</div>
        </div>
      ) : (
        <div style={{ overflowX: "auto", borderRadius: 8 }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Customer Photo</th>
                <th style={thStyle}>Customer Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Date Assigned</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {buildRequests.map((req, idx) => (
                <tr
                  key={req.assignment_id}
                  style={hoveredRow === idx ? trHover : {}}
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={tdStyle}>
                    <img
                      src={getProfileImage(req)}
                      alt={req.customer_name}
                      style={imgStyle}
                    />
                  </td>
                  <td style={tdStyle}>{req.customer_name}</td>
                  <td style={tdStyle}>{req.customer_email}</td>
                  <td style={tdStyle}>{req.customer_phone}</td>
                  <td style={tdStyle}>{req.assigned_at}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        ...statusBadge,
                        ...(statusColors[req.status] || statusColors.pending),
                      }}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <button
                      style={{
                        padding: "6px 14px",
                        background: "transparent",
                        color: "#1976d2",
                        border: "2px solid #1976d2",
                        borderRadius: 5,
                        cursor: "pointer",
                        fontWeight: 500,
                      }}
                      onClick={() => {
                        setSelectedRequest(req);
                        setShowModal(true);
                        setLocalStatus("");
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <CustomerDetailModal
          request={selectedRequest}
          onClose={() => setShowModal(false)}
        />
      )}
            </div>
  );
};

export default BuildRequests; 
