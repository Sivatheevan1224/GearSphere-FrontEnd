import React from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { Search, Plus, Pencil, Trash, Star } from 'react-bootstrap-icons';

function SellerProducts() {
  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Products</h1>
        <Button variant="primary">
          <Plus className="me-2" />
          Add Product
        </Button>
      </div>
      
      {/* Search and Filter */}
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <Form.Control placeholder="Search products..." />
            <Button variant="outline-secondary">
              <Search />
            </Button>
          </InputGroup>
        </Col>
        <Col md={6} className="d-flex justify-content-md-end gap-2">
          <Form.Select style={{ maxWidth: "200px" }}>
            <option>All Categories</option>
            <option>CPU</option>
            <option>GPU</option>
            <option>Motherboard</option>
            <option>RAM</option>
            <option>Storage</option>
            <option>PSU</option>
            <option>Case</option>
          </Form.Select>
          <Form.Select style={{ maxWidth: "200px" }}>
            <option>Sort by: Name</option>
            <option>Price</option>
            <option>Stock</option>
            <option>Rating</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Products Grid */}
      <Row>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <Col key={item} md={3} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src="/placeholder.svg?height=200&width=200"
                alt="Product"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="mb-0">Product Name</h5>
                  <div className="d-flex align-items-center">
                    <Star className="text-warning me-1" size={14} />
                    <span>4.8</span>
                  </div>
                </div>
                <p className="text-muted mb-2">Category</p>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="mb-0">${item}50</h4>
                  <span className="badge bg-success">In Stock</span>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-primary" className="flex-grow-1">
                    <Pencil className="me-2" />
                    Edit
                  </Button>
                  <Button variant="outline-danger" className="flex-grow-1">
                    <Trash className="me-2" />
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SellerProducts; 