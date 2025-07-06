import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const MonitorForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Basic product info
    name: '',
    category: 'Monitor',
    price: '',
    image_url: '',
    description: '',
    manufacturer: '',
    // Monitor specific fields
    screen_size: '',
    resolution: '',
    refresh_rate: '',
    panel_type: '',
    aspect_ratio: '',
    brightness: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const productData = {
        type: 'monitor',
        ...formData,
        price: parseFloat(formData.price),
        screen_size: parseFloat(formData.screen_size) || null
      };
      await onSubmit(productData);
      setFormData({
        name: '',
        category: 'Monitor',
        price: '',
        image_url: '',
        description: '',
        manufacturer: '',
        screen_size: '',
        resolution: '',
        refresh_rate: '',
        panel_type: '',
        aspect_ratio: '',
        brightness: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Basic Product Information</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Samsung Odyssey G7"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Manufacturer *</Form.Label>
                <Form.Control
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Samsung, LG, ASUS"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price (LKR) *</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="Enter price"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="Enter product image URL"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
            />
          </Form.Group>
        </Card.Body>
      </Card>
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Monitor Specifications</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Screen Size (inches) *</Form.Label>
                <Form.Control
                  type="number"
                  name="screen_size"
                  value={formData.screen_size}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.1"
                  placeholder="e.g., 27.0"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Resolution *</Form.Label>
                <Form.Control
                  type="text"
                  name="resolution"
                  value={formData.resolution}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 1920x1080"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Refresh Rate</Form.Label>
                <Form.Control
                  type="text"
                  name="refresh_rate"
                  value={formData.refresh_rate}
                  onChange={handleChange}
                  placeholder="e.g., 144Hz"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Panel Type</Form.Label>
                <Form.Select
                  name="panel_type"
                  value={formData.panel_type}
                  onChange={handleChange}
                >
                  <option value="">Select panel type</option>
                  <option value="IPS">IPS</option>
                  <option value="VA">VA</option>
                  <option value="TN">TN</option>
                  <option value="OLED">OLED</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Aspect Ratio</Form.Label>
                <Form.Control
                  type="text"
                  name="aspect_ratio"
                  value={formData.aspect_ratio}
                  onChange={handleChange}
                  placeholder="e.g., 16:9"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Brightness</Form.Label>
                <Form.Control
                  type="text"
                  name="brightness"
                  value={formData.brightness}
                  onChange={handleChange}
                  placeholder="e.g., 300 nits"
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-end">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Monitor...' : 'Add Monitor'}
        </Button>
      </div>
    </Form>
  );
};

export default MonitorForm; 