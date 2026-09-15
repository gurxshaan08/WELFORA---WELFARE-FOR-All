import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PhoneCall, ExternalLink, Heart, Sparkles, HelpCircle, CheckCircle2, Lock } from 'lucide-react';
import { MOCK_DISCLAIMER } from '../data/mockSchemes';

export const Footer = () => {
  return (
    <footer className="footer-redesigned">
      {/* Top Accent Strip */}
      <div className="footer-top-accent-line" />

      <div className="container">
        {/* Main 4-Column Grid */}
        <div className="footer-main-grid">
          {/* Col 1: Brand & National Helpline */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand-logo">
              <div className="brand-icon">W</div>
              <span className="brand-text">Welfora</span>
            </Link>

            <p className="footer-brand-desc">
              India's unified civic-tech platform for transparent, accessible government scheme discovery.
              Empowering every citizen with direct benefit eligibility in simple language.
            </p>

            {/* Helpline Banner */}
            <div className="footer-helpline-card">
              <PhoneCall size={18} className="helpline-icon" />
              <div>
                <span className="helpline-label">National Citizen Welfare Helpline</span>
                <strong className="helpline-number">1800-11-0040 (Toll Free)</strong>
              </div>
            </div>

            <div className="footer-trust-tags">
              <span className="trust-tag">
                <ShieldCheck size={13} /> DBT Compliant
              </span>
              <span className="trust-tag">
                <Lock size={13} /> 256-Bit Encrypted
              </span>
              <span className="trust-tag status-live">
                <span className="live-dot-green" /> Civic-Tech Active
              </span>
            </div>
          </div>

          {/* Col 2: Flagship Scheme Sectors */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Welfare Domains</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/schemes?category=Agriculture">🌾 Agriculture & PM-KISAN</Link>
              </li>
              <li>
                <Link to="/schemes?category=Healthcare">🏥 Healthcare & Ayushman PM-JAY</Link>
              </li>
              <li>
                <Link to="/schemes?category=Education">🎓 Education & Scholarships</Link>
              </li>
              <li>
                <Link to="/schemes?category=Women%20%26%20Child%20Welfare">👩‍👧 Women & Child Welfare</Link>
              </li>
              <li>
                <Link to="/schemes?category=Housing">🏠 Housing & PM Awas Yojana</Link>
              </li>
              <li>
                <Link to="/schemes?category=Entrepreneurship">🚀 PM MUDRA & MSME Credit</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Citizen Discovery Tools */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Citizen Tools</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/schemes">🧭 Scheme Explorer (14+ Programs)</Link>
              </li>
              <li>
                <Link to="/saved">🔖 Saved & Bookmarked Schemes</Link>
              </li>
              <li>
                <Link to="/profile">👤 Citizen Profile & Criteria</Link>
              </li>
              <li>
                <Link to="/login">🔐 Jan Parichay / Account Login</Link>
              </li>
              <li>
                <a href="#how-it-works">⚡ 4-Step Eligibility Workflow</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Credibility & Academic Prototype */}
          <div className="footer-col">
            <h4 className="footer-col-heading">About Platform</h4>
            <p className="footer-about-text">
              Developed as an educational Civic-Tech prototype by 2nd-Year B.Tech Computer Science students to demonstrate transparent welfare access for Indian citizens.
            </p>

            <div className="academic-badge-box">
              <span className="academic-badge-title">🇮🇳 Civic-Tech Innovation Project</span>
              <span className="academic-badge-desc">Inspired by myScheme & Digital India standards</span>
            </div>

            <div className="footer-quick-action">
              <Link to="/schemes" className="btn btn-sm btn-primary btn-block">
                Check My Eligible Schemes →
              </Link>
            </div>
          </div>
        </div>

        {/* Civic Advisory Notice (Harmonious Banner) */}
        <div className="footer-advisory-banner">
          <div className="advisory-icon-wrap">
            <ShieldCheck size={20} className="advisory-shield" />
          </div>
          <div className="advisory-content">
            <strong className="advisory-title">CIVIC ADVISORY & OPEN-DATA NOTICE:</strong>
            <p className="advisory-text">
              {MOCK_DISCLAIMER}. Welfora is an independent civic-tech portal designed to demonstrate accessible user experience, rule-based matching, and multilingual discovery for public welfare benefits. Always verify final guidelines on respective ministry portals.
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="footer-bottom-bar">
          <div className="copyright-text">
            © {new Date().getFullYear()} Welfora Civic-Tech Platform. Built for Indian Citizen Welfare Discovery.
          </div>

          <div className="footer-legal-links">
            <span>Privacy Policy</span>
            <span className="bullet-sep">•</span>
            <span>Terms of Service</span>
            <span className="bullet-sep">•</span>
            <span>Accessibility (WCAG 2.1)</span>
            <span className="bullet-sep">•</span>
            <span>Open Source Civic-Tech</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
