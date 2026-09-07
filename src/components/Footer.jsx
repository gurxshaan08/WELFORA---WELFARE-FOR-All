import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_DISCLAIMER } from '../data/mockSchemes';
import { Button } from './Button';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Civic Mock Data Disclaimer Notice */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 'var(--radius-lg)',
          padding: '0.85rem 1.25rem',
          marginBottom: '3rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: '#ffead8'
        }}>
          ⚠️ <strong>DISCLAIMER:</strong> {MOCK_DISCLAIMER}. Welfora is an educational academic prototype built to demonstrate civic-tech accessibility and intelligent benefit discovery.
        </div>

        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <h3 className="footer-brand-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="brand-icon" style={{ width: '2.2rem', height: '2.2rem', fontSize: '1.2rem' }}>W</span>
              Welfora
            </h3>
            <p className="footer-text" style={{ marginBottom: '1.25rem' }}>
              Bridging the gap between eligible Indian citizens and government welfare programs through simple, accessible, and intelligent benefit discovery.
            </p>
            <Link to="/schemes">
              <Button variant="primary" size="sm">
                Find My Benefits →
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/schemes">Explore Schemes</Link></li>
              <li><Link to="/schemes?category=Education">Categories</Link></li>
              <li><a href="#how-it-works">How It Works</a></li>
            </ul>
          </div>

          {/* Resources & Citizen Portal */}
          <div>
            <h4 className="footer-col-title">Citizen Resources</h4>
            <ul className="footer-links">
              <li><Link to="/saved">Saved Schemes</Link></li>
              <li><Link to="/profile">My Citizen Profile</Link></li>
              <li><Link to="/login">Account Login</Link></li>
            </ul>
          </div>

          {/* About Welfora */}
          <div>
            <h4 className="footer-col-title">About Welfora</h4>
            <p className="footer-text">
              Designed & Built by 2nd Year B.Tech CSE Students as a Civic-Tech Prototype.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-600)', fontWeight: 600 }}>
                ● Civic Tech Platform Active
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Welfora Civic-Tech Platform. Built for educational evaluation.</p>
        </div>
      </div>
    </footer>
  );
};
