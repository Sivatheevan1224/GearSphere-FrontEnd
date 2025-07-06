import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const OperatingSystemForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Basic product info (matching products table)
    name: '',
    category: 'Operating System',
    price: '',
    image_url: '',
    description: '',
    manufacturer: '',
    
    // Operating System specific fields
    version: '',
    edition: '',
    license_type: '',
    architecture: '',
    language: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        type: 'operating_system',
        ...formData,
        price: parseFloat(formData.price),
        image_file: selectedImage // Include the actual file for upload
      };

      await onSubmit(productData);
      
      // Reset form
      setFormData({
        name: '',
        category: 'Operating System',
        price: '',
        image_url: '',
        description: '',
        manufacturer: '',
        version: '',
        edition: '',
        license_type: '',
        architecture: '',
        language: ''
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
                  placeholder="e.g., Windows 11 Pro"
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
                  placeholder="e.g., Microsoft, Canonical"
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
                <Form.Label>Version *</Form.Label>
                <Form.Control
                  type="text"
                  name="version"
                  value={formData.version}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 11, 10, 22.04 LTS"
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
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Edition</Form.Label>
                <Form.Control
                  type="text"
                  name="edition"
                  value={formData.edition}
                  onChange={handleChange}
                  placeholder="e.g., Pro, Home, Enterprise"
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
          <h5 className="mb-0">Operating System Specifications</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>License Type</Form.Label>
                <Form.Select
                  name="license_type"
                  value={formData.license_type}
                  onChange={handleChange}
                >
                  <option value="">Select license type</option>
                  <option value="Retail">Retail</option>
                  <option value="OEM">OEM</option>
                  <option value="Volume">Volume</option>
                  <option value="Academic">Academic</option>
                  <option value="Open Source">Open Source</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Architecture</Form.Label>
                <Form.Select
                  name="architecture"
                  value={formData.architecture}
                  onChange={handleChange}
                >
                  <option value="">Select architecture</option>
                  <option value="32-bit">32-bit</option>
                  <option value="64-bit">64-bit</option>
                  <option value="32-bit/64-bit">32-bit/64-bit</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Language</Form.Label>
            <Form.Control
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              placeholder="e.g., English, Multi-language"
            />
          </Form.Group>
        </Card.Body>
      </Card>

      <div className="d-flex justify-content-end">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Operating System...' : 'Add Operating System'}
        </Button>
      </div>
    </Form>
  );
};

export default OperatingSystemForm; 