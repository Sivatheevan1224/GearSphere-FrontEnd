import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const CPUForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Basic product info (matching products table)
    name: '',
    category: 'CPU',
    price: '',
    image_url: '',
    description: '',
    manufacturer: '',
    stock: '',
    
    // CPU specific fields
    series: '',
    socket: '',
    core_count: '',
    thread_count: '',
    core_clock: '',
    core_boost_clock: '',
    tdp: '',
    integrated_graphics: false
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Create a temporary URL for preview
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        image_url: imageUrl
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const productData = {
        type: 'cpu',
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        core_count: parseInt(formData.core_count) || null,
        thread_count: parseInt(formData.thread_count) || null,
        core_clock: parseFloat(formData.core_clock) || null,
        core_boost_clock: parseFloat(formData.core_boost_clock) || null,
        tdp: parseInt(formData.tdp) || null,
        integrated_graphics: formData.integrated_graphics,
        image: selectedImage // Use 'image' instead of 'image_file'
      };

      await onSubmit(productData);
      
      // Reset form
      setFormData({
        name: '',
        category: 'CPU',
        price: '',
        image_url: '',
        description: '',
        manufacturer: '',
        stock: '',
        series: '',
        socket: '',
        core_count: '',
        thread_count: '',
        core_clock: '',
        core_boost_clock: '',
        tdp: '',
        integrated_graphics: false
      });
      setSelectedImage(null);
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
                  placeholder="e.g., Intel Core i9-13900K"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Manufacturer *</Form.Label>
                <Form.Select
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select manufacturer</option>
                  <option value="Intel">Intel</option>
                  <option value="AMD">AMD</option>
                </Form.Select>
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
                <Form.Label>Series</Form.Label>
                <Form.Control
                  type="text"
                  name="series"
                  value={formData.series}
                  onChange={handleChange}
                  placeholder="e.g., Core i9, Ryzen 9"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Socket *</Form.Label>
                <Form.Control
                  type="text"
                  name="socket"
                  value={formData.socket}
                  onChange={handleChange}
                  required
                  placeholder="e.g., LGA 1700, AM5"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Product Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {selectedImage && (
                  <small className="text-muted">
                    Selected: {selectedImage.name}
                  </small>
                )}
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
          <h5 className="mb-0">CPU Specifications</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Core Count *</Form.Label>
                <Form.Control
                  type="number"
                  name="core_count"
                  value={formData.core_count}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="e.g., 8"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Thread Count *</Form.Label>
                <Form.Control
                  type="number"
                  name="thread_count"
                  value={formData.thread_count}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="e.g., 16"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Base Clock (GHz) *</Form.Label>
                <Form.Control
                  type="number"
                  name="core_clock"
                  value={formData.core_clock}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.1"
                  placeholder="e.g., 3.0"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Boost Clock (GHz)</Form.Label>
                <Form.Control
                  type="number"
                  name="core_boost_clock"
                  value={formData.core_boost_clock}
                  onChange={handleChange}
                  min="0"
                  step="0.1"
                  placeholder="e.g., 5.4"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>TDP</Form.Label>
                <Form.Control
                  type="text"
                  name="tdp"
                  value={formData.tdp}
                  onChange={handleChange}
                  placeholder="e.g., 125W"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="integrated_graphics"
                  checked={formData.integrated_graphics}
                  onChange={handleChange}
                  label="Integrated Graphics"
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
          {isSubmitting ? 'Adding CPU...' : 'Add CPU'}
        </Button>
      </div>
    </Form>
  );
};

export default CPUForm; 
