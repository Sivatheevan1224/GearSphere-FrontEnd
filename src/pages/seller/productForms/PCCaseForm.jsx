import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const PCCaseForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Basic product info
    name: '',
    category: 'PC Case',
    price: '',
    image_url: '',
    description: '',
    manufacturer: '',
    stock: '',
    // PC Case specific fields
    type: '',
    side_panel: '',
    color: '',
    max_gpu_length: '',
    volume: '',
    dimensions: ''
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
        type: 'pc_case',
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0
      };
      await onSubmit(productData);
      setFormData({
        name: '',
        category: 'PC Case',
        price: '',
        image_url: '',
        description: '',
        manufacturer: '',
        stock: '',
        type: '',
        side_panel: '',
        color: '',
        max_gpu_length: '',
        volume: '',
        dimensions: ''
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
                  placeholder="e.g., NZXT H510 Flow"
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
                  placeholder="e.g., NZXT, Corsair, Fractal Design"
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
                <Form.Label>Stock Quantity *</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="Enter stock quantity"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
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
            <Col md={6}>
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
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">PC Case Specifications</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Type *</Form.Label>
                <Form.Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="Mid Tower">Mid Tower</option>
                  <option value="Mini Tower">Mini Tower</option>
                  <option value="Full Tower">Full Tower</option>
                  <option value="Micro ATX">Micro ATX</option>
                  <option value="Mini ITX">Mini ITX</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Side Panel</Form.Label>
                <Form.Control
                  type="text"
                  name="side_panel"
                  value={formData.side_panel}
                  onChange={handleChange}
                  placeholder="e.g., Tempered Glass, Acrylic"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="e.g., Black, White"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Max GPU Length</Form.Label>
                <Form.Control
                  type="text"
                  name="max_gpu_length"
                  value={formData.max_gpu_length}
                  onChange={handleChange}
                  placeholder="e.g., 360mm"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Volume</Form.Label>
                <Form.Control
                  type="text"
                  name="volume"
                  value={formData.volume}
                  onChange={handleChange}
                  placeholder="e.g., 50L"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Dimensions</Form.Label>
                <Form.Control
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  placeholder="e.g., 450 x 210 x 480 mm"
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
          {isSubmitting ? 'Adding PC Case...' : 'Add PC Case'}
        </Button>
      </div>
    </Form>
  );
};

export default PCCaseForm; 