import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const GeneralProductEditForm = ({ onSubmit, initialData, onCancel }) => {
  const defaultState = {
    name: '',
    category: '',
    price: '',
    image_url: '',
    description: '',
    manufacturer: '',
    stock: ''
  };
  const [formData, setFormData] = useState(initialData || defaultState);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image_url: imageUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        image: selectedImage
      };
      await onSubmit(productData);
    } catch (error) {
      // handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">General Product Information</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name *</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter product name" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category *</Form.Label>
                <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required placeholder="Enter category" disabled />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price (LKR) *</Form.Label>
                <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" placeholder="Enter price" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Stock Quantity *</Form.Label>
                <Form.Control type="number" name="stock" value={formData.stock} readOnly disabled placeholder="Stock cannot be edited" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Manufacturer *</Form.Label>
                <Form.Control type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} required placeholder="Enter manufacturer" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Product Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                {selectedImage && (<small className="text-muted">Selected: {selectedImage.name}</small>)}
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Enter product description" />
          </Form.Group>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save Changes'}</Button>
      </div>
    </Form>
  );
};

export default GeneralProductEditForm; 
