import React from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuth } from '../utils/api';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    const verifyAuth = async () => {
      const user = await checkAuth();
      setIsAuthenticated(!!user);
    };
    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;