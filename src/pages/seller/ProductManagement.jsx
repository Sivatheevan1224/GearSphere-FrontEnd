import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, Pagination } from 'react-bootstrap';

const ProductManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const productsPerPage = 10;
  const [products, setProducts] = useState([
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
    },
    {
      id: 'P004',
      name: 'Intel Core i9-13900K',
      category: 'CPU',
      price: 549.99,
      stock: 12,
      status: 'Active',
      rating: 4.9,
      sales: 28,
      image: 'https://example.com/i9-13900k.jpg'
    },
    {
      id: 'P005',
      name: 'AMD Ryzen 9 7950X',
      category: 'CPU',
      price: 699.99,
      stock: 8,
      status: 'Active',
      rating: 4.7,
      sales: 22,
      image: 'https://example.com/ryzen-7950x.jpg'
    },
    {
      id: 'P006',
      name: 'ASUS ROG STRIX B760-F',
      category: 'Motherboard',
      price: 249.99,
      stock: 20,
      status: 'Active',
      rating: 4.4,
      sales: 18,
      image: 'https://example.com/asus-b760f.jpg'
    },
    {
      id: 'P007',
      name: 'Corsair RM850x',
      category: 'Power Supply',
      price: 149.99,
      stock: 35,
      status: 'Active',
      rating: 4.6,
      sales: 42,
      image: 'https://example.com/corsair-rm850x.jpg'
    },
    {
      id: 'P008',
      name: 'NZXT H510 Flow',
      category: 'Case',
      price: 89.99,
      stock: 40,
      status: 'Active',
      rating: 4.3,
      sales: 55,
      image: 'https://example.com/nzxt-h510.jpg'
    },
    {
      id: 'P009',
      name: 'Noctua NH-D15',
      category: 'Cooling',
      price: 99.99,
      stock: 25,
      status: 'Active',
      rating: 4.8,
      sales: 38,
      image: 'https://example.com/noctua-nhd15.jpg'
    },
    {
      id: 'P010',
      name: 'Samsung Odyssey G7',
      category: 'Monitor',
      price: 599.99,
      stock: 15,
      status: 'Active',
      rating: 4.5,
      sales: 25,
      image: 'https://example.com/samsung-g7.jpg'
    },
    {
      id: 'P011',
      name: 'Logitech G Pro X',
      category: 'Keyboard',
      price: 149.99,
      stock: 30,
      status: 'Active',
      rating: 4.4,
      sales: 48,
      image: 'https://example.com/logitech-gprox.jpg'
    },
    {
      id: 'P012',
      name: 'Razer DeathAdder V3',
      category: 'Mouse',
      price: 79.99,
      stock: 50,
      status: 'Active',
      rating: 4.6,
      sales: 65,
      image: 'https://example.com/razer-deathadder.jpg'
    },
    {
      id: 'P013',
      name: 'SteelSeries Arctis Pro',
      category: 'Headset',
      price: 179.99,
      stock: 22,
      status: 'Active',
      rating: 4.7,
      sales: 33,
      image: 'https://example.com/steelseries-arctis.jpg'
    },
    {
      id: 'P014',
      name: 'Blue Yeti X',
      category: 'Microphone',
      price: 169.99,
      stock: 18,
      status: 'Active',
      rating: 4.5,
      sales: 27,
      image: 'https://example.com/blue-yeti-x.jpg'
    },
    {
      id: 'P015',
      name: 'Logitech C920',
      category: 'Webcam',
      price: 69.99,
      stock: 45,
      status: 'Active',
      rating: 4.3,
      sales: 58,
      image: 'https://example.com/logitech-c920.jpg'
    }
  ]);

  const categories = [
    'Graphics Card',
    'CPU',
    'Memory',
    'Storage',
    'Motherboard',
    'Power Supply',
    'Case',
    'Cooling',
    'Monitor',
    'Keyboard',
    'Mouse',
    'Headset',
    'Microphone',
    'Webcam',
    'Speakers',
    'Network Card',
    'Sound Card',
    'Cables',
    'Thermal Paste',
    'Fans'
  ];

  const [addProduct, setAddProduct] = useState({
    name: '',
    category: categories[0],
    price: '',
    stock: '',
    status: 'Active',
    image: '',
    rating: 0,
    sales: 0
  });

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
    setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
    setShowEditModal(false);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
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

  const formatLKR = (amount) => 'LKR ' + Number(amount).toLocaleString('en-LK');

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
                  <td>{formatLKR(product.price)}</td>
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
                        setEditProduct({ ...product });
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
                  <Form.Control
                    type="text"
                    name="name"
                    value={addProduct.name}
                    onChange={e => setAddProduct({ ...addProduct, name: e.target.value })}
                    placeholder="Enter product name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={addProduct.category}
                    onChange={e => setAddProduct({ ...addProduct, category: e.target.value })}
                  >
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
                  <Form.Label>Price (LKR)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={addProduct.price}
                    onChange={e => setAddProduct({ ...addProduct, price: Number(e.target.value) })}
                    placeholder="Enter price"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={addProduct.stock}
                    onChange={e => setAddProduct({ ...addProduct, stock: Number(e.target.value) })}
                    placeholder="Enter stock quantity"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={addProduct.status}
                onChange={e => setAddProduct({ ...addProduct, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Discontinued">Discontinued</option>
              </Form.Select>
            </Form.Group>
            {/* You can add more fields here as needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            setProducts(prev => [
              ...prev,
              {
                ...addProduct,
                id: 'P' + (Math.floor(Math.random() * 100000)),
                price: Number(addProduct.price),
                stock: Number(addProduct.stock),
                image: '',
                rating: 0,
                sales: 0
              }
            ]);
            setAddProduct({
              name: '',
              category: categories[0],
              price: '',
              stock: '',
              status: 'Active',
              image: '',
              rating: 0,
              sales: 0
            });
            setShowAddModal(false);
          }}>
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
          {editProduct && (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={editProduct.name}
                      onChange={e => setEditProduct({ ...editProduct, name: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={editProduct.category}
                      onChange={e => setEditProduct({ ...editProduct, category: e.target.value })}
                    >
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
                    <Form.Label>Price (LKR)</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={editProduct.price}
                      onChange={e => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type="number"
                      name="stock"
                      value={editProduct.stock}
                      onChange={e => setEditProduct({ ...editProduct, stock: Number(e.target.value) })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={editProduct.status}
                  onChange={e => setEditProduct({ ...editProduct, status: e.target.value })}
                >
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
          <Button variant="primary" onClick={() => handleEditProduct(editProduct)}>
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