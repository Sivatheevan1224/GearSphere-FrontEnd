import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useSessionValidation = () => {
  const navigate = useNavigate();

  const validateSession = useCallback(async () => {
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
        // Session expired or invalid, clear localStorage and redirect
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        
        // Clear any monitoring mode session storage
        sessionStorage.removeItem('monitoring_mode');
        sessionStorage.removeItem('original_user_type');
        sessionStorage.removeItem('original_user_id');
        
        // Only redirect if user was on a protected route
        const currentPath = window.location.pathname;
        const isPublicRoute = currentPath === '/' || currentPath === '/register';
        
        if (!isPublicRoute) {
          console.log('Session expired, redirecting to home page');
          navigate('/');
        }
        return false;
      }

      // Session is valid, optionally update localStorage with fresh data
      if (data.user_type && data.user_id) {
        localStorage.setItem('userType', data.user_type);
        localStorage.setItem('userId', data.user_id.toString());
        if (data.name) localStorage.setItem('userName', data.name);
        if (data.email) localStorage.setItem('userEmail', data.email);
      }

      return true;
    } catch (error) {
      console.error('Session validation failed:', error);
      // On network error, don't redirect immediately but log the issue
      return true; // Assume session is still valid if we can't reach the server
    }
  }, [navigate]);

  const checkSessionOnMount = useCallback(async () => {
    // Only validate if user appears to be logged in
    const userType = localStorage.getItem('userType');
    const userId = localStorage.getItem('userId');
    
    // Don't validate session on public routes or if no login data exists
    const currentPath = window.location.pathname;
    const isPublicRoute = currentPath === '/' || currentPath === '/register';
    
    if (userType && userId && !isPublicRoute) {
      await validateSession();
    }
  }, [validateSession]);

  const startPeriodicValidation = useCallback(() => {
    // Validate session every 5 minutes, but only if user is logged in
    const interval = setInterval(() => {
      const userType = localStorage.getItem('userType');
      const userId = localStorage.getItem('userId');
      const currentPath = window.location.pathname;
      const isPublicRoute = currentPath === '/' || currentPath === '/register';
      
      if (userType && userId && !isPublicRoute) {
        validateSession();
      }
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [validateSession]);

  return {
    validateSession,
    checkSessionOnMount,
    startPeriodicValidation
  };
};

export default useSessionValidation;
