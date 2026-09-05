import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const NotFoundPage = () => {
  return (
    <div className="container main-content" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</div>
      <h1 className="section-title">Page Not Found</h1>
      <p className="section-subtitle" style={{ maxWidth: '500px', margin: '0.5rem auto 2rem' }}>
        We couldn't find the page you were looking for. It might have been moved or doesn't exist.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <Link to="/">
          <Button variant="primary">Go to Home Page</Button>
        </Link>
        <Link to="/schemes">
          <Button variant="outline">Browse Scheme Explorer</Button>
        </Link>
      </div>
    </div>
  );
};
