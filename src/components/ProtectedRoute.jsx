import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Route guard component to protect private student/user views
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
        <p>Loading session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page and remember attempting location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
