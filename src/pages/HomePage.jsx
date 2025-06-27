import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Badge, Carousel, Navbar, Nav, Accordion, Form, InputGroup } from "react-bootstrap";
import { Cpu, People, Lightning, Shield, ChevronRight, Star, Grid3x3Gap, Tools, Award, Wrench, Headset, Search, Filter, SortDown, StarFill, Envelope, Telephone, GeoAlt, Clock, Person } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import Footer from "../components/Footer";
import pcGif from '../images/pc_video.gif';
import { Link, useNavigate } from "react-router-dom";
import sivatheevanImg from '../images/sivatheevan.png';
import makinthanImg from '../images/makinthan.png';
import pugazhImg from '../images/pugazh.png';
import kowsiImg from '../images/kowsi.png';
import gif1 from '../images/download.jpg';

function HomePage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [reviewFilterVisible, setReviewFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState("All Prices");
  const [cpu, setCpu] = useState("All CPUs");
  const [gpu, setGpu] = useState("All GPUs");
  const [sortBy, setSortBy] = useState("Featured");
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = document.querySelector('.navbar-custom')?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Titan X Gaming PC",
      description: "High-end gaming rig with the latest RTX GPU and Intel i9 processor",
      price: "$2,499",
      imageUrl: "/placeholder.svg?height=300&width=400",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Creator Pro Workstation",
      description: "Professional workstation optimized for content creation and 3D rendering",
      price: "$3,299",
      imageUrl: "/placeholder.svg?height=300&width=400",
      badge: "New",
    },
    {
      id: 3,
      name: "Stealth Mini ITX",
      description: "Compact but powerful PC with premium cooling in a small form factor",
      price: "$1,899",
      imageUrl: "/placeholder.svg?height=300&width=400",
      badge: "Popular",
    },
  ];

  // All products data
  const products = [
    {
      id: 1,
      name: "Titan X Gaming PC",
      category: "Gaming",
      price: 2499,
      specs: "RTX 4080, Intel i9, 32GB RAM, 2TB SSD",
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      id: 2,
      name: "Creator Pro Workstation",
      category: "Workstation",
      price: 3299,
      specs: "RTX 4090, AMD Ryzen 9, 64GB RAM, 4TB SSD",
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      id: 3,
      name: "Stealth Mini ITX",
      category: "Compact",
      price: 1899,
      specs: "RTX 4070, Intel i7, 32GB RAM, 1TB SSD",
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      id: 4,
      name: "Budget Gaming Rig",
      category: "Gaming",
      price: 999,
      specs: "RTX 3060, AMD Ryzen 5, 16GB RAM, 1TB SSD",
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      id: 5,
      name: "Ultimate Streaming PC",
      category: "Streaming",
      price: 2199,
      specs: "RTX 4070 Ti, AMD Ryzen 7, 32GB RAM, 2TB SSD",
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      id: 6,
      name: "Office Productivity PC",
      category: "Office",
      price: 799,
      specs: "Intel i5, 16GB RAM, 512GB SSD",
      image: "/placeholder.svg?height=200&width=300"
    },
  ];

  // Reviews data
  const reviews = [
    {
      id: 1,
      name: "Michael Chen",
      date: "March 15, 2023",
      rating: 5,
      title: "Exceptional Build Quality",
      content: "The custom PC I received exceeded all my expectations. The build quality is exceptional and performance is outstanding. I've been gaming on it for months without any issues.",
      productName: "Titan X Gaming PC",
      avatar: "/placeholder.svg?height=50&width=50"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      date: "April 3, 2023",
      rating: 5,
      title: "Perfect for 3D Work",
      content: "As a 3D artist, I need reliable hardware that can handle heavy workloads. My GearSphere PC delivers exactly that. Renders are faster than ever and the system stays cool even under load.",
      productName: "Creator Pro Workstation",
      avatar: "/placeholder.svg?height=50&width=50"
    },
    {
      id: 3,
      name: "David Rodriguez",
      date: "February 22, 2023",
      rating: 4,
      title: "Great Value for Money",
      content: "The PC builder was incredibly knowledgeable and helped me choose the perfect components for my development needs. Only giving 4 stars because shipping took longer than expected.",
      productName: "Stealth Mini ITX",
      avatar: "/placeholder.svg?height=50&width=50"
    },
    {
      id: 4,
      name: "Emily Watson",
      date: "May 10, 2023",
      rating: 5,
      title: "Amazing Customer Service",
      content: "Not only was my PC built perfectly, but the customer service was outstanding. They helped me troubleshoot a minor issue over the phone and were incredibly patient.",
      productName: "Ultimate Streaming PC",
      avatar: "/placeholder.svg?height=50&width=50"
    },
    {
      id: 5,
      name: "James Wilson",
      date: "January 8, 2023",
      rating: 3,
      title: "Good PC, Shipping Issues",
      content: "The PC itself is great and performs well for gaming. However, there were some shipping delays and the packaging could have been better. The support team was helpful in resolving my concerns.",
      productName: "Budget Gaming Rig",
      avatar: "/placeholder.svg?height=50&width=50"
    },
    {
      id: 6,
      name: "Lisa Thompson",
      date: "April 28, 2023",
      rating: 5,
      title: "Perfect Office PC",
      content: "This PC is perfect for my office needs. It's quiet, fast, and the price was very reasonable. The ordering process was smooth and delivery was prompt.",
      productName: "Office Productivity PC",
      avatar: "/placeholder.svg?height=50&width=50"
    },
  ];

  // Render stars for ratings
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        i < rating ? 
        <StarFill key={i} className="text-warning me-1" /> : 
        <Star key={i} className="text-warning me-1" />
      ));
  };

  const roleFunctions = {
    customer: [
      { name: 'Marketplace', icon: <Grid3x3Gap />, path: '/marketplace', description: 'Browse and purchase PC components and accessories' },
      { name: 'PC Builder', icon: <Tools />, path: '/pc-builder', description: 'Design your custom PC with our easy-to-use builder' },
      { name: 'Find Technician', icon: <Wrench />, path: '/find-technician', description: 'Find local PC technicians for repairs and upgrades' },
      { name: 'My Orders', icon: <Award />, path: '/orders', description: 'Track your orders and purchase history' },
      { name: 'My Profile', icon: <Person />, path: '/profile', description: 'Manage your account settings and preferences' }
    ],
    technician: [
      { name: 'Services', icon: <Grid3x3Gap />, path: '/technician/services', description: 'Manage your repair and maintenance services' },
      { name: 'Appointments', icon: <Award />, path: '/technician/appointments', description: 'View and manage service appointments' },
      { name: 'Reviews', icon: <Star />, path: '/technician/reviews', description: 'View customer reviews and ratings' },
      { name: 'Earnings', icon: <Lightning />, path: '/technician/earnings', description: 'Track your earnings and payment history' },
      { name: 'My Profile', icon: <Person />, path: '/technician/profile', description: 'Manage your technician profile and settings' }
    ],
    seller: [
      { name: 'Products', icon: <Grid3x3Gap />, path: '/seller/products', description: 'Manage your product listings and inventory' },
      { name: 'Inventory', icon: <Award />, path: '/seller/inventory', description: 'Track and manage your product stock' },
      { name: 'Orders', icon: <Star />, path: '/seller/orders', description: 'View and process customer orders' },
      { name: 'Analytics', icon: <Lightning />, path: '/seller/analytics', description: 'View sales and performance metrics' },
      { name: 'My Profile', icon: <Person />, path: '/seller/profile', description: 'Manage your seller profile and settings' }
    ],
    admin: [
      { name: 'Users', icon: <People />, path: '/admin/users', description: 'Manage user accounts and permissions' },
      { name: 'Technician Verification', icon: <Award />, path: '/admin/technician-verification', description: 'Verify and approve technician applications' },
      { name: 'Orders', icon: <Star />, path: '/admin/orders', description: 'Monitor and manage all platform orders' },
      { name: 'Analytics', icon: <Lightning />, path: '/admin/analytics', description: 'View platform-wide analytics and metrics' },
      { name: 'Settings', icon: <Tools />, path: '/admin/settings', description: 'Manage platform settings and configurations' }
    ]
  };

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="py-5 bg-black text-white position-relative overflow-hidden">
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "radial-gradient(circle at 30% 50%, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 70%)",
            zIndex: 0,
          }}
        ></div>
        <Container className="py-5 position-relative" style={{ zIndex: 1 }}>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className="display-3 fw-bold mb-4">
                Build Your Dream Tech <span className="text-primary">With GearSphere</span>
              </h1>
              <p className="lead mb-5">
                Create your perfect custom PC with our expert builders and premium components. From gaming rigs to
                professional workstations, we've got you covered.
              </p>
              <div className="d-flex gap-3">
                <Button 
                  size="lg" 
                  variant="primary" 
                  onClick={() => setShowLoginModal(true)}
                >
                  Start Building
                </Button>
                <Button 
                  size="lg" 
                  variant="outline-light"
                  onClick={() => scrollToSection('products')}
                >
                  Explore Products <ChevronRight />
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-lg-end">
              <div className="pc-gif-bg d-inline-block rounded shadow-lg">
                <img
                  src={pcGif}
                  alt="PC Building Animation"
                  className="img-fluid rounded pc-gif-img"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <Container>
          <h1 className="text-center mb-5">About GearSphere</h1>
          <Row className="mb-5">
            <Col md={6}>
              <h2>Our Story</h2>
              <p>
                GearSphere was founded in 2020 by a group of passionate PC enthusiasts who wanted to make custom PC building accessible to everyone. What started as a small operation has grown into a trusted platform connecting customers with expert PC builders nationwide.
              </p>
              <p>
                At <strong>GearSphere</strong>, our mission is to make custom PC building easy, affordable, and accessible for everyone — whether you're a beginner with no technical background or an experienced user looking for high-performance builds. We aim to bridge the gap between customers and skilled PC technicians by creating a trusted platform where both can connect easily. Our goal is to simplify the building process with guided tools that help users select compatible parts, compare options, and receive suggestions based on budget and purpose. We focus on quality and transparency by working only with verified technicians and sellers, offering clear pricing and honest reviews. GearSphere also supports long-term value by providing lifetime technical support, upgrade options, and reliable repair services. In addition, we empower technicians and sellers by giving them an online presence and tools to grow their business. Through this, GearSphere aims to become the most trusted and complete platform for custom PC building.
              </p>
            </Col>
            <Col md={6}>
              <img 
                src={gif1} 
                alt="GearSphere Team" 
                className="img-fluid rounded shadow about-gif-img"
              />
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col md={12}>
              <h2 className="text-center mb-4">Our Values</h2>
              <Row>
                <Col md={4} className="mb-4">
                  <div className="text-center p-4 h-100 border rounded shadow-sm">
                    <h4>Quality</h4>
                    <p>We never compromise on component quality and build standards.</p>
                  </div>
                </Col>
                <Col md={4} className="mb-4">
                  <div className="text-center p-4 h-100 border rounded shadow-sm">
                    <h4>Transparency</h4>
                    <p>Clear pricing, honest advice, and no hidden fees.</p>
                  </div>
                </Col>
                <Col md={4} className="mb-4">
                  <div className="text-center p-4 h-100 border rounded shadow-sm">
                    <h4>Support</h4>
                    <p>Lifetime technical support for all our custom builds.</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          
          <Row>
            <Col md={12}>
              <h2 className="text-center mb-4">Meet Our Team</h2>
              <Row>
                <Col md={3} className="mb-4">
                  <div className="text-center">
                    <img 
                      src={sivatheevanImg}
                      alt="Team Member" 
                      className="rounded-circle mb-3"
                      width="150"
                      height="155"
                    />
                    <h4>Sivatheevan</h4>
                    <p className="text-muted">Founder & CEO</p>
                  </div>
                </Col>
                <Col md={3} className="mb-4">
                  <div className="text-center">
                    <img 
                      src={makinthanImg} 
                      alt="Team Member" 
                      className="rounded-circle mb-3"
                      width="150"
                      height="155"
                    />
                    <h4>Makinthan</h4>
                    <p className="text-muted">Head of Operations</p>
                  </div>
                </Col>
                <Col md={3} className="mb-4">
                  <div className="text-center">
                    <img 
                      src={pugazhImg}
                      alt="Team Member" 
                      className="rounded-circle mb-3"
                      width="150"
                      height="155"
                    />
                    <h4>Pukaliny</h4>
                    <p className="text-muted">Lead PC Builder</p>
                  </div>
                </Col>
                <Col md={3} className="mb-4">
                  <div className="text-center">
                    <img 
                      src={kowsiImg}
                      alt="Team Member" 
                      className="rounded-circle mb-3"
                      width="150"
                      height="155"
                    />
                    <h4>Kowsika</h4>
                    <p className="text-muted">Customer Support</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5 bg-light">
        <Container className="py-5">
          <h1 className="text-center mb-5">Our Services</h1>
          
          <Row className="mb-5">
            <Col md={6} className="mb-4 mb-md-0">
              <h2>Expert PC Building Services</h2>
              <p>
                At GearSphere, we offer comprehensive PC building services tailored to your specific needs. Whether you're a gamer, content creator, or professional, our expert builders will craft the perfect system for you.
              </p>
              <p>
                We handle everything from component selection to assembly, testing, and delivery, ensuring you receive a high-performance, reliable system.
              </p>
              <Button variant="primary" className="mt-3" onClick={() => setShowLoginModal(true)}>Get Started</Button>
            </Col>
            <Col md={6}>
              <img 
                src="/placeholder.svg?height=300&width=500" 
                alt="PC Building Service" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
          
          {/* Service Offerings Section */}
          <Row className="mb-5">
            <Col md={12}>
              <h2 className="text-center mb-4">Our Service Offerings</h2>
              <Row>
                <Col md={3} className="mb-4">
                  <Card className="service-card h-100">
                    <Card.Body className="text-center">
                      <div className="service-icon mb-3">
                        <Cpu size={40} className="text-primary" />
                      </div>
                      <Card.Title>Custom PC Building</Card.Title>
                      <Card.Text>
                        Personalized systems built to your specifications with premium components.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3} className="mb-4">
                  <Card className="service-card h-100">
                    <Card.Body className="text-center">
                      <div className="service-icon mb-3">
                        <Tools size={40} className="text-primary" />
                      </div>
                      <Card.Title>PC Upgrades</Card.Title>
                      <Card.Text>
                        Boost your existing system's performance with targeted component upgrades.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3} className="mb-4">
                  <Card className="service-card h-100">
                    <Card.Body className="text-center">
                      <div className="service-icon mb-3">
                        <Wrench size={40} className="text-primary" />
                      </div>
                      <Card.Title>Repairs & Maintenance</Card.Title>
                      <Card.Text>
                        Professional troubleshooting, repairs, and preventative maintenance.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3} className="mb-4">
                  <Card className="service-card h-100">
                    <Card.Body className="text-center">
                      <div className="service-icon mb-3">
                        <Headset size={40} className="text-primary" />
                      </div>
                      <Card.Title>Technical Support</Card.Title>
                      <Card.Text>
                        Ongoing assistance and expert advice for all your PC-related questions.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Process Section */}
          <Row className="mb-5">
            <Col md={12}>
              <h2 className="text-center mb-4">Our Process</h2>
              <Row className="justify-content-center">
                <Col md={10}>
                  <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
                    <div className="process-step">
                      <div className="process-number">1</div>
                      <div className="process-content">
                        <h5>Consultation</h5>
                        <p className="text-muted mb-0">Discuss your needs and budget</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="process-number">2</div>
                      <div className="process-content">
                        <h5>Component Selection</h5>
                        <p className="text-muted mb-0">Choose the perfect parts</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="process-number">3</div>
                      <div className="process-content">
                        <h5>Assembly</h5>
                        <p className="text-muted mb-0">Expert building and cable management</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="process-number">4</div>
                      <div className="process-content">
                        <h5>Testing</h5>
                        <p className="text-muted mb-0">Rigorous quality assurance</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="process-number">5</div>
                      <div className="process-content">
                        <h5>Delivery</h5>
                        <p className="text-muted mb-0">Safe shipping and setup assistance</p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <h2 className="text-center mb-4">Frequently Asked Questions</h2>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>How long does it take to build a custom PC?</Accordion.Header>
                  <Accordion.Body>
                    Typically, our build process takes 5-7 business days from order confirmation to shipping. This includes component procurement, assembly, extensive testing, and quality control.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Do you offer warranties on custom builds?</Accordion.Header>
                  <Accordion.Body>
                    Yes, all our custom builds come with a 2-year warranty covering assembly and labor. Individual components are covered by their respective manufacturer warranties, which we help you manage if needed.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Can I upgrade my PC in the future?</Accordion.Header>
                  <Accordion.Body>
                    We design our builds with future upgradability in mind. We can also provide upgrade services when you're ready to enhance your system.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>What if I have issues with my PC after delivery?</Accordion.Header>
                  <Accordion.Body>
                    We provide lifetime technical support for all our builds. If you encounter any issues, our support team is just a call or email away to help troubleshoot and resolve the problem.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Products Section */}
      <section id="products" className="py-5">
        <Container>
          <h1 className="text-center mb-5">Our Products</h1>
          
          <Row className="mb-4">
            <Col md={6} className="mb-3 mb-md-0">
              <InputGroup>
                <Form.Control
                  placeholder="Search products..."
                  aria-label="Search products"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <Button variant="outline-secondary">
                  <Search />
                </Button>
              </InputGroup>
            </Col>
            <Col md={6} className="d-flex justify-content-md-end">
              <Button 
                variant="outline-primary" 
                className="me-2"
                onClick={() => setFilterVisible(!filterVisible)}
              >
                <Filter className="me-1" /> Filters
              </Button>
              <Form.Select style={{maxWidth: "200px"}} value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="Featured">Sort by: Featured</option>
                <option value="PriceLowHigh">Price: Low to High</option>
                <option value="PriceHighLow">Price: High to Low</option>
                <option value="NameAZ">Name: A to Z</option>
              </Form.Select>
            </Col>
          </Row>
          
          {filterVisible && (
            <Row className="mb-4">
              <Col md={12}>
                <Card className="p-3">
                  <Row>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
                          <option>All Categories</option>
                          <option>Gaming</option>
                          <option>Workstation</option>
                          <option>Compact</option>
                          <option>Streaming</option>
                          <option>Office</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Price Range</Form.Label>
                        <Form.Select value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                          <option>All Prices</option>
                          <option>Under $1,000</option>
                          <option>$1,000 - $2,000</option>
                          <option>$2,000 - $3,000</option>
                          <option>Over $3,000</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>CPU</Form.Label>
                        <Form.Select value={cpu} onChange={e => setCpu(e.target.value)}>
                          <option>All CPUs</option>
                          <option>Intel Core i9</option>
                          <option>Intel Core i7</option>
                          <option>Intel Core i5</option>
                          <option>AMD Ryzen 9</option>
                          <option>AMD Ryzen 7</option>
                          <option>AMD Ryzen 5</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>GPU</Form.Label>
                        <Form.Select value={gpu} onChange={e => setGpu(e.target.value)}>
                          <option>All GPUs</option>
                          <option>NVIDIA RTX 4090</option>
                          <option>NVIDIA RTX 4080</option>
                          <option>NVIDIA RTX 4070</option>
                          <option>NVIDIA RTX 3080</option>
                          <option>NVIDIA RTX 3070</option>
                          <option>AMD Radeon RX 7900</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={() => {
                      setCategory("All Categories");
                      setPriceRange("All Prices");
                      setCpu("All CPUs");
                      setGpu("All GPUs");
                      setSearchQuery("");
                    }}>Reset</Button>
                    <Button variant="primary" onClick={() => setFilterVisible(false)}>Apply Filters</Button>
                  </div>
                </Card>
              </Col>
            </Row>
          )}
          
          {/* Filtering and sorting logic */}
          {(() => {
            let filtered = products.filter(product => {
              // Search
              if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
              // Category
              if (category !== "All Categories" && product.category !== category) return false;
              // Price
              if (priceRange !== "All Prices") {
                if (priceRange === "Under $1,000" && product.price >= 1000) return false;
                if (priceRange === "$1,000 - $2,000" && (product.price < 1000 || product.price > 2000)) return false;
                if (priceRange === "$2,000 - $3,000" && (product.price < 2000 || product.price > 3000)) return false;
                if (priceRange === "Over $3,000" && product.price <= 3000) return false;
              }
              // CPU
              if (cpu !== "All CPUs" && (!product.specs || !product.specs.includes(cpu))) return false;
              // GPU
              if (gpu !== "All GPUs" && (!product.specs || !product.specs.includes(gpu))) return false;
              return true;
            });
            // Sort
            if (sortBy === "PriceLowHigh") filtered.sort((a, b) => a.price - b.price);
            else if (sortBy === "PriceHighLow") filtered.sort((a, b) => b.price - a.price);
            else if (sortBy === "NameAZ") filtered.sort((a, b) => a.name.localeCompare(b.name));
            // else Featured: no sort or custom logic
            return (
              <Row>
                {filtered.length === 0 ? (
                  <Col><div className="text-center text-muted py-5">No products found.</div></Col>
                ) : (
                  filtered.map(product => (
                    <Col key={product.id} md={4} className="mb-4">
                      <Card className="h-100 shadow-sm">
                        <Card.Img variant="top" src={product.image} />
                        <Card.Body>
                          <Card.Title>{product.name}</Card.Title>
                          <div className="mb-2">
                            <span className="badge bg-secondary">{product.category}</span>
                          </div>
                          <Card.Text className="text-muted small">{product.specs}</Card.Text>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <span className="fw-bold text-primary">${product.price}</span>
                            <Button variant="outline-primary" size="sm">View Details</Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            );
          })()}
        </Container>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-5 bg-light">
        <Container>
          <h1 className="text-center mb-5">Customer Reviews</h1>
          
          <Row className="mb-4">
            <Col md={6} className="mb-3 mb-md-0">
              <div className="d-flex align-items-center">
                <h4 className="mb-0 me-3">Overall Rating:</h4>
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    {renderStars(4.5)}
                  </div>
                  <span className="fw-bold">4.5/5</span>
                </div>
              </div>
            </Col>
          </Row>
          
          <Row>
            {reviews.map(review => (
              <Col key={review.id} md={6} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="d-flex">
                        <img 
                          src={review.avatar} 
                          alt={review.name} 
                          className="rounded-circle me-3"
                          width="50"
                          height="50"
                        />
                        <div>
                          <h5 className="mb-0">{review.name}</h5>
                          <p className="text-muted mb-0 small">{review.date}</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <h5>{review.title}</h5>
                    <p className="text-muted small mb-3">Product: {review.productName}</p>
                    <p className="mb-0">{review.content}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <Container>
          <h1 className="text-center mb-5">Contact Us</h1>
          
          <Row className="mb-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="mb-4">Get In Touch</h2>
              <p className="mb-4">
                Have questions about our products or services? Need technical support? 
                Fill out the form and our team will get back to you as soon as possible.
              </p>
              
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter first name" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter last name" />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="Enter phone number" />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Select>
                    <option>Select a subject</option>
                    <option>Product Inquiry</option>
                    <option>Technical Support</option>
                    <option>Order Status</option>
                    <option>Returns & Warranty</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Enter your message" />
                </Form.Group>
                
                <Button variant="primary" type="submit" className="w-100">
                  Send Message
                </Button>
              </Form>
            </Col>
            
            <Col lg={6}>
              <Row className="mb-4">
                <Col md={12}>
                  <Card className="border-0 shadow-sm">
                    <Card.Body>
                      <h3 className="mb-4">Contact Information</h3>
                      
                      <div className="d-flex mb-3">
                        <div className="me-3">
                          <Envelope size={24} className="text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-1">Email</h5>
                          <p className="mb-0">info@gearsphere.com</p>
                          <p className="mb-0">support@gearsphere.com</p>
                        </div>
                      </div>
                      
                      <div className="d-flex mb-3">
                        <div className="me-3">
                          <Telephone size={24} className="text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-1">Phone</h5>
                          <p className="mb-0">+1 (555) 123-4567</p>
                          <p className="mb-0">+1 (555) 987-6543</p>
                        </div>
                      </div>
                      
                      <div className="d-flex mb-3">
                        <div className="me-3">
                          <GeoAlt size={24} className="text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-1">Address</h5>
                          <p className="mb-0">123 Tech Street, Suite 101</p>
                          <p className="mb-0">San Francisco, CA 94107</p>
                        </div>
                      </div>
                      
                      <div className="d-flex">
                        <div className="me-3">
                          <Clock size={24} className="text-primary" />
                        </div>
                        <div>
                          <h5 className="mb-1">Business Hours</h5>
                          <p className="mb-0">Monday - Friday: 9:00 AM - 6:00 PM</p>
                          <p className="mb-0">Saturday: 10:00 AM - 4:00 PM</p>
                          <p className="mb-0">Sunday: Closed</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Login Modal */}
      <LoginModal 
        show={showLoginModal} 
        onHide={() => setShowLoginModal(false)} 
        switchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }} 
      />

      {/* Register Modal */}
      <RegisterModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
        switchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
      <Footer />
    </>
  );
}

export default HomePage;