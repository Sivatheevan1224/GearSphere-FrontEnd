import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useLayoutSessionValidation = (requiredUserType) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await fetch(
          'http://localhost/gearsphere_api/GearSphere-BackEnd/validateSession.php',
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();

        if (!data.success || data.expired) {
          // Session expired, clear localStorage and redirect
          localStorage.removeItem('user');
          localStorage.removeItem('userType');
          localStorage.removeItem('userId');
          localStorage.removeItem('userName');
          localStorage.removeItem('userEmail');
          
          sessionStorage.removeItem('monitoring_mode');
          sessionStorage.removeItem('original_user_type');
          sessionStorage.removeItem('original_user_id');
          
          console.log('Session expired, redirecting to home page');
          navigate('/');
          return;
        }

        // Check if user type matches required type or if in monitoring mode
        const isMonitoringMode = sessionStorage.getItem("monitoring_mode") === "true";
        const originalUserType = sessionStorage.getItem("original_user_type");

        if (data.user_type.toLowerCase() === requiredUserType.toLowerCase()) {
          setIsAuthenticated(true);
        } else if (
          isMonitoringMode &&
          (originalUserType === "seller" || originalUserType === "admin") &&
          (data.user_type.toLowerCase() === "seller" || data.user_type.toLowerCase() === "admin")
        ) {
          // Allow seller or admin in monitoring mode
          setIsAuthenticated(true);
        } else {
          // Wrong user type, redirect to appropriate dashboard
          navigate('/');
        }
      } catch (error) {
        console.error('Session validation error:', error);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    validateSession();
  }, [requiredUserType, navigate]);

  return { isLoading, isAuthenticated };
};

export default useLayoutSessionValidation;
