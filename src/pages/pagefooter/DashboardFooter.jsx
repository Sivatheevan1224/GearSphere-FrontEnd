import React from 'react';

const DashboardFooter = () => (
  <footer style={{
    background: '#212529',
    borderTop: '1.5px solid #343a40',
    padding: '1rem 0',
    marginTop: '2rem',
    color: '#fff'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: 1200,
      margin: '0 auto',
      flexWrap: 'wrap'
    }}>
      {/* Left content */}
      <div style={{ flex: 1, minWidth: 180, textAlign: 'left', color: '#adb5bd', fontSize: '0.95rem' }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>About GearSphere</div>
        <div>
          PC builds, repairs, and tech solutions.<br />
          Trusted by Sri Lanka.
        </div>
      </div>
      {/* Center logo */}
      <div style={{ flex: 1, minWidth: 180, textAlign: 'center' }}>
        <img
          src="/src/images/logo.PNG"
          alt="GearSphere Logo"
          style={{ height: '40px', marginBottom: 4, filter: 'brightness(0) invert(1)' }}
        />
        <div style={{ fontWeight: 600, fontSize: '1.05rem', color: '#fff' }}>
          GearSphere
        </div>
        <div style={{ color: '#adb5bd', fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
      {/* Right content */}
      <div style={{ flex: 1, minWidth: 180, textAlign: 'right', color: '#adb5bd', fontSize: '0.95rem' }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Contact</div>
        <div>
          Email: support@gearsphere.com<br />
          Hotline: 011-1234567
        </div>
      </div>
    </div>
  </footer>
);

export default DashboardFooter; 