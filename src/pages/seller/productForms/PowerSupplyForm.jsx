import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const PowerSupplyForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Basic product info (matching products table)
    name: '',
    category: 'Power Supply',
    price: '',
    image_url: '',
    description: '',
    manufacturer: '',
    stock: '',
    // Power Supply specific fields
    wattage: '',
    type: '',
    efficiency_rating: '',
    length: '',
    modular: '',
    sata_connectors: ''
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
        type: 'power_supply',
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        wattage: parseInt(formData.wattage) || null,
        image: selectedImage // Use 'image' instead of 'image_file'
      };

      await onSubmit(productData);
      
      // Reset form
      setFormData({
        name: '',
        category: 'Power Supply',
        price: '',
        image_url: '',
        description: '',
        manufacturer: '',
        stock: '',
        wattage: '',
        type: '',
        efficiency_rating: '',
        length: '',
        modular: '',
        sata_connectors: ''
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
                  placeholder="e.g., Corsair RM850x"
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
                  placeholder="e.g., Corsair, EVGA, Seasonic"
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
          <h5 className="mb-0">Power Supply Specifications</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Wattage *</Form.Label>
                <Form.Control
                  type="number"
                  name="wattage"
                  value={formData.wattage}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="e.g., 650"
                />
              </Form.Group>
            </Col>
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
                  <option value="ATX">ATX</option>
                  <option value="SFX">SFX</option>
                  <option value="SFX-L">SFX-L</option>
                  <option value="TFX">TFX</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Efficiency Rating</Form.Label>
                <Form.Select
                  name="efficiency_rating"
                  value={formData.efficiency_rating}
                  onChange={handleChange}
                >
                  <option value="">Select rating</option>
                  <option value="80 Plus">80 Plus</option>
                  <option value="80 Plus Bronze">80 Plus Bronze</option>
                  <option value="80 Plus Silver">80 Plus Silver</option>
                  <option value="80 Plus Gold">80 Plus Gold</option>
                  <option value="80 Plus Platinum">80 Plus Platinum</option>
                  <option value="80 Plus Titanium">80 Plus Titanium</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Length (mm)</Form.Label>
                <Form.Control
                  type="text"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  placeholder="e.g., 160"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Modular *</Form.Label>
                <Form.Select
                  name="modular"
                  value={formData.modular}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select modular type</option>
                  <option value="Full">Full</option>
                  <option value="Semi">Semi</option>
                  <option value="Non-Modular">Non-Modular</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>SATA Connectors</Form.Label>
                <Form.Control
                  type="number"
                  name="sata_connectors"
                  value={formData.sata_connectors}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g., 6"
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
          {isSubmitting ? 'Adding Power Supply...' : 'Add Power Supply'}
        </Button>
      </div>
    </Form>
  );
};

export default PowerSupplyForm; 