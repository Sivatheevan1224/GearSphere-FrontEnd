import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const VideoCardForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Basic product info (matching products table)
    name: '',
    category: 'Video Card',
    price: '',
    image_url: '',
    description: '',
    manufacturer: '',
    stock: '',
    
    // Video Card specific fields
    chipset: '',
    memory: '',
    memory_type: '',
    core_clock: '',
    boost_clock: '',
    tdp: '',
    length: '',
    width: '',
    height: ''
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
        type: 'video_card',
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        core_clock: parseFloat(formData.core_clock) || null,
        boost_clock: parseFloat(formData.boost_clock) || null,
        tdp: parseFloat(formData.tdp) || null,
        length: parseFloat(formData.length) || null,
        width: parseFloat(formData.width) || null,
        height: parseFloat(formData.height) || null,
        image: selectedImage // Use 'image' instead of 'image_file'
      };

      await onSubmit(productData);
      
      // Reset form
      setFormData({
        name: '',
        category: 'Video Card',
        price: '',
        image_url: '',
        description: '',
        manufacturer: '',
        stock: '',
        chipset: '',
        memory: '',
        memory_type: '',
        core_clock: '',
        boost_clock: '',
        tdp: '',
        length: '',
        width: '',
        height: ''
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
                  placeholder="e.g., NVIDIA GeForce RTX 4080"
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
                  placeholder="e.g., NVIDIA, AMD, ASUS, MSI"
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
                <Form.Label>Memory *</Form.Label>
                <Form.Control
                  type="text"
                  name="memory"
                  value={formData.memory}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 16GB, 24GB"
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
          <h5 className="mb-0">Video Card Specifications</h5>
        </Card.Header>
        <Card.Body>
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
                  <option value="GDDR6">GDDR6</option>
                  <option value="GDDR6X">GDDR6X</option>
                  <option value="GDDR7">GDDR7</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Base Clock (MHz)</Form.Label>
                <Form.Control
                  type="number"
                  name="core_clock"
                  value={formData.core_clock}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g., 2205"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Boost Clock (MHz)</Form.Label>
                <Form.Control
                  type="number"
                  name="boost_clock"
                  value={formData.boost_clock}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g., 2505"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>TDP (W)</Form.Label>
                <Form.Control
                  type="number"
                  name="tdp"
                  value={formData.tdp}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g., 320"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Length (mm)</Form.Label>
                <Form.Control
                  type="number"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g., 304"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Width (mm)</Form.Label>
                <Form.Control
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g., 137"
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Height (mm)</Form.Label>
                <Form.Control
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g., 62"
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
          {isSubmitting ? 'Adding Video Card...' : 'Add Video Card'}
        </Button>
      </div>
    </Form>
  );
};

export default VideoCardForm; 