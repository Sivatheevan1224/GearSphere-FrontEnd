import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

function MainNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      // Check which section is in view
      const sections = ['hero', 'about', 'services', 'products', 'reviews', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const navbarHeight = document.querySelector('.navbar-custom')?.offsetHeight || 80;
          
          // Consider a section "in view" when its top is near the navbar bottom
          if (rect.top <= navbarHeight + 50 && rect.bottom >= navbarHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setTimeout(() => {
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
      setExpanded(false);
    }, 100);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Navbar 
        expand="lg" 
        className={`navbar-custom sticky-top shadow-sm ${expanded ? 'expanded' : ''}`}
        bg="light"
        expanded={expanded}
        onToggle={(isExpanded) => setExpanded(isExpanded)}
      >
        <Container>
          <Navbar.Brand 
            onClick={() => {
              scrollToSection('hero');
              setExpanded(false);
            }}
            className={`d-flex align-items-center cursor-pointer ${isScrolled ? 'navbar-brand-glow' : ''}`}
            role="button"
          >
            <img 
              src="/src/images/logo.PNG" 
              alt="GearSphere Logo" 
              className="me-2" 
              style={{ height: '70px', width: '80px' }}
            />
            <span className="fw-bold">GearSphere</span>
          </Navbar.Brand>

          <Navbar.Toggle 
            aria-controls="basic-navbar-nav"
            className="border-0 shadow-none"
          />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link 
                onClick={() => scrollToSection('hero')}
                className={`nav-link-custom cursor-pointer ${activeSection === 'hero' ? 'section-in-view' : ''}`}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                onClick={() => scrollToSection('about')}
                className={`nav-link-custom cursor-pointer ${activeSection === 'about' ? 'section-in-view' : ''}`}
              >
                About Us
              </Nav.Link>
              <Nav.Link 
                onClick={() => scrollToSection('services')}
                className={`nav-link-custom cursor-pointer ${activeSection === 'services' ? 'section-in-view' : ''}`}
              >
                Services
              </Nav.Link>
              <Nav.Link 
                onClick={() => scrollToSection('products')}
                className={`nav-link-custom cursor-pointer ${activeSection === 'products' ? 'section-in-view' : ''}`}
              >
                Products
              </Nav.Link>
              <Nav.Link 
                onClick={() => scrollToSection('reviews')}
                className={`nav-link-custom cursor-pointer ${activeSection === 'reviews' ? 'section-in-view' : ''}`}
              >
                Reviews
              </Nav.Link>
              <Nav.Link 
                onClick={() => scrollToSection('contact')}
                className={`nav-link-custom cursor-pointer ${activeSection === 'contact' ? 'section-in-view' : ''}`}
              >
                Contact
              </Nav.Link>
            </Nav>
            <Nav className="d-flex flex-column flex-lg-row">
              {user ? (
                <>
                  <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                  <Button 
                    variant="outline-primary" 
                    className="me-lg-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline-primary" 
                    className="me-lg-2"
                    onClick={() => {
                      setShowLoginModal(true);
                      setExpanded(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button 
                    variant="primary"
                    onClick={() => {
                      setShowRegisterModal(true);
                      setExpanded(false);
                    }}
                  >
                    Register
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal 
        show={showLoginModal} 
        onHide={() => setShowLoginModal(false)} 
        switchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }} 
      />
      <RegisterModal 
        show={showRegisterModal} 
        onHide={() => setShowRegisterModal(false)}
        switchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
}

export default MainNavbar;