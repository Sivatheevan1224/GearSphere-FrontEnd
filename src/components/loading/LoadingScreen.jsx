import React from "react";
import gearSphereLogo from "../../images/logo.PNG";

// Loading animation styles
const loadingAnimationStyle = `
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9999;
}

.loading-text {
  color: #333333;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 10px;
}

.loading-subtext {
  color: #666666;
  font-size: 14px;
  text-align: center;
}

.loading-dots {
  display: inline-block;
  animation: loadingDots 1.5s infinite;
}

@keyframes loadingDots {
  0%, 20% { content: ''; }
  40% { content: '.'; }
  60% { content: '..'; }
  80%, 100% { content: '...'; }
}

.gear-icon-animation {
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  animation: logoFloat 3s ease-in-out infinite;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.logo-glow {
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
}

@keyframes logoFloat {
  0%, 100% { 
    transform: translateY(0px) scale(1);
    filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1));
  }
  50% { 
    transform: translateY(-10px) scale(1.05);
    filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.2));
  }
}
`;

const LoadingScreen = ({
  message = "Loading GearSphere",
  subMessage = "Preparing your PC building experience",
}) => (
  <div className="loading-container">
    <style>{loadingAnimationStyle}</style>
    <img
      src={gearSphereLogo}
      alt="GearSphere Logo"
      className="gear-icon-animation logo-glow"
    />
    <div className="loading-text">
      {message}
      <span className="loading-dots"></span>
    </div>
    <div className="loading-subtext">{subMessage}</div>
  </div>
);

export default LoadingScreen;
