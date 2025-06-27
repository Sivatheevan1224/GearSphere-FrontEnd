import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, Pagination, Alert } from 'react-bootstrap';

const Inventory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showStockModal, setShowStockModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const productsPerPage = 10;

  // Mock data - replace with actual API calls
  const inventory = [
    {
      id: 'P001',
      name: 'RTX 4070',
      category: 'Graphics Card',
      sku: 'GC-RTX4070-001',
      currentStock: 15,
      minStock: 10,
      maxStock: 50,
      reorderPoint: 12,
      status: 'In Stock',
      lastRestock: '2024-02-15',
      location: 'Warehouse A',
      value: 8999.85
    },
    {
      id: 'P002',
      name: '32GB DDR5 RAM',
      category: 'Memory',
      sku: 'MEM-DDR5-32G-001',
      currentStock: 5,
      minStock: 15,
      maxStock: 100,
      reorderPoint: 20,
      status: 'Low Stock',
      lastRestock: '2024-02-10',
      location: 'Warehouse B',
      value: 999.95
    },
    {
      id: 'P003',
      name: '1TB NVMe SSD',
      category: 'Storage',
      sku: 'SSD-NVME-1TB-001',
      currentStock: 0,
      minStock: 20,
      maxStock: 80,
      reorderPoint: 25,
      status: 'Out of Stock',
      lastRestock: '2024-02-05',
      location: 'Warehouse A',
      value: 0
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
      'In Stock': 'success',
      'Low Stock': 'warning',
      'Out of Stock': 'danger',
      'Discontinued': 'secondary'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const handleUpdateStock = (productId, newStock) => {
    // TODO: Implement API call to update stock
    console.log('Updating stock:', { productId, newStock });
    setShowStockModal(false);
  };

  const filteredInventory = inventory.filter(item =>
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (categoryFilter === 'all' || item.category === categoryFilter) &&
    (stockFilter === 'all' || item.status === stockFilter)
  );

  const indexOfLastItem = currentPage * productsPerPage;
  const indexOfFirstItem = indexOfLastItem - productsPerPage;
  const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInventory.length / productsPerPage);

  const lowStockItems = inventory.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock');

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Inventory Management</h1>

      {lowStockItems.length > 0 && (
        <Alert variant="warning" className="mb-4">
          <Alert.Heading>Low Stock Alert!</Alert.Heading>
          <p>
            You have {lowStockItems.length} items that need attention:
          </p>
          <ul>
            {lowStockItems.map(item => (
              <li key={item.id}>
                {item.name} - Current Stock: {item.currentStock} (Min: {item.minStock})
              </li>
            ))}
          </ul>
        </Alert>
      )}

      <Row className="mb-4">
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted mb-2">Total Products</h6>
              <h3>{inventory.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted mb-2">Low Stock Items</h6>
              <h3>{lowStockItems.length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted mb-2">Out of Stock</h6>
              <h3>{inventory.filter(item => item.status === 'Out of Stock').length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h6 className="text-muted mb-2">Total Value</h6>
              <h3>${inventory.reduce((sum, item) => sum + item.value, 0).toFixed(2)}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
              >
                <option value="all">All Stock Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </Form.Select>
            </div>
            <Form.Control
              type="search"
              placeholder="Search by name, SKU, or category..."
              style={{ width: '300px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Table responsive hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Min Stock</th>
                <th>Status</th>
                <th>Location</th>
                <th>Last Restock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.sku}</td>
                  <td>{item.category}</td>
                  <td>{item.currentStock}</td>
                  <td>{item.minStock}</td>
                  <td>{getStatusBadge(item.status)}</td>
                  <td>{item.location}</td>
                  <td>{item.lastRestock}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setSelectedProduct(item);
                        setShowStockModal(true);
                      }}
                    >
                      Update Stock
                    </Button>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => {
                        setSelectedProduct(item);
                        setShowHistoryModal(true);
                      }}
                    >
                      History
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

      {/* Update Stock Modal */}
      <Modal show={showStockModal} onHide={() => setShowStockModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProduct.name}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Current Stock</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={selectedProduct.currentStock}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Minimum Stock Level</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={selectedProduct.minStock}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Maximum Stock Level</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={selectedProduct.maxStock}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Reorder Point</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={selectedProduct.reorderPoint}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedProduct.location}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStockModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handleUpdateStock(selectedProduct?.id, selectedProduct?.currentStock)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Stock History Modal */}
      <Modal show={showHistoryModal} onHide={() => setShowHistoryModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Stock History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              <h5 className="mb-4">{selectedProduct.name}</h5>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Quantity</th>
                    <th>Previous Stock</th>
                    <th>New Stock</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024-02-15</td>
                    <td><Badge bg="success">Restock</Badge></td>
                    <td>+20</td>
                    <td>5</td>
                    <td>25</td>
                    <td>Regular monthly restock</td>
                  </tr>
                  <tr>
                    <td>2024-02-10</td>
                    <td><Badge bg="danger">Sale</Badge></td>
                    <td>-5</td>
                    <td>10</td>
                    <td>5</td>
                    <td>Online order #12345</td>
                  </tr>
                  <tr>
                    <td>2024-02-05</td>
                    <td><Badge bg="warning">Adjustment</Badge></td>
                    <td>-2</td>
                    <td>12</td>
                    <td>10</td>
                    <td>Damaged items removed</td>
                  </tr>
                </tbody>
              </Table>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowHistoryModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Inventory; 