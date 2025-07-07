import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const StorageForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Basic product info (matching products table)
    name: '',
    category: 'Storage',
    price: '',
    image_url: '',
    description: '',
    manufacturer: '',
    stock: '',
    
    // Storage specific fields
    storage_type: '',
    capacity: '',
    interface: '',
    form_factor: ''
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
        type: 'storage',
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        image_file: selectedImage // Include the actual file for upload
      };

      await onSubmit(productData);
      
      // Reset form
      setFormData({
        name: '',
        category: 'Storage',
        price: '',
        image_url: '',
        description: '',
        manufacturer: '',
        stock: '',
        storage_type: '',
        capacity: '',
        interface: '',
        form_factor: ''
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
                  placeholder="e.g., Samsung 970 EVO Plus 1TB"
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
                  placeholder="e.g., Samsung, Western Digital, Seagate"
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
                <Form.Label>Storage Type *</Form.Label>
                <Form.Select
                  name="storage_type"
                  value={formData.storage_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select storage type</option>
                  <option value="HDD">HDD</option>
                  <option value="SSD">SSD</option>
                  <option value="NVMe">NVMe</option>
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
                <Form.Label>Capacity *</Form.Label>
                <Form.Control
                  type="text"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 1TB, 2TB, 500GB"
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
          <h5 className="mb-0">Storage Specifications</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Interface *</Form.Label>
                <Form.Select
                  name="interface"
                  value={formData.interface}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select interface</option>
                  <option value="SATA">SATA</option>
                  <option value="PCIe">PCIe</option>
                  <option value="M.2">M.2</option>
                  <option value="USB">USB</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Form Factor</Form.Label>
                <Form.Control
                  type="text"
                  name="form_factor"
                  value={formData.form_factor}
                  onChange={handleChange}
                  placeholder="e.g., 2.5 inch, 3.5 inch, M.2 2280"
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
          {isSubmitting ? 'Adding Storage...' : 'Add Storage'}
        </Button>
      </div>
    </Form>
  );
};

export default StorageForm; 