import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, Pagination } from 'react-bootstrap';

const ProductManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const productsPerPage = 10;

  // Mock data - replace with actual API calls
  const products = [
    {
      id: 'P001',
      name: 'RTX 4070',
      category: 'Graphics Card',
      price: 599.99,
      stock: 15,
      status: 'Active',
      rating: 4.5,
      sales: 45,
      image: 'https://example.com/rtx4070.jpg'
    },
    {
      id: 'P002',
      name: '32GB DDR5 RAM',
      category: 'Memory',
      price: 199.99,
      stock: 30,
      status: 'Active',
      rating: 4.8,
      sales: 60,
      image: 'https://example.com/ddr5.jpg'
    },
    {
      id: 'P003',
      name: '1TB NVMe SSD',
      category: 'Storage',
      price: 129.99,
      stock: 25,
      status: 'Out of Stock',
      rating: 4.6,
      sales: 35,
      image: 'https://example.com/nvme.jpg'
    }
  ];

  const categories = [
    'Graphics Card',
    'CPU',
    'Memory',
    'Storage',
    'Motherboard',
    'Power Supply',
    'Case',
    'Cooling'
  ];

  const getStatusBadge = (status) => {
    const variants = {
      'Active': 'success',
      'Inactive': 'secondary',
      'Out of Stock': 'warning',
      'Discontinued': 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const handleAddProduct = (productData) => {
    // TODO: Implement API call to add product
    console.log('Adding product:', productData);
    setShowAddModal(false);
  };

  const handleEditProduct = (productData) => {
    // TODO: Implement API call to update product
    console.log('Updating product:', productData);
    setShowEditModal(false);
  };

  const handleDeleteProduct = (productId) => {
    // TODO: Implement API call to delete product
    console.log('Deleting product:', productId);
    setShowDeleteModal(false);
  };

  const filteredProducts = products.filter(product =>
    (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (categoryFilter === 'all' || product.category === categoryFilter) &&
    (statusFilter === 'all' || product.status === statusFilter)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Product Management</h1>

      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex gap-2">
              <Form.Select
                style={{ width: '200px' }}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </Form.Select>
              <Form.Select
                style={{ width: '200px' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Discontinued">Discontinued</option>
              </Form.Select>
            </div>
            <div className="d-flex gap-2">
              <Form.Control
                type="search"
                placeholder="Search products..."
                style={{ width: '300px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary" onClick={() => setShowAddModal(true)}>
                Add Product
              </Button>
            </div>
          </div>

          <Table responsive hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Sales</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map(product => (
                <tr key={product.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '40px', height: '40px', marginRight: '10px' }}
                        className="rounded"
                      />
                      <div>
                        <div>{product.name}</div>
                        <small className="text-muted">ID: {product.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>{getStatusBadge(product.status)}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="me-1">{product.rating}</span>
                      <i className="bi bi-star-fill text-warning"></i>
                    </div>
                  </td>
                  <td>{product.sales}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter product name" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" placeholder="Enter price" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control type="number" placeholder="Enter stock quantity" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" accept="image/*" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter product description" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleAddProduct({})}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={selectedProduct.name}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select defaultValue={selectedProduct.category}>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={selectedProduct.price}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="number"
                      defaultValue={selectedProduct.stock}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select defaultValue={selectedProduct.status}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Discontinued">Discontinued</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Product Image</Form.Label>
                <Form.Control type="file" accept="image/*" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleEditProduct(selectedProduct)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteProduct(selectedProduct?.id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductManagement; 