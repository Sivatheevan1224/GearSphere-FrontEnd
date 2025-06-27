import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function PrivateRoute({ role }) {
  const { currentUser, userRole, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not logged in, redirect to login with return path
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is specified and user's role doesn't match, redirect to home
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  // If all checks pass, render the child routes
  return <Outlet />;
}

export default PrivateRoute; 