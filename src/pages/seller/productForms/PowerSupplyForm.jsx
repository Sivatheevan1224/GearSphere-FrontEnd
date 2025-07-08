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
    efficiency_rating: '',
    modular: '',
    form_factor: '',
    color: ''
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
        efficiency_rating: '',
        modular: '',
        form_factor: '',
        color: ''
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
          <h5 className="mb-0">Power Supply Specifications</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Modular</Form.Label>
                <Form.Select
                  name="modular"
                  value={formData.modular}
                  onChange={handleChange}
                >
                  <option value="">Select modular type</option>
                  <option value="Non-Modular">Non-Modular</option>
                  <option value="Semi-Modular">Semi-Modular</option>
                  <option value="Fully Modular">Fully Modular</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Form Factor</Form.Label>
                <Form.Select
                  name="form_factor"
                  value={formData.form_factor}
                  onChange={handleChange}
                >
                  <option value="">Select form factor</option>
                  <option value="ATX">ATX</option>
                  <option value="SFX">SFX</option>
                  <option value="SFX-L">SFX-L</option>
                  <option value="TFX">TFX</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

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