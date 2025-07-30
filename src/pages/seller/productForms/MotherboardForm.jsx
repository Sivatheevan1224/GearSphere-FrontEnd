import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const MotherboardForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Basic product info (matching products table)
    name: '',
    category: 'Motherboard',
    price: '',
    image_url: '',
    description: '',
    manufacturer: '',
    stock: '',
    
    // Motherboard specific fields
    socket: '',
    form_factor: '',
    chipset: '',
    memory_max: '',
    memory_slots: '',
    memory_type: '',
    sata_ports: '',
    wifi: false
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
        type: 'motherboard',
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        memory_slots: parseInt(formData.memory_slots) || null,
        sata_ports: parseInt(formData.sata_ports) || null,
        image: selectedImage // Use 'image' instead of 'image_file'
      };

      await onSubmit(productData);
      
      // Reset form
      setFormData({
        name: '',
        category: 'Motherboard',
        price: '',
        image_url: '',
        description: '',
        manufacturer: '',
        stock: '',
        socket: '',
        form_factor: '',
        chipset: '',
        memory_max: '',
        memory_slots: '',
        memory_type: '',
        sata_ports: '',
        wifi: false
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
                  placeholder="e.g., ASUS ROG STRIX B760-F"
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
                  placeholder="e.g., ASUS, MSI, Gigabyte"
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
                <Form.Label>Form Factor *</Form.Label>
                <Form.Select
                  name="form_factor"
                  value={formData.form_factor}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select form factor</option>
                  <option value="ATX">ATX</option>
                  <option value="Micro-ATX">Micro-ATX</option>
                  <option value="Mini-ITX">Mini-ITX</option>
                  <option value="E-ATX">E-ATX</option>
                </Form.Select>
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
          <h5 className="mb-0">Motherboard Specifications</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Chipset *</Form.Label>
                <Form.Control
                  type="text"
                  name="chipset"
                  value={formData.chipset}
                  onChange={handleChange}
                  required
                  placeholder="e.g., B760, X670E"
                />
              </Form.Group>
            </Col>
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
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Memory Slots *</Form.Label>
                <Form.Control
                  type="number"
                  name="memory_slots"
                  value={formData.memory_slots}
                  onChange={handleChange}
                  required
                  min="1"
                  max="8"
                  placeholder="e.g., 4"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Max Memory</Form.Label>
                <Form.Control
                  type="text"
                  name="memory_max"
                  value={formData.memory_max}
                  onChange={handleChange}
                  placeholder="e.g., 128GB"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>SATA Ports</Form.Label>
                <Form.Control
                  type="number"
                  name="sata_ports"
                  value={formData.sata_ports}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g., 6"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="wifi"
                  checked={formData.wifi}
                  onChange={handleChange}
                  label="WiFi Enabled"
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
          {isSubmitting ? 'Adding Motherboard...' : 'Add Motherboard'}
        </Button>
      </div>
    </Form>
  );
};

export default MotherboardForm; 
