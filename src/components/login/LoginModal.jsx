import { useState, useEffect } from "react"
import { Modal, Button, Form, Alert, InputGroup } from "react-bootstrap"
import { useNavigate, useLocation } from "react-router-dom"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import loginImage from "../../images/login.jpg"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./loginmodal.css"
import axios from "axios";

function LoginModal({ show, onHide, switchToRegister }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotStep, setForgotStep] = useState(1)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotError, setForgotError] = useState("")
  const [enteredOtp, setEnteredOtp] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const navigate = useNavigate()
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");  
  const [checkOTP,setCheckOTP] = useState("");
  const [step, setStep] = useState(1);
  const location = useLocation();

  //Handle login 
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.includes('@gmail.com')) {
      toast.error("Please enter valid email..");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost/gearsphere_api/GearSphere-BackEnd/login.php",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        const { user_type, user_id, technician_id } = response.data;

        toast.success(response.data.message, { autoClose: 2000 });

        setTimeout(() => {

          sessionStorage.setItem("user_type", user_type.toLowerCase());
          sessionStorage.setItem("user_id", user_id);
          sessionStorage.setItem("email", email);
          // Save technician_id if user is technician
          if (user_type.toLowerCase() === "technician" && technician_id) {
            sessionStorage.setItem("technician_id", technician_id);
          } else {
            sessionStorage.removeItem("technician_id"); // Clean up if not technician
          }
          toast.dismiss();
          onHide();

          if (user_type.toLowerCase() === "admin") {
            navigate("/admin");
          } else if (user_type.toLowerCase() === "customer") {
            navigate("/customer/dashboard");
          } else if (user_type.toLowerCase() === "technician") {
            navigate("/technician/dashboard");
          } else if (user_type.toLowerCase() === "seller") {
            navigate("/seller");
          }
        }, 2000);
      }
      else if (response.data.message) {
        toast.error(response.data.message);
      }
      else {
        toast.error(response.data.message);
      }


    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error("Login failed: " + error.message);
      }else {
        toast.error("Login failed. Try again..");
      }

    }
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail.includes('@gmail.com')) {
      toast.error("Please enter valid email..");
      return;
    }
    try {
      if(step === 1)
      {
        const response = await axios.post("http://localhost/gearsphere_api/GearSphere-BackEnd/generateOTP.php",
          {
            email: forgotPasswordEmail.trim()            //username: forgotPasswordUsername,
          }
        );
       // console.log(response.data)
        if(response.data.success)
        {
          toast.success(response.data.message);
          setCheckOTP(response.data.otp);
          //console.log(response.data.otp);
          setStep(2);
        }
        else{
          toast.error(response.data.message);
        }
      }
      else if(step === 2)
      {
        //console.log(otp);
        if(otp.trim() === checkOTP.toString().trim())
        {
          toast.success("OTP verified successfully...");
          setCheckOTP("");
          setStep(3);
        }
        else{
          toast.error("Invalid OTP, Try again later...");
           setStep(1); 
        }
      }
      else if(step === 3)
      {
        if (newPassword !== confirmPassword) {
          toast.error("Passwords do not match.");
          return;
        }
    
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    
        if (!passwordRegex.test(newPassword)) {
          toast.error("Password must be at least 6 characters long and include at least one uppercase letter, one special character, and one number.");
          return;
        }

        const response = await axios.post(
          "http://localhost/gearsphere_api/GearSphere-BackEnd/changePassword.php",
          {
            email: forgotPasswordEmail,
            new_password: newPassword,
          }
        );
        console.log("Change Password Response:", response.data);
        if(response.data.success)
        {
          toast.success(response.data.message);
          setTimeout(() => {
            setShowForgotModal(false);
          }, 1000); 
        }
        else{
          toast.error(response.data.message);
          setTimeout(() => {
            setShowForgotModal(false);
          }, 1000); 
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Password reset failed.");
      }
    }
  }


  return (
    <>
      {/* Show login modal only if not in forgot password flow */}
      <Modal
        show={show && !showForgotModal}
        onHide={onHide}
        className="custom-login-modal"
        dialogClassName="custom-login-modal"
        backdropClassName="custom-login-backdrop"
        keyboard={true}
        scrollable={false}
      >
        <div className="modal-content login">
          <div className="login-img">
            <img src={loginImage} alt="Login Visual" />
          </div>
          <div className="login-form">
            <Modal.Header closeButton className="border-0 pb-0" />
            <Modal.Title className="mb-3">Login to GearSphere</Modal.Title>
            <Modal.Body className="px-0">
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(prev => !prev)}
                      tabIndex={-1}
                      style={{ borderLeft: 0 }}
                    >
                      {showPassword ? <BsEyeSlash /> : <BsEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>
                <div className="d-flex justify-content-end align-items-center mb-3">
                  <a
                    href="#"
                    onClick={() => setShowForgotModal(true)}
                  >
                    Forgot password?
                  </a>
                </div>
                <Button type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center border-0 px-0">
              <p className="mb-0">
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    onHide()
                    switchToRegister()
                  }}
                >
                  Register
                </a>
              </p>
            </Modal.Footer>
          </div>
        </div>
      </Modal>


      <Modal
        show={showForgotModal}
        onHide={() => setShowForgotModal(false)}
        className="forgot-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {step === 1 &&
             <>
             <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  required
                />
              </Form.Group>
             </>
              }

            {step === 2 &&
              <Form.Group controlId="formOtp">
                <Form.Label>OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </Form.Group>
            }

            {step === 3 &&
              <>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
              </>
            }

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowForgotModal(false)}
          >
            close
          </Button>
          <Button variant="primary" onClick={handleForgotPassword}>
            {step === 1 ? "Send OTP" : step === 2 ? "Verify OTP" : "Reset Password"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default LoginModal