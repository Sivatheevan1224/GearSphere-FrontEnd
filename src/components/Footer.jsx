import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../images/logo.PNG';

function Footer() {
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

  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center mb-3">
              <img src={logo} alt="GearSphere Logo" style={{height: 32, width: 'auto', marginRight: 10, verticalAlign: 'middle', background: '#fff', padding: 4, borderRadius: 8}} />
              <h5 className="mb-0 fw-bold">GearSphere</h5>
            </div>
            <p className="mb-3">Building the future, one custom PC at a time.</p>
            <p className="mb-0 small">© {new Date().getFullYear()} GearSphere. All rights reserved.</p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="mb-3 fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <span 
                  onClick={() => scrollToSection('hero')} 
                  className="text-white-50 text-decoration-none cursor-pointer hover-text-white"
                  role="button"
                >
                  Home
                </span>
              </li>
              <li className="mb-2">
                <span 
                  onClick={() => scrollToSection('about')} 
                  className="text-white-50 text-decoration-none cursor-pointer hover-text-white"
                  role="button"
                >
                  About Us
                </span>
              </li>
              <li className="mb-2">
                <span 
                  onClick={() => scrollToSection('services')} 
                  className="text-white-50 text-decoration-none cursor-pointer hover-text-white"
                  role="button"
                >
                  Services
                </span>
              </li>
              <li className="mb-2">
                <span 
                  onClick={() => scrollToSection('products')} 
                  className="text-white-50 text-decoration-none cursor-pointer hover-text-white"
                  role="button"
                >
                  Products
                </span>
              </li>
              <li className="mb-2">
                <span 
                  onClick={() => scrollToSection('reviews')} 
                  className="text-white-50 text-decoration-none cursor-pointer hover-text-white"
                  role="button"
                >
                  Reviews
                </span>
              </li>
              <li className="mb-2">
                <span 
                  onClick={() => scrollToSection('contact')} 
                  className="text-white-50 text-decoration-none cursor-pointer hover-text-white"
                  role="button"
                >
                  Contact
                </span>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="mb-3 fw-bold">Contact Info</h5>
            <ul className="list-unstyled">
              <li className="mb-2 text-white-50">
                <strong>Address:</strong> 123 Tech Street, Digital City, 12345
              </li>
              <li className="mb-2 text-white-50">
                <strong>Phone:</strong> (555) 123-4567
              </li>
              <li className="mb-2 text-white-50">
                <strong>Email:</strong> info@gearsphere.com
              </li>
              <li className="text-white-50">
                <strong>Hours:</strong> Mon-Fri: 9AM - 6PM
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;