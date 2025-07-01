import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
//

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = () => {
      const user = sessionStorage.getItem('user');
      const role = sessionStorage.getItem('userRole');
      
      if (user && role) {
        setCurrentUser(JSON.parse(user));
        setUserRole(role);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // Replace with your actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store user data
      sessionStorage.setItem('user', JSON.stringify(data.user));
      sessionStorage.setItem('userRole', data.user.role);
      
      setCurrentUser(data.user);
      setUserRole(data.user.role);
      
      // Redirect based on role
      switch (data.user.role) {
        case 'technician':
          navigate('/technician/dashboard');
          break;
        case 'admin':
          navigate('/admin/users');
          break;
        case 'seller':
          navigate('/seller/products');
          break;
        default:
          navigate('/');
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    sessionStorage.clear();
    setCurrentUser(null);
    setUserRole(null);
    navigate('/', { replace: true });
    window.location.reload();
  };

  // Register function
  const register = async (userData) => {
    try {
      // Replace with your actual API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    currentUser,
    userRole,
    loading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext; 