import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const MemoryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Basic product info (matching products table)
    name: '',
    category: 'Memory',
    price: '',
    image_url: '',
    description: '',
    manufacturer: '',
    stock: '',
    
    // Memory specific fields
    memory_type: '',
    speed: '',
    modules: '',
    cas_latency: '',
    voltage: '',
    ecc: false
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
        type: 'memory',
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        modules: parseInt(formData.modules) || null,
        cas_latency: parseInt(formData.cas_latency) || null,
        voltage: parseFloat(formData.voltage) || null,
        image_file: selectedImage // Include the actual file for upload
      };

      await onSubmit(productData);
      
      // Reset form
      setFormData({
        name: '',
        category: 'Memory',
        price: '',
        image_url: '',
        description: '',
        manufacturer: '',
        stock: '',
        memory_type: '',
        speed: '',
        modules: '',
        cas_latency: '',
        voltage: '',
        ecc: false
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
                  placeholder="e.g., Corsair Vengeance LPX 16GB"
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
                  placeholder="e.g., Corsair, G.Skill, Kingston"
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
                <Form.Label>Memory Type *</Form.Label>
                <Form.Select
                  name="memory_type"
                  value={formData.memory_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select memory type</option>
                  <option value="DDR4">DDR4</option>
                  <option value="DDR5">DDR5</option>
                </Form.Select>
              </Form.Group>
            </Col>
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

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Speed *</Form.Label>
                <Form.Control
                  type="text"
                  name="speed"
                  value={formData.speed}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 3200MHz, 6000MHz"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Modules *</Form.Label>
                <Form.Control
                  type="number"
                  name="modules"
                  value={formData.modules}
                  onChange={handleChange}
                  required
                  min="1"
                  max="8"
                  placeholder="e.g., 2"
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
          <h5 className="mb-0">Memory Specifications</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>CAS Latency</Form.Label>
                <Form.Control
                  type="number"
                  name="cas_latency"
                  value={formData.cas_latency}
                  onChange={handleChange}
                  min="10"
                  max="40"
                  placeholder="e.g., 16"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Voltage</Form.Label>
                <Form.Control
                  type="number"
                  name="voltage"
                  value={formData.voltage}
                  onChange={handleChange}
                  min="1.0"
                  max="2.0"
                  step="0.1"
                  placeholder="e.g., 1.35"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="ecc"
                  checked={formData.ecc}
                  onChange={handleChange}
                  label="ECC Memory"
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
          {isSubmitting ? 'Adding Memory...' : 'Add Memory'}
        </Button>
      </div>
    </Form>
  );
};

export default MemoryForm; 