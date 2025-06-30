import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import registerImg from '../images/register.png';
import CustomerRegistration from './CustomerRegistration';
import TechnicianInstruction from './TechnicianInstruction';
import TechnicianRegistration from './TechnicianRegistration';

function RegisterPage({ show, onHide, switchToLogin }) {
  const [showCustomer, setShowCustomer] = useState(false);
  const [showTechInstruct, setShowTechInstruct] = useState(false);
  const [showTechReg, setShowTechReg] = useState(false);

  // Handler for after agreeing to instructions
  const handleTechAgree = () => {
    setShowTechInstruct(false);
    setShowTechReg(true);
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        {/* Left image section */}
        <div className="d-none d-md-flex align-items-center justify-content-center bg-dark" style={{ width: 500, height: 600, borderRadius: '16px 0 0 16px' }}>
          <img src={registerImg} alt="Register" style={{ width: 400, borderRadius: 16 }} />
        </div>
        {/* Right options section */}
        <div className="flex-grow-1 p-5 d-flex flex-column align-items-center justify-content-center" style={{ background: '#fff', borderRadius: '0 16px 16px 0', minHeight: 600 }}>
          <h2 className="mb-4 text-center">Create Your Account</h2>
          <Button size="lg" className="mb-4 w-75" variant="primary" style={{ fontSize: 22 }} onClick={() => setShowCustomer(true)}>
            Register as Customer
          </Button>
          <Button size="lg" className="w-75" variant="success" style={{ fontSize: 22 }} onClick={() => setShowTechInstruct(true)}>
            Register as Technician
          </Button>
          <div className="text-center mt-4">
            Already have an account?{' '}
            <a href="#" onClick={switchToLogin}>Login</a>
          </div>
        </div>
      </div>
      {/* Modals for registration flows */}
      <CustomerRegistration show={showCustomer} onHide={() => setShowCustomer(false)} switchToLogin={switchToLogin} />
      <TechnicianInstruction show={showTechInstruct} onHide={() => setShowTechInstruct(false)} onAgree={handleTechAgree} />
      <TechnicianRegistration show={showTechReg} onHide={() => setShowTechReg(false)} switchToLogin={switchToLogin} />
    </>
  );
}

export default RegisterPage; 