import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Modal, Table } from 'react-bootstrap';
import { 
  Cpu, 
  Motherboard, 
  Display, 
  Memory, 
  Hdd, 
  Power, 
  PcDisplay, 
  Fan, 
  CurrencyDollar, 
  ArrowsAngleExpand
} from 'react-bootstrap-icons';

function PCBuilder() {
  const [selectedRange, setSelectedRange] = useState('');
  const [usage, setUsage] = useState('');
  const [selectedComponents, setSelectedComponents] = useState({
    cpu: null,
    gpu: null,
    motherboard: null,
    ram: null,
    storage: null,
    psu: null,
    case: null,
    cooling: null
  });
  const [recommendations, setRecommendations] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonType, setComparisonType] = useState('');
  const [comparisonItems, setComparisonItems] = useState([]);

  // Budget ranges in LKR
  const budgetRanges = [
    { id: 'range1', name: 'Entry Level', min: 100000, max: 200000, tier: 'low' },
    { id: 'range2', name: 'Budget', min: 200000, max: 300000, tier: 'low' },
    { id: 'range3', name: 'Mid-Range', min: 300000, max: 400000, tier: 'mid' },
    { id: 'range4', name: 'High-End', min: 400000, max: 500000, tier: 'mid' },
    { id: 'range5', name: 'Premium', min: 500000, max: 750000, tier: 'high' },
    { id: 'range6', name: 'Ultimate', min: 750000, max: 1000000, tier: 'high' }
  ];

  // Usage types and their component priorities
  const usageTypes = {
    gaming: {
      name: 'Gaming',
      icon: '🎮',
      priorities: {
        gpu: 0.40,
        cpu: 0.25,
        ram: 0.10,
        storage: 0.10,
        motherboard: 0.10,
        psu: 0.03,
        case: 0.01,
        cooling: 0.01
      }
    },
    workstation: {
      name: 'Workstation',
      icon: '💼',
      priorities: {
        cpu: 0.35,
        ram: 0.25,
        storage: 0.20,
        gpu: 0.10,
        motherboard: 0.05,
        psu: 0.03,
        case: 0.01,
        cooling: 0.01
      }
    },
    multimedia: {
      name: 'Multimedia',
      icon: '🎬',
      priorities: {
        cpu: 0.30,
        gpu: 0.25,
        storage: 0.20,
        ram: 0.15,
        motherboard: 0.05,
        psu: 0.03,
        case: 0.01,
        cooling: 0.01
      }
    },
    office: {
      name: 'Office',
      icon: '💻',
      priorities: {
        cpu: 0.25,
        ram: 0.20,
        storage: 0.20,
        motherboard: 0.15,
        gpu: 0.10,
        psu: 0.05,
        case: 0.03,
        cooling: 0.02
      }
    }
  };

  // Component icons mapping with correct icons
  const componentIcons = {
    cpu: <Cpu size={40} className="text-primary" />,
    gpu: <Display size={40} className="text-success" />,
    motherboard: <Motherboard size={40} className="text-info" />,
    ram: <Memory size={40} className="text-warning" />,
    storage: <Hdd size={40} className="text-danger" />,
    psu: <Power size={40} className="text-secondary" />,
    case: <PcDisplay size={40} className="text-dark" />,
    cooling: <Fan size={40} className="text-primary" />
  };

  // Enhanced component options with comprehensive information
  const componentOptions = {
    cpu: [
      { 
        name: 'Intel Core i9-13900K', 
        price: 125000, 
        tier: 'high',
        icon: <Cpu size={24} className="text-primary" />,
        specs: {
          cores: '24 (8P + 16E)',
          threads: '32',
          baseSpeed: '3.0 GHz',
          boostSpeed: '5.8 GHz',
          cache: '36MB',
          tdp: '125W'
        },
        features: {
          bestFor: ['Gaming', 'Content Creation', 'Streaming', '3D Rendering'],
          uniqueFeatures: [
            'Hybrid Architecture (P-cores + E-cores)',
            'Intel Thermal Velocity Boost',
            'PCIe 5.0 Support',
            'DDR5 Memory Support'
          ],
          functionality: {
            gaming: 'Excellent',
            productivity: 'Outstanding',
            multitasking: 'Superb',
            powerEfficiency: 'High'
          },
          usage: {
            gaming: 'Perfect for high-end gaming and streaming',
            workstation: 'Ideal for professional content creation',
            productivity: 'Excellent for heavy multitasking',
            overclocking: 'Great overclocking potential'
          },
          priceAnalysis: {
            value: 'Premium',
            performancePerRupee: 'High',
            targetMarket: 'Enthusiasts and Professionals'
          }
        }
      },
      { 
        name: 'AMD Ryzen 9 7950X', 
        price: 120000, 
        tier: 'high',
        icon: <Cpu size={24} className="text-danger" />,
        specs: {
          cores: '16',
          threads: '32',
          baseSpeed: '4.5 GHz',
          boostSpeed: '5.7 GHz',
          cache: '80MB',
          tdp: '170W'
        },
        features: {
          bestFor: ['Content Creation', '3D Rendering', 'Workstation', 'Gaming'],
          uniqueFeatures: [
            'Zen 4 Architecture',
            'AMD 3D V-Cache Technology',
            'PCIe 5.0 Support',
            'Advanced AI Features'
          ],
          functionality: {
            gaming: 'Excellent',
            productivity: 'Outstanding',
            multitasking: 'Superb',
            powerEfficiency: 'Very High'
          },
          usage: {
            gaming: 'Excellent for high-end gaming',
            workstation: 'Perfect for professional workloads',
            productivity: 'Superb for multitasking',
            overclocking: 'Excellent overclocking headroom'
          },
          priceAnalysis: {
            value: 'Premium',
            performancePerRupee: 'Very High',
            targetMarket: 'Professionals and Enthusiasts'
          }
        }
      },
      { name: 'Intel Core i7-13700K', price: 85000, tier: 'mid' },
      { name: 'AMD Ryzen 7 7700X', price: 80000, tier: 'mid' },
      { name: 'Intel Core i5-13600K', price: 65000, tier: 'mid' },
      { name: 'AMD Ryzen 5 7600X', price: 60000, tier: 'mid' },
      { name: 'Intel Core i3-13100', price: 35000, tier: 'low' },
      { name: 'AMD Ryzen 5 5600X', price: 40000, tier: 'low' }
    ],
    gpu: [
      {
        name: 'NVIDIA RTX 4090',
        price: 350000,
        tier: 'high',
        icon: <Display size={24} className="text-success" />,
        specs: {
          memory: '24GB GDDR6X',
          cores: '16384 CUDA',
          boostClock: '2.52 GHz',
          memorySpeed: '21 Gbps',
          power: '450W'
        },
        features: {
          bestFor: ['4K Gaming', 'Ray Tracing', 'AI/ML', 'Content Creation'],
          uniqueFeatures: [
            'DLSS 3.0',
            '4th Gen Tensor Cores',
            '3rd Gen RT Cores',
            'NVIDIA Broadcast'
          ],
          functionality: {
            gaming: 'Ultimate',
            rayTracing: 'Best in Class',
            aiFeatures: 'Advanced',
            contentCreation: 'Excellent'
          },
          usage: {
            gaming: 'Perfect for 4K and 8K gaming',
            workstation: 'Ideal for professional rendering',
            ai: 'Excellent for AI/ML workloads',
            streaming: 'Built-in streaming features'
          },
          priceAnalysis: {
            value: 'Premium',
            performancePerRupee: 'High',
            targetMarket: 'High-end Gamers and Professionals'
          }
        }
      },
      { name: 'NVIDIA RTX 4080', price: 250000, tier: 'high' },
      { name: 'AMD Radeon RX 7900 XTX', price: 220000, tier: 'high' },
      { name: 'NVIDIA RTX 4070 Ti', price: 180000, tier: 'mid' },
      { name: 'NVIDIA RTX 4070', price: 150000, tier: 'mid' },
      { name: 'AMD Radeon RX 7800 XT', price: 140000, tier: 'mid' },
      { name: 'NVIDIA RTX 4060 Ti', price: 90000, tier: 'low' },
      { name: 'AMD Radeon RX 7600', price: 85000, tier: 'low' }
    ],
    motherboard: [
      {
        name: 'ASUS ROG Maximus Z790',
        price: 85000,
        tier: 'high',
        icon: <Motherboard size={24} className="text-info" />,
        specs: {
          chipset: 'Z790',
          memorySlots: '4',
          maxMemory: '128GB',
          pcieSlots: '3',
          m2Slots: '4'
        },
        features: {
          bestFor: ['High-end Gaming', 'Overclocking', 'Workstation'],
          uniqueFeatures: [
            'ROG SupremeFX Audio',
            'Thunderbolt 4',
            'Wi-Fi 6E',
            'PCIe 5.0'
          ],
          functionality: {
            overclocking: 'Excellent',
            connectivity: 'Comprehensive',
            audio: 'Premium',
            networking: 'Advanced'
          },
          usage: {
            gaming: 'Perfect for high-end gaming setups',
            workstation: 'Ideal for professional workstations',
            overclocking: 'Excellent for CPU overclocking',
            connectivity: 'Rich I/O options'
          },
          priceAnalysis: {
            value: 'Premium',
            featuresPerRupee: 'High',
            targetMarket: 'Enthusiasts and Professionals'
          }
        }
      },
      { name: 'MSI MEG X670E ACE', price: 80000, tier: 'high' },
      { name: 'Gigabyte AORUS Z790', price: 75000, tier: 'high' },
      { name: 'ASRock X670E Taichi', price: 70000, tier: 'mid' },
      { name: 'MSI MPG B650', price: 55000, tier: 'mid' },
      { name: 'ASUS TUF B650', price: 50000, tier: 'mid' },
      { name: 'Gigabyte B650M', price: 35000, tier: 'low' },
      { name: 'ASRock B650M', price: 30000, tier: 'low' }
    ],
    ram: [
      {
        name: '64GB DDR5 6000MHz',
        price: 65000,
        tier: 'high',
        icon: <Memory size={24} className="text-warning" />,
        specs: {
          capacity: '64GB',
          speed: '6000MHz',
          type: 'DDR5',
          latency: 'CL36',
          modules: '2x32GB'
        },
        features: {
          bestFor: ['Workstation', 'Content Creation', 'High-end Gaming'],
          uniqueFeatures: [
            'RGB Lighting',
            'XMP 3.0',
            'Aluminum Heat Spreader',
            'ECC Support'
          ],
          functionality: {
            performance: 'Excellent',
            stability: 'High',
            overclocking: 'Good',
            compatibility: 'Wide'
          },
          usage: {
            workstation: 'Perfect for professional workloads',
            gaming: 'Excellent for high-end gaming',
            multitasking: 'Superb for heavy multitasking',
            contentCreation: 'Ideal for content creation'
          },
          priceAnalysis: {
            value: 'Premium',
            performancePerRupee: 'Good',
            targetMarket: 'Professionals and Enthusiasts'
          }
        }
      },
      { name: '32GB DDR5 6000MHz', price: 35000, tier: 'high' },
      { name: '32GB DDR5 5600MHz', price: 30000, tier: 'mid' },
      { name: '16GB DDR5 6000MHz', price: 20000, tier: 'mid' },
      { name: '16GB DDR5 5600MHz', price: 18000, tier: 'low' },
      { name: '16GB DDR4 3600MHz', price: 15000, tier: 'low' }
    ],
    storage: [
      { name: '4TB NVMe SSD', price: 85000, tier: 'high' },
      { name: '2TB NVMe SSD', price: 45000, tier: 'high' },
      { name: '1TB NVMe SSD + 2TB HDD', price: 35000, tier: 'mid' },
      { name: '1TB NVMe SSD', price: 25000, tier: 'mid' },
      { name: '512GB NVMe SSD + 1TB HDD', price: 20000, tier: 'low' },
      { name: '512GB NVMe SSD', price: 15000, tier: 'low' }
    ],
    psu: [
      { name: '1200W Platinum', price: 45000, tier: 'high' },
      { name: '1000W Gold', price: 35000, tier: 'high' },
      { name: '850W Gold', price: 28000, tier: 'mid' },
      { name: '750W Gold', price: 25000, tier: 'mid' },
      { name: '650W Bronze', price: 18000, tier: 'low' },
      { name: '550W Bronze', price: 15000, tier: 'low' }
    ],
    case: [
      { name: 'Lian Li O11 Dynamic', price: 35000, tier: 'high' },
      { name: 'Fractal Design Meshify 2', price: 30000, tier: 'high' },
      { name: 'Corsair 5000D', price: 28000, tier: 'mid' },
      { name: 'Phanteks P400A', price: 20000, tier: 'mid' },
      { name: 'NZXT H510', price: 15000, tier: 'low' },
      { name: 'Cooler Master NR600', price: 12000, tier: 'low' }
    ],
    cooling: [
      { name: '360mm AIO Liquid Cooler', price: 35000, tier: 'high' },
      { name: '240mm AIO Liquid Cooler', price: 25000, tier: 'high' },
      { name: 'Premium Air Cooler', price: 20000, tier: 'mid' },
      { name: 'Mid-range Air Cooler', price: 15000, tier: 'mid' },
      { name: 'Basic Air Cooler', price: 8000, tier: 'low' },
      { name: 'Stock Cooler', price: 0, tier: 'low' }
    ]
  };

  // Generate recommendations based on budget range and usage
  const generateRecommendations = (range, usageType) => {
    if (!range || !usageType || !usageTypes[usageType]) return null;
    
    const recommendedComponents = {};
    const priorities = usageTypes[usageType].priorities;
    const avgBudget = (range.min + range.max) / 2;

    // Find components within budget allocation
    for (const [component, allocation] of Object.entries(priorities)) {
      const componentBudget = avgBudget * allocation;
      const options = componentOptions[component].filter(comp => comp.tier === range.tier);
      
      if (options.length > 0) {
        // Find the best component within budget
        const bestOption = options.reduce((best, current) => {
          if (current.price <= componentBudget && 
              (!best || current.price > best.price)) {
            return current;
          }
          return best;
        }, null);

        recommendedComponents[component] = bestOption || options[0];
      }
    }

    return recommendedComponents;
  };

  // Handle range change
  const handleRangeChange = (e) => {
    const rangeId = e.target.value;
    const range = budgetRanges.find(r => r.id === rangeId);
    setSelectedRange(rangeId);
    
    if (range) {
      // If usage is selected, use it; otherwise use 'gaming' as default
      const usageType = usage || 'gaming';
      const recommendations = generateRecommendations(range, usageType);
      setRecommendations(recommendations);
      setSelectedComponents(recommendations || {});
    }
  };

  // Handle usage change
  const handleUsageChange = (e) => {
    const newUsage = e.target.value;
    setUsage(newUsage);
    
    if (newUsage && selectedRange) {
      const range = budgetRanges.find(r => r.id === selectedRange);
      const recommendations = generateRecommendations(range, newUsage);
      setRecommendations(recommendations);
      setSelectedComponents(recommendations || {});
    }
  };

  // Handle component comparison with enhanced information
  const handleCompare = (componentType) => {
    setComparisonType(componentType);
    const options = componentOptions[componentType]?.filter(comp => comp.tier === budgetRanges.find(r => r.id === selectedRange)?.tier) || [];
    setComparisonItems(options.slice(0, 3)); // Compare top 3 options
    setShowComparison(true);
  };

  // Calculate total price
  useEffect(() => {
    const total = Object.values(selectedComponents).reduce((sum, component) => {
      return sum + (component?.price || 0);
    }, 0);
    setTotalPrice(total);
  }, [selectedComponents]);

  return (
    <Container className="py-5">
      <h1 className="mb-4">PC Builder</h1>
      
      {/* Usage and Budget Range Selection */}
      <Card className="mb-4">
        <Card.Body>
          <h3>Configure Your Build</h3>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Usage Type</Form.Label>
                <Form.Select
                  value={usage}
                  onChange={handleUsageChange}
                >
                  <option value="">Select Usage Type</option>
                  {Object.entries(usageTypes).map(([key, type]) => (
                    <option key={key} value={key}>
                      {type.icon} {type.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <CurrencyDollar className="me-2" /> Select Budget Range
                </Form.Label>
                <Form.Select
                  value={selectedRange}
                  onChange={handleRangeChange}
                >
                  <option value="">Select Budget Range</option>
                  {budgetRanges.map(range => (
                    <option key={range.id} value={range.id}>
                      {range.name} (LKR {range.min.toLocaleString()} - {range.max.toLocaleString()})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {recommendations && usage && usageTypes[usage] && selectedRange && (
        <Alert variant="info" className="mb-4">
          <h4>Recommended {usageTypes[usage].name} Build</h4>
          <p className="mb-0">
            Based on your {usageTypes[usage].name.toLowerCase()} needs and selected budget range, 
            we've selected components that provide the best value for your money.
            You can modify any component below to better suit your needs.
          </p>
        </Alert>
      )}
      
      <Row>
        {/* Component Selection */}
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <h3>Build Your Custom PC</h3>
              <Form>
                {Object.entries(selectedComponents).map(([key, component]) => (
                  <div key={key} className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="mb-0">
                        {componentIcons[key]} {key.toUpperCase()}
                      </h5>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleCompare(key)}
                      >
                        <ArrowsAngleExpand className="me-1" /> Compare Options
                      </Button>
                    </div>
                    <Card>
                      <Card.Body>
                        <Row>
                          <Col md={3} className="d-flex align-items-center justify-content-center">
                            {component?.icon || componentIcons[key]}
                          </Col>
                          <Col md={9}>
                            <Form.Select
                              value={component?.name || ''}
                              onChange={(e) => {
                                const selected = componentOptions[key].find(comp => comp.name === e.target.value);
                                setSelectedComponents(prev => ({ ...prev, [key]: selected }));
                              }}
                            >
                              <option value="">Select {key.toUpperCase()}</option>
                              {componentOptions[key].map(comp => (
                                <option key={comp.name} value={comp.name}>
                                  {comp.name} - LKR {comp.price.toLocaleString()}
                                </option>
                              ))}
                            </Form.Select>
                            {component && component.specs && (
                              <div className="mt-2">
                                <small className="text-muted">
                                  {Object.entries(component.specs).map(([spec, value]) => (
                                    <span key={spec} className="me-3">
                                      <strong>{spec}:</strong> {value}
                                    </span>
                                  ))}
                                </small>
                              </div>
                            )}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Summary */}
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <h3>Build Summary</h3>
              <div className="mb-3">
                <h5>Selected Components</h5>
                <ul className="list-unstyled">
                  {Object.entries(selectedComponents).map(([key, component]) => (
                    <li key={key} className="mb-2">
                      <strong>{key.toUpperCase()}:</strong>{' '}
                      {component ? (
                        <>
                          {component.name}
                          <br />
                          <small className="text-muted">
                            LKR {component.price.toLocaleString()}
                          </small>
                        </>
                      ) : (
                        'Not selected'
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-3">
                <h5>Total Price</h5>
                <h3 className="text-primary">LKR {totalPrice.toLocaleString()}</h3>
                {selectedRange && (
                  <div className={`mt-2 ${totalPrice > budgetRanges.find(r => r.id === selectedRange)?.max ? 'text-danger' : 'text-success'}`}>
                    {totalPrice > budgetRanges.find(r => r.id === selectedRange)?.max ? (
                      <small>Exceeds budget range</small>
                    ) : (
                      <small>Within budget range</small>
                    )}
                  </div>
                )}
              </div>
              <Button 
                variant="success" 
                className="w-100"
                disabled={!Object.values(selectedComponents).every(comp => comp)}
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Enhanced Comparison Modal */}
      <Modal show={showComparison} onHide={() => setShowComparison(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            {componentIcons[comparisonType]} Compare {comparisonType.toUpperCase()} Options
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="table-responsive">
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Feature</th>
                  {comparisonItems.map(item => (
                    <th key={item.name} className="text-center">
                      <div className="mb-2">{item.icon}</div>
                      <div>{item.name}</div>
                      <div className="text-primary">LKR {item.price.toLocaleString()}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Technical Specifications */}
                <tr className="table-primary">
                  <td colSpan={comparisonItems.length + 1}>
                    <strong>Technical Specifications</strong>
                  </td>
                </tr>
                {comparisonItems[0]?.specs && Object.keys(comparisonItems[0].specs).map(spec => (
                  <tr key={spec}>
                    <td><strong>{spec}</strong></td>
                    {comparisonItems.map(item => (
                      <td key={item.name} className="text-center">
                        {item.specs?.[spec] || 'N/A'}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Functionality */}
                <tr className="table-success">
                  <td colSpan={comparisonItems.length + 1}>
                    <strong>Functionality</strong>
                  </td>
                </tr>
                {comparisonItems[0]?.features?.functionality && 
                  Object.entries(comparisonItems[0].features.functionality).map(([key, _]) => (
                    <tr key={key}>
                      <td><strong>{key}</strong></td>
                      {comparisonItems.map(item => (
                        <td key={item.name} className="text-center">
                          {item.features?.functionality?.[key] || 'N/A'}
                        </td>
                      ))}
                    </tr>
                  ))}

                {/* Usage Scenarios */}
                <tr className="table-info">
                  <td colSpan={comparisonItems.length + 1}>
                    <strong>Usage Scenarios</strong>
                  </td>
                </tr>
                {comparisonItems[0]?.features?.usage && 
                  Object.entries(comparisonItems[0].features.usage).map(([key, _]) => (
                    <tr key={key}>
                      <td><strong>{key}</strong></td>
                      {comparisonItems.map(item => (
                        <td key={item.name}>
                          {item.features?.usage?.[key] || 'N/A'}
                        </td>
                      ))}
                    </tr>
                  ))}

                {/* Unique Features */}
                <tr className="table-warning">
                  <td colSpan={comparisonItems.length + 1}>
                    <strong>Unique Features</strong>
                  </td>
                </tr>
                <tr>
                  <td><strong>Special Features</strong></td>
                  {comparisonItems.map(item => (
                    <td key={item.name}>
                      <ul className="list-unstyled mb-0">
                        {(item.features?.uniqueFeatures || ['N/A']).map(feature => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Price Analysis */}
                <tr className="table-secondary">
                  <td colSpan={comparisonItems.length + 1}>
                    <strong>Price Analysis</strong>
                  </td>
                </tr>
                {comparisonItems[0]?.features?.priceAnalysis && 
                  Object.entries(comparisonItems[0].features.priceAnalysis).map(([key, _]) => (
                    <tr key={key}>
                      <td><strong>{key}</strong></td>
                      {comparisonItems.map(item => (
                        <td key={item.name} className="text-center">
                          {item.features?.priceAnalysis?.[key] || 'N/A'}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowComparison(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default PCBuilder; 