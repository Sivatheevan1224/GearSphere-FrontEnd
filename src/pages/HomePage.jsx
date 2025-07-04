import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Badge, Carousel, Navbar, Nav, Accordion, Form, InputGroup } from "react-bootstrap";
import { Cpu, People, Lightning, Shield, ChevronRight, Star, Grid3x3Gap, Tools, Award, Wrench, Headset, Search, Filter, SortDown, StarFill, Envelope, Telephone, GeoAlt, Clock, Person, Display, Motherboard, Memory, Hdd, Power, PcDisplay, Fan, PersonCheck, Cart, CameraVideo, Mic, Printer, BatteryFull, Wifi, Tablet, Camera, CameraReels, ChevronLeft } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import LoginModal from "../components/login/LoginModal";
import Footer from "../components/footer/Footer";
import pcGif from '../images/pc_video1.gif';
import { Link, useNavigate } from "react-router-dom";
import sivatheevanImg from '../images/sivatheevan.png';
import makinthanImg from '../images/makinthan.png';
import pugazhImg from '../images/pugazh.png';
import kowsiImg from '../images/kowsi.png';
import gif1 from '../images/download.jpg';
import profile1 from '../images/profile/pp1.png';
import profile2 from '../images/profile/pp2.png';
import profile3 from '../images/profile/pp3.jpg';
import profile4 from '../images/profile/pp4.jpg';
import profile5 from '../images/profile/pp5.jpg';
import profile6 from '../images/profile/pp6.jpg';
import pcpic1 from '../images/pcpic1.png';
import pcpic2 from '../images/pcpic2.jpeg';
import pcpic3 from '../images/pcpic3.jpg';
import aboutus from '../images/aboutus2.png';
import serviceimg from '../images/services.png';

const ourValuesCardHoverStyle = `
.our-values-card {
  transition: box-shadow 0.3s, transform 0.3s;
}
.our-values-card:hover {
  box-shadow: 0 8px 32px rgba(67,97,238,0.18), 0 1.5px 8px rgba(0,0,0,0.10);
  transform: translateY(-6px) scale(1.04);
  background: rgba(255,255,255,0.95);
}
`;

const serviceCardBorderStyle = `
.service-card.modern-border {
  position: relative;
  background: white;
  border: none;
  border-radius: 1.25rem;
  overflow: visible;
  z-index: 1;
}
.service-card.modern-border::before {
  content: '';
  position: absolute;
  top: -3px; left: -3px; right: -3px; bottom: -3px;
  z-index: 0;
  border-radius: 1.35rem;
  background: linear-gradient(135deg, #4361ee, #00b894, #fd7e14, #6c5ce7);
  background-size: 300% 300%;
  animation: borderGradientMove 6s ease infinite;
}
@keyframes borderGradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.service-card.modern-border > .card-body {
  position: relative;
  z-index: 1;
  background: white;
  border-radius: 1.1rem;
}
`;

const productSliderStyle = `
.product-slider-row {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 8px;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: #4361ee #f1f1f1;
}
.product-slider-row::-webkit-scrollbar {
  height: 10px;
}
.product-slider-row::-webkit-scrollbar-thumb {
  background: #4361ee;
  border-radius: 5px;
}
.product-slider-row::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}
.product-slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: #fff;
  border: 1px solid #4361ee;
  color: #4361ee;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(67,97,238,0.08);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.product-slider-arrow:hover {
  background: #4361ee;
  color: #fff;
}
.product-slider-arrow.left { left: -18px; }
.product-slider-arrow.right { right: -18px; }
`;

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
  const [partType, setPartType] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const userType = sessionStorage.getItem("user_type");
    if (userType) {
      const type = userType.toLowerCase();
      if (type === "admin") navigate("/admin");
      else if (type === "customer") navigate("/customer/dashboard");
      else if (type === "seller") navigate("/seller");
      else if (type === "technician") navigate("/technician/dashboard");
    }
  }, [navigate]);

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


  // PC Parts data
  const pcParts = [
    // CPU
    { type: "CPU", name: "Intel Core i9-13900K", price: 125000, icon: <Cpu size={32} className="text-primary" />, image: null },
    { type: "CPU", name: "AMD Ryzen 9 7950X", price: 120000, icon: <Cpu size={32} className="text-danger" />, image: null },
    { type: "CPU", name: "Intel Core i7-13700K", price: 85000, icon: <Cpu size={32} className="text-primary" />, image: null },
    { type: "CPU", name: "Intel Core i5-12600K", price: 60000, icon: <Cpu size={32} className="text-primary" />, image: null },
    { type: "CPU", name: "AMD Ryzen 5 5600X", price: 45000, icon: <Cpu size={32} className="text-danger" />, image: null },
    { type: "CPU", name: "Intel Core i3-12100F", price: 25000, icon: <Cpu size={32} className="text-primary" />, image: null },
    { type: "CPU", name: "AMD Ryzen 3 4100", price: 18000, icon: <Cpu size={32} className="text-danger" />, image: null },
    // GPU
    { type: "GPU", name: "NVIDIA RTX 4090", price: 350000, icon: <Display size={32} className="text-success" />, image: null },
    { type: "GPU", name: "AMD Radeon RX 7900 XTX", price: 220000, icon: <Display size={32} className="text-danger" />, image: null },
    { type: "GPU", name: "NVIDIA RTX 4070 Ti", price: 180000, icon: <Display size={32} className="text-success" />, image: null },
    { type: "GPU", name: "NVIDIA RTX 3060", price: 90000, icon: <Display size={32} className="text-success" />, image: null },
    { type: "GPU", name: "AMD Radeon RX 6600", price: 70000, icon: <Display size={32} className="text-danger" />, image: null },
    { type: "GPU", name: "NVIDIA GTX 1660 Super", price: 45000, icon: <Display size={32} className="text-success" />, image: null },
    { type: "GPU", name: "AMD Radeon RX 6500 XT", price: 35000, icon: <Display size={32} className="text-danger" />, image: null },
    // RAM
    { type: "RAM", name: "64GB DDR5 6000MHz", price: 65000, icon: <Memory size={32} className="text-warning" />, image: null },
    { type: "RAM", name: "32GB DDR5 6000MHz", price: 35000, icon: <Memory size={32} className="text-warning" />, image: null },
    { type: "RAM", name: "16GB DDR4 3200MHz", price: 12000, icon: <Memory size={32} className="text-warning" />, image: null },
    { type: "RAM", name: "8GB DDR4 2666MHz", price: 6000, icon: <Memory size={32} className="text-warning" />, image: null },
    { type: "RAM", name: "8GB DDR3 1600MHz", price: 3500, icon: <Memory size={32} className="text-warning" />, image: null },
    // Storage
    { type: "Storage", name: "4TB NVMe SSD", price: 85000, icon: <Hdd size={32} className="text-info" />, image: null },
    { type: "Storage", name: "2TB NVMe SSD", price: 45000, icon: <Hdd size={32} className="text-info" />, image: null },
    { type: "Storage", name: "1TB SATA SSD", price: 18000, icon: <Hdd size={32} className="text-info" />, image: null },
    { type: "Storage", name: "2TB HDD", price: 9000, icon: <Hdd size={32} className="text-info" />, image: null },
    { type: "Storage", name: "1TB HDD", price: 6000, icon: <Hdd size={32} className="text-info" />, image: null },
    // PSU
    { type: "PSU", name: "1200W Platinum", price: 45000, icon: <Power size={32} className="text-secondary" />, image: null },
    { type: "PSU", name: "850W Gold", price: 28000, icon: <Power size={32} className="text-secondary" />, image: null },
    { type: "PSU", name: "650W Bronze", price: 12000, icon: <Power size={32} className="text-secondary" />, image: null },
    { type: "PSU", name: "500W Basic", price: 7000, icon: <Power size={32} className="text-secondary" />, image: null },
    // Case
    { type: "Case", name: "Lian Li O11 Dynamic", price: 35000, icon: <PcDisplay size={32} className="text-dark" />, image: null },
    { type: "Case", name: "NZXT H510", price: 15000, icon: <PcDisplay size={32} className="text-dark" />, image: null },
    { type: "Case", name: "Cooler Master NR200", price: 18000, icon: <PcDisplay size={32} className="text-dark" />, image: null },
    { type: "Case", name: "Corsair 4000D Airflow", price: 20000, icon: <PcDisplay size={32} className="text-dark" />, image: null },
    // Cooling
    { type: "Cooling", name: "360mm AIO Liquid Cooler", price: 35000, icon: <Fan size={32} className="text-primary" />, image: null },
    { type: "Cooling", name: "Premium Air Cooler", price: 20000, icon: <Fan size={32} className="text-primary" />, image: null },
    { type: "Cooling", name: "120mm Case Fan", price: 3000, icon: <Fan size={32} className="text-primary" />, image: null },
    { type: "Cooling", name: "ARGB Fan Kit", price: 7000, icon: <Fan size={32} className="text-primary" />, image: null },
    // Peripherals
    { type: "Keyboard", name: "Mechanical Keyboard", price: 12000, icon: <Grid3x3Gap size={32} className="text-primary" />, image: null },
    { type: "Keyboard", name: "Wireless Keyboard", price: 9000, icon: <Grid3x3Gap size={32} className="text-primary" />, image: null },
    { type: "Mouse", name: "Gaming Mouse", price: 8000, icon: <Person size={32} className="text-success" />, image: null },
    { type: "Mouse", name: "Wireless Mouse", price: 7000, icon: <Person size={32} className="text-success" />, image: null },
    { type: "Speaker", name: "Stereo Speakers", price: 15000, icon: <Headset size={32} className="text-danger" />, image: null },
    { type: "Speaker", name: "Bluetooth Speaker", price: 10000, icon: <Headset size={32} className="text-danger" />, image: null },
    { type: "Monitor", name: "27'' 4K Monitor", price: 90000, icon: <Display size={32} className="text-info" />, image: null },
    { type: "Monitor", name: "24'' FHD Monitor", price: 40000, icon: <Display size={32} className="text-info" />, image: null },
    { type: "Monitor", name: "32'' QHD Curved Monitor", price: 120000, icon: <Display size={32} className="text-info" />, image: null },
    { type: "Webcam", name: "HD Webcam", price: 7000, icon: <CameraVideo size={32} className="text-secondary" />, image: null },
    { type: "Webcam", name: "4K Webcam", price: 15000, icon: <CameraVideo size={32} className="text-secondary" />, image: null },
    { type: "Microphone", name: "USB Microphone", price: 9000, icon: <Mic size={32} className="text-primary" />, image: null },
    { type: "Microphone", name: "Studio Microphone", price: 25000, icon: <Mic size={32} className="text-primary" />, image: null },
    { type: "UPS", name: "1000VA UPS", price: 25000, icon: <BatteryFull size={32} className="text-success" />, image: null },
    { type: "UPS", name: "600VA UPS", price: 12000, icon: <BatteryFull size={32} className="text-success" />, image: null },
    { type: "Router", name: "WiFi Router", price: 8000, icon: <Wifi size={32} className="text-info" />, image: null },
    { type: "Router", name: "Mesh Router", price: 18000, icon: <Wifi size={32} className="text-info" />, image: null },
    // More peripherals
    { type: "Mousepad", name: "RGB Mousepad", price: 3500, icon: <Grid3x3Gap size={32} className="text-primary" />, image: null },
    { type: "Headset", name: "Gaming Headset", price: 12000, icon: <Headset size={32} className="text-danger" />, image: null },
    { type: "Headset", name: "Wireless Headset", price: 18000, icon: <Headset size={32} className="text-danger" />, image: null },
    { type: "Monitor Arm", name: "Dual Monitor Arm", price: 15000, icon: <PcDisplay size={32} className="text-dark" />, image: null },
    { type: "Monitor Arm", name: "Single Monitor Arm", price: 9000, icon: <PcDisplay size={32} className="text-dark" />, image: null },
    { type: "Controller", name: "Game Controller", price: 8000, icon: <Person size={32} className="text-success" />, image: null },
    { type: "SSD Enclosure", name: "NVMe SSD Enclosure", price: 5000, icon: <Hdd size={32} className="text-info" />, image: null },
    { type: "Docking Station", name: "USB-C Docking Station", price: 20000, icon: <Power size={32} className="text-secondary" />, image: null },
  ];

  // Filtered and searched parts
  const filteredParts = pcParts.filter(part => {
    const matchesType = partType === "All" || part.type === partType;
    const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

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
      avatar: profile1
    },
    {
      id: 2,
      name: "Sarah Johnson",
      date: "April 3, 2023",
      rating: 5,
      title: "Perfect for 3D Work",
      content: "As a 3D artist, I need reliable hardware that can handle heavy workloads. My GearSphere PC delivers exactly that. Renders are faster than ever and the system stays cool even under load.",
      productName: "Creator Pro Workstation",
      avatar: profile2
    },
    {
      id: 3,
      name: "David Rodriguez",
      date: "February 22, 2023",
      rating: 4,
      title: "Great Value for Money",
      content: "The PC builder was incredibly knowledgeable and helped me choose the perfect components for my development needs. Only giving 4 stars because shipping took longer than expected.",
      productName: "Stealth Mini ITX",
      avatar: profile3
    },
    {
      id: 4,
      name: "Emily Watson",
      date: "May 10, 2023",
      rating: 5,
      title: "Amazing Customer Service",
      content: "Not only was my PC built perfectly, but the customer service was outstanding. They helped me troubleshoot a minor issue over the phone and were incredibly patient.",
      productName: "Ultimate Streaming PC",
      avatar: profile4
    },
    {
      id: 5,
      name: "James Wilson",
      date: "January 8, 2023",
      rating: 3,
      title: "Good PC, Shipping Issues",
      content: "The PC itself is great and performs well for gaming. However, there were some shipping delays and the packaging could have been better. The support team was helpful in resolving my concerns.",
      productName: "Budget Gaming Rig",
      avatar: profile5
    },
    {
      id: 6,
      name: "Lisa Thompson",
      date: "April 28, 2023",
      rating: 5,
      title: "Perfect Office PC",
      content: "This PC is perfect for my office needs. It's quiet, fast, and the price was very reasonable. The ordering process was smooth and delivery was prompt.",
      productName: "Office Productivity PC",
      avatar: profile6
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

  return (
    <div className="homepage-root">
      <style>{ourValuesCardHoverStyle}</style>
      <style>{serviceCardBorderStyle}</style>
      <style>{productSliderStyle}</style>
      {/* Hero Section */}
      <section id="hero" className="py-5 bg-black text-white position-relative overflow-hidden mb-5" style={{borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: '2rem', borderBottomRightRadius: '2rem', boxShadow: '0 4px 32px rgba(0,0,0,0.10)', marginTop: 0, marginBottom: '2rem'}}>
        {/* Blurred background image */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${pcpic2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(12px)',
            zIndex: 0,
            opacity: 0.7
          }}
        ></div>
        {/* Overlay for darkening and contrast */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "radial-gradient(circle at 30% 50%, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 70%)",
            zIndex: 1,
          }}
        ></div>
        <Container className="py-5 position-relative" style={{ zIndex: 2 }}>
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
            <Col lg={6} className="text-lg-end" style={{backgroundBlendMode: 'darken'}}>
              <div className="d-inline-block rounded shadow-lg" >
                <img
                  src={pcGif}
                  alt="PC Building Animation"
                  className="img-fluid rounded pc-gif-img"
                />
              </div>
            </Col>
          </Row>
        </Container>
        {/* Blurred background image */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${pcpic2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // black overlay
            backgroundBlendMode: 'darken',         // or try 'multiply'
            //filter: 'blur(0px)',
            zIndex: 0,
            opacity: 1
          }}
        ></div>
        {/* Overlay for darkening and contrast */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "radial-gradient(circle at 30% 50%, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 70%)",
            zIndex: 1,
          }}
        ></div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5 about-section-custom position-relative mb-5" style={{overflow: 'hidden', borderRadius: '2rem', boxShadow: '0 4px 32px rgba(0,0,0,0.10)', background: 'transparent', marginTop: '2rem', marginBottom: '2rem'}}>
        <Container>
          <h1 className="text-center mb-5 about-title-custom">About GearSphere</h1>
          <Row className="mb-5">
            <Col md={6} style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <h2 className="about-heading-custom">Our Story</h2>
              <p className="about-text-custom" style={{textAlign: 'justify'}}>
              <strong>GearSphere</strong> was founded in 2020 by a group of passionate PC enthusiasts to make custom PC building accessible to everyone. What began as a small effort has grown into a trusted platform connecting customers with expert PC builders across the country.
              </p>
              <p className="about-text-custom" style={{textAlign: 'justify'}}>
              Our mission is to make custom PC building easy, affordable, and accessible whether you're a beginner or an experienced user. GearSphere bridges the gap between customers and skilled technicians, offering guided tools to select compatible parts, compare options, and get budget-friendly suggestions. We work only with verified technicians and sellers to ensure quality, clear pricing, and honest reviews. We also provide lifetime technical support, upgrade options, and empower technicians by giving them a professional platform to grow.
              </p>
            </Col>
            <Col md={6} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
              <div style={{width: '100%', height: '100%', minHeight: 340, borderRadius: '2rem', overflow: 'hidden'}}>
                <img 
                  src={aboutus} 
                  alt="GearSphere Team" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2rem' }}
                />
              </div>
            </Col>
          </Row>
          
          <Row className="mb-5">
            <Col md={12}>
              <h2 className="text-center mb-4">Our Values</h2>
              <Row>
                <Col md={4} className="mb-4">
                  <div className="our-values-card text-center p-4 h-100 border rounded shadow-sm">
                    <h4>Quality</h4>
                    <p style={{textAlign: 'justify'}}>We never compromise on component quality and build standards.</p>
                  </div>
                </Col>
                <Col md={4} className="mb-4">
                  <div className="our-values-card text-center p-4 h-100 border rounded shadow-sm">
                    <h4>Transparency</h4>
                    <p style={{textAlign: 'justify'}}>Clear pricing, honest advice, and no hidden fees.</p>
                  </div>
                </Col>
                <Col md={4} className="mb-4">
                  <div className="our-values-card text-center p-4 h-100 border rounded shadow-sm">
                    <h4>Support</h4>
                    <p style={{textAlign: 'justify'}}>Lifetime technical support for all our custom builds.</p>
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
      <section id="services" className="py-5 bg-white mb-5" style={{borderRadius: '2rem', boxShadow: '0 4px 32px rgba(0,0,0,0.10)', marginTop: '2rem', marginBottom: '2rem'}}>
        <Container className="py-5">
          <h1 className="text-center mb-5">Our Services</h1>
          
          <Row className="mb-5">
            <Col md={6} className="mb-4 mb-md-0">
              <h2>Expert PC Building Services</h2>
              <p style={{textAlign: 'justify'}}>
                At GearSphere, we offer comprehensive PC building services tailored to your specific needs. Whether you're a gamer, content creator, or professional, our expert builders will craft the perfect system for you.
              </p>
              <p style={{textAlign: 'justify'}}>
                We handle everything from component selection to assembly, testing, and delivery, ensuring you receive a high-performance, reliable system.
              </p>
              <Button variant="primary" className="mt-3" onClick={() => setShowLoginModal(true)}>Get Started</Button>
            </Col>
            <Col md={6}>
              <img 
                src={serviceimg} 
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
                  <Card className="service-card modern-border h-100">
                    <Card.Body className="text-center">
                      <div className="service-icon mb-3">
                        <Cpu size={40} style={{color: '#4361ee'}} />
                      </div>
                      <Card.Title>Custom PC Building</Card.Title><br/>
                      <Card.Text style={{textAlign: 'justify'}}>
                        Personalized systems built to your specifications with premium components and expert assembly.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3} className="mb-4">
                  <Card className="service-card modern-border h-100">
                    <Card.Body className="text-center">
                      <div className="service-icon mb-3">
                        <Tools size={40} style={{color: '#00b894'}} />
                      </div>
                      <Card.Title>Budget-Based PC Build Recommendation</Card.Title>
                      <Card.Text style={{textAlign: 'justify'}}>
                        Get personalized PC build recommendations based on your budget and needs, ensuring the best value for your money.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3} className="mb-4">
                  <Card className="service-card modern-border h-100">
                    <Card.Body className="text-center">
                      <div className="service-icon mb-3">
                        <PersonCheck size={40} style={{color: '#fd7e14'}} />
                      </div>
                      <Card.Title>Assign Technician for PC Build</Card.Title><br/>
                      <Card.Text style={{textAlign: 'justify'}}>
                        Easily assign a verified technician to build your custom PC, ensuring professional assembly and support.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3} className="mb-4">
                  <Card className="service-card modern-border h-100">
                    <Card.Body className="text-center">
                      <div className="service-icon mb-3">
                        <Cart size={40} style={{color: '#6c5ce7'}} />
                      </div>
                      <Card.Title>Buy PC Parts</Card.Title><br/>
                      <Card.Text style={{textAlign: 'justify'}}>
                        Purchase high-quality PC parts and components directly from trusted sellers through our marketplace.
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
      <section id="products" className="py-5 bg-white mb-5" style={{borderRadius: '2rem', boxShadow: '0 4px 32px rgba(0,0,0,0.10)', marginTop: '2rem', marginBottom: '2rem'}}>
        <Container>
          <h1 className="text-center mb-5">Our Products</h1>
          <Row className="mb-4">
            <Col md={6} className="mb-3 mb-md-0">
              <InputGroup>
                <Form.Control
                  placeholder="Search PC parts..."
                  aria-label="Search PC parts"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <Button variant="outline-secondary">
                  <Search />
                </Button>
              </InputGroup>
            </Col>
            <Col md={6} className="d-flex justify-content-md-end">
              <Form.Select style={{maxWidth: "220px"}} value={partType} onChange={e => setPartType(e.target.value)}>
                <option value="All">All Types</option>
                {[...new Set(pcParts.map(p => p.type))].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <div style={{position: 'relative'}}>
            <div className="product-slider-arrow left" onClick={() => {
              const row = document.getElementById('product-slider-row');
              if (row) row.scrollBy({left: -240, behavior: 'smooth'});
            }}>
              <ChevronLeft size={24} />
            </div>
            <div className="product-slider-arrow right" onClick={() => {
              const row = document.getElementById('product-slider-row');
              if (row) row.scrollBy({left: 240, behavior: 'smooth'});
            }}>
              <ChevronRight size={24} />
            </div>
            <div id="product-slider-row" className="product-slider-row" style={{display: 'flex', flexDirection: 'column', gap: 24, minWidth: 320, overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 8}}>
              {[0, 1, 2].map(rowIdx => {
                const itemsPerRow = 6;
                const rowParts = filteredParts.slice(rowIdx * itemsPerRow, (rowIdx + 1) * itemsPerRow);
                return (
                  <div key={rowIdx} style={{display: 'flex', gap: 24, minWidth: 320}}>
                    {rowParts.length === 0 && rowIdx === 0 ? (
                      <div className="text-center text-muted py-5 w-100">No parts found.</div>
                    ) : (
                      rowParts.map((part, idx) => (
                        <div key={idx} style={{flex: '0 0 220px', maxWidth: 220}}>
                          <Card className="h-100 shadow-sm text-center">
                            <Card.Body>
                              <div className="mb-3">
                                {part.image
                                  ? <img src={part.image} alt={part.name} style={{width: 60, height: 60, objectFit: 'contain'}} />
                                  : part.icon}
                              </div>
                              <Card.Title>{part.name}</Card.Title>
                              <Card.Text className="text-muted">{part.type}</Card.Text>
                              <h5 className="text-primary mb-0">LKR {part.price.toLocaleString()}</h5>
                            </Card.Body>
                          </Card>
                        </div>
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-5 bg-white mb-5" style={{borderRadius: '2rem', boxShadow: '0 4px 32px rgba(0,0,0,0.10)', marginTop: '2rem', marginBottom: '2rem'}}>
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
      <section id="contact" className="py-5 bg-white" style={{borderRadius: '2rem', boxShadow: '0 4px 32px rgba(0,0,0,0.10)', marginTop: '2rem', marginBottom: 0}}>
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
                  <Form.Control type="tel" placeholder="07X XXX XXXX" pattern="0[0-9]{2} [0-9]{3} [0-9]{4}" title="Enter a valid Sri Lankan phone number (e.g., 077 123 4567)" />
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
                          <p className="mb-0">Street Address, City (e.g., Colombo)</p>
                        </div>
                      </div>
                        <div className="d-flex justify-content-center">
                          <img 
                            src="/src/images/logo.PNG" 
                            alt="GearSphere Logo" 
                            className="me-2" 
                            style={{ height: '300px', width: '300px' }}
                          />
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
      {showRegisterModal && (
        <RegisterPage
          show={showRegisterModal}
          onHide={() => setShowRegisterModal(false)}
          switchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
      <Footer />
    </div>
  );
}

export default HomePage;