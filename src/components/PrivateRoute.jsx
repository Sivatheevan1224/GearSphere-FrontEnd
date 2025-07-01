import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  if (!user || !allowedRoles.includes(user.user_type)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute; 