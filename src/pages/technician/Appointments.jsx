import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form } from 'react-bootstrap';
import { Calendar, Clock, Person, CheckCircle, XCircle } from 'react-bootstrap-icons';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, completed, cancelled

  // Mock data - Replace with actual API call
  useEffect(() => {
    // Simulated appointments data
    const mockAppointments = [
      {
        id: 1,
        customerName: 'John Doe',
        service: 'PC Repair',
        date: '2024-03-20',
        time: '10:00 AM',
        status: 'pending',
        description: 'Computer not booting up'
      },
      {
        id: 2,
        customerName: 'Jane Smith',
        service: 'Hardware Upgrade',
        date: '2024-03-20',
        time: '2:30 PM',
        status: 'completed',
        description: 'RAM and SSD upgrade'
      },
      {
        id: 3,
        customerName: 'Mike Johnson',
        service: 'Software Installation',
        date: '2024-03-21',
        time: '11:00 AM',
        status: 'cancelled',
        description: 'OS installation and software setup'
      }
    ];
    setAppointments(mockAppointments);
  }, []);

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      completed: 'success',
      cancelled: 'danger'
    };
    return <Badge bg={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
  };

  const filteredAppointments = appointments.filter(apt => 
    filter === 'all' ? true : apt.status === filter
  );

  return (
    <Container className="py-5">
      <h1 className="mb-4">Appointments</h1>
      
      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-center mb-4">
            <Col>
              <h3 className="mb-0">Manage Appointments</h3>
            </Col>
            <Col xs="auto">
              <Form.Select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="w-auto"
              >
                <option value="all">All Appointments</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date & Time</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <Person className="me-2" />
                        {appointment.customerName}
                      </div>
                    </td>
                    <td>{appointment.service}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Calendar className="me-2" />
                        {appointment.date}
                        <Clock className="ms-2 me-2" />
                        {appointment.time}
                      </div>
                    </td>
                    <td>{appointment.description}</td>
                    <td>{getStatusBadge(appointment.status)}</td>
                    <td>
                      {appointment.status === 'pending' && (
                        <div className="d-flex gap-2">
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleStatusChange(appointment.id, 'completed')}
                          >
                            <CheckCircle className="me-1" /> Complete
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                          >
                            <XCircle className="me-1" /> Cancel
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Appointments; 