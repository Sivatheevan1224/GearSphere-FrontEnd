import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Pagination, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

function Marketplace() {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const productsPerPage = 12;

  // All PC parts from seller's product management
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
      image: 'https://example.com/rtx4070.jpg',
      description: 'High-performance gaming graphics card with ray tracing support'
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
      image: 'https://example.com/ddr5.jpg',
      description: 'High-speed DDR5 memory for optimal performance'
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
      image: 'https://example.com/nvme.jpg',
      description: 'Ultra-fast NVMe solid state drive'
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
      image: 'https://example.com/i9-13900k.jpg',
      description: 'High-end Intel processor for gaming and content creation'
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
      image: 'https://example.com/ryzen-7950x.jpg',
      description: 'Premium AMD processor with exceptional performance'
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
      image: 'https://example.com/asus-b760f.jpg',
      description: 'Gaming motherboard with advanced features'
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
      image: 'https://example.com/corsair-rm850x.jpg',
      description: 'Reliable 850W modular power supply'
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
      image: 'https://example.com/nzxt-h510.jpg',
      description: 'Modern PC case with excellent airflow'
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
      image: 'https://example.com/noctua-nhd15.jpg',
      description: 'Premium air cooler for optimal thermal performance'
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
      image: 'https://example.com/samsung-g7.jpg',
      description: 'Curved gaming monitor with high refresh rate'
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
      image: 'https://example.com/logitech-gprox.jpg',
      description: 'Mechanical gaming keyboard with customizable switches'
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
      image: 'https://example.com/razer-deathadder.jpg',
      description: 'High-precision gaming mouse with optical switches'
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
      image: 'https://example.com/steelseries-arctis.jpg',
      description: 'Premium gaming headset with Hi-Res audio'
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
      image: 'https://example.com/blue-yeti-x.jpg',
      description: 'Professional USB microphone for streaming and recording'
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
      image: 'https://example.com/logitech-c920.jpg',
      description: 'HD webcam with autofocus and noise reduction'
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

  const formatLKR = (amount) => 'LKR ' + Number(amount).toLocaleString('en-LK');

  const getStatusBadge = (status) => {
    const variants = {
      'Active': 'success',
      'Inactive': 'secondary',
      'Out of Stock': 'warning',
      'Discontinued': 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProduct(product);
    setShowToast(true);
  };

  const filteredProducts = products.filter(product =>
    (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (categoryFilter === 'all' || product.category === categoryFilter)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">PC Parts Marketplace</h1>

      {/* Success Toast */}
      <Toast 
        show={showToast} 
        onClose={() => setShowToast(false)}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999
        }}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Added to Cart!</strong>
        </Toast.Header>
        <Toast.Body>
          {addedProduct?.name} has been added to your cart.
        </Toast.Body>
      </Toast>

      {/* Search and Filter Section */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Products Grid */}
      <Row>
        {currentProducts.map(product => (
          <Col key={product.id} lg={4} md={6} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img 
                variant="top" 
                src={product.image || "/placeholder.svg?height=200&width=300"} 
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Badge bg="primary" className="mb-1">{product.category}</Badge>
                  {getStatusBadge(product.status)}
                </div>
                <Card.Title className="h6">{product.name}</Card.Title>
                <Card.Text className="text-muted small flex-grow-1">
                  {product.description}
              </Card.Text>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="h5 mb-0 text-primary">{formatLKR(product.price)}</span>
                    <div className="d-flex align-items-center">
                      <span className="me-1 small">{product.rating}</span>
                      <i className="bi bi-star-fill text-warning small"></i>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <small className="text-muted">Stock: {product.stock}</small>
                    <small className="text-muted">Sales: {product.sales}</small>
                  </div>
                  <Button 
                    variant={isInCart(product.id) ? "success" : "primary"}
                    className="w-100"
                    disabled={product.status === 'Out of Stock'}
                    onClick={() => handleAddToCart(product)}
                  >
                    {product.status === 'Out of Stock' 
                      ? 'Out of Stock' 
                      : isInCart(product.id) 
                        ? 'Added to Cart ✓' 
                        : 'Add to Cart'
                    }
                  </Button>
                </div>
            </Card.Body>
          </Card>
        </Col>
        ))}
      </Row>

      {/* Pagination */}
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

      {/* No Results Message */}
      {currentProducts.length === 0 && (
        <div className="text-center py-5">
          <h4 className="text-muted">No products found</h4>
          <p className="text-muted">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </Container>
  );
}

export default Marketplace; 