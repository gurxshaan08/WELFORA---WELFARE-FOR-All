import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { SchemeCard } from '../components/SchemeCard';
import { mockSchemes } from '../data/mockSchemes';
import { useAuth } from '../hooks/useAuth';
import { categoryImages, citizenImages } from '../utils/schemeImages';

export const LandingPage = () => {
  const { isAuthenticated, savedSchemeIds, toggleSaveScheme } = useAuth();
  
  // Top 6 featured schemes
  const featuredSchemes = mockSchemes.slice(0, 6);

  const categories = [
    { title: "Education & Scholarships", icon: "🎓", desc: "Post-matric aid, tuition waivers, and student grants.", name: "Education", img: categoryImages.Education },
    { title: "Healthcare & Insurance", icon: "🏥", desc: "Ayushman insurance, medical grants, and wellness support.", name: "Healthcare", img: categoryImages.Healthcare },
    { title: "Agriculture & Farmers", icon: "🌾", desc: "PM-KISAN cash support, crop insurance, and equipment.", name: "Agriculture", img: categoryImages.Agriculture },
    { title: "Employment & Skills", icon: "💼", desc: "Job guarantees, wage support, and craft toolkits.", name: "Employment", img: categoryImages.Employment },
    { title: "Women & Child Welfare", icon: "👩‍👧", desc: "Sukanya savings, marriage support, and girl child aid.", name: "Women & Child Welfare", img: categoryImages["Women & Child Welfare"] },
    { title: "Housing & Shelter", icon: "🏠", desc: "PM Awas interest subsidies and construction assistance.", name: "Housing", img: categoryImages.Housing },
    { title: "Senior Citizens", icon: "👴", desc: "BPL pensions, elder care, and retirement benefits.", name: "Senior Citizens", img: categoryImages["Senior Citizens"] },
    { title: "Entrepreneurship", icon: "🚀", desc: "Collateral-free MUDRA loans and Stand Up India credit.", name: "Entrepreneurship", img: categoryImages.Entrepreneurship }
  ];

  const citizenGroups = [
    { title: "Students", text: "Discover scholarships and education support.", img: citizenImages.students },
    { title: "Farmers", text: "Explore agricultural assistance and subsidies.", img: citizenImages.farmers },
    { title: "Women & Families", text: "Empowering women through financial & welfare programs.", img: citizenImages.womenFamilies },
    { title: "Senior Citizens", text: "Access pension schemes and elder care support.", img: citizenImages.seniorCitizens },
    { title: "Job Seekers", text: "Find employment and skill-development opportunities.", img: citizenImages.jobSeekers }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--accent-50)',
              border: '1px solid var(--accent-100)',
              color: 'var(--accent-700)',
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '1.25rem'
            }}>
              🇮🇳 Unified Civic-Tech Discovery Platform
            </div>

            <h1 className="hero-title">
              Discover the benefits <span className="highlight-orange">you're eligible for</span>.
            </h1>

            <p className="hero-subtitle">
              Welfora removes the confusion around government schemes, scholarships, subsidies, and pensions. Discover personalized benefits with clear eligibility guidance.
            </p>

            <div className="hero-cta">
              <Link to="/schemes">
                <Button variant="primary" size="lg">
                  Find My Benefits →
                </Button>
              </Link>
              <Link to="/schemes">
                <Button variant="secondary" size="lg">
                  Explore Schemes
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Visual Area with Floating Match Badge Card */}
          <div style={{ position: 'relative' }}>
            <img
              src={citizenImages.heroCitizen}
              alt="Indian Citizens and Community"
              style={{
                width: '100%',
                height: '380px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-2xl)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--neutral-200)'
              }}
            />

            {/* Floating UI Match Badge Card */}
            <div className="floating-match-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🎯</span>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--primary-900)', display: 'block' }}>Your Benefit Match</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-600)', fontWeight: 700 }}>8 schemes found</span>
                </div>
              </div>

              <div style={{ fontSize: '0.775rem', color: 'var(--neutral-600)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Education</span>
                  <strong>3</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Healthcare</span>
                  <strong>2</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Employment</span>
                  <strong>2</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Housing</span>
                  <strong>1</strong>
                </div>
              </div>

              <div style={{ marginTop: '0.5rem', paddingTop: '0.4rem', borderTop: '1px solid var(--neutral-200)', fontSize: '0.7rem', color: 'var(--neutral-500)', textAlign: 'center' }}>
                <em>Prototype demo rule matcher</em>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Welfora Works Section */}
      <section id="how-it-works" style={{ padding: '4.5rem 0', backgroundColor: 'var(--neutral-100)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-600)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Simple & Accessible
            </span>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>How Welfora Works</h2>
            <p className="section-subtitle">
              Find government schemes in a few simple steps.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem'
          }}>
            <div className="step-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div className="step-number">01</div>
                <span style={{ fontSize: '1.75rem' }}>👤</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--primary-900)' }}>Step 1 — Create Your Profile</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)', lineHeight: '1.5' }}>
                Enter basic information such as your state, age group, occupation and other details.
              </p>
            </div>

            <div className="step-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div className="step-number">02</div>
                <span style={{ fontSize: '1.75rem' }}>🧭</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--primary-900)' }}>Step 2 — Explore Schemes</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)', lineHeight: '1.5' }}>
                Browse government schemes using categories, search and state filters.
              </p>
            </div>

            <div className="step-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div className="step-number">03</div>
                <span style={{ fontSize: '1.75rem' }}>🎯</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--primary-900)' }}>Step 3 — Check Eligibility</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)', lineHeight: '1.5' }}>
                View the basic eligibility requirements and check whether a scheme may be suitable for you.
              </p>
            </div>

            <div className="step-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div className="step-number">04</div>
                <span style={{ fontSize: '1.75rem' }}>📋</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--primary-900)' }}>Step 4 — View Scheme Details</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)', lineHeight: '1.5' }}>
                Read important information such as benefits, eligibility, required documents and application details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore By Category Visual Section */}
      <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-600)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Explore By Sector
            </span>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>Explore By Category</h2>
            <p className="section-subtitle">
              Browse government programs categorized across 8 primary citizen welfare domains.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {categories.map((cat, idx) => (
              <Link to={`/schemes?category=${encodeURIComponent(cat.name)}`} key={idx} style={{ textDecoration: 'none' }}>
                <div className="category-visual-card">
                  <div className="category-card-img-wrap">
                    <img src={cat.img} alt={cat.title} className="category-card-img" loading="lazy" />
                  </div>
                  <div className="category-card-content">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>{cat.icon}</span>
                        <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-900)' }}>{cat.title}</h3>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--neutral-600)', lineHeight: '1.45' }}>{cat.desc}</p>
                    </div>
                    <div style={{ marginTop: '1rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-600)' }}>
                      Explore →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Schemes Section */}
      <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--neutral-100)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-600)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                VERIFIED WELFARE PROGRAMS
              </span>
              <h2 className="section-title" style={{ marginTop: '0.25rem' }}>Featured Schemes</h2>
            </div>
            <Link to="/schemes">
              <Button variant="primary">
                Explore All 14 Schemes →
              </Button>
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.75rem'
          }}>
            {featuredSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                isSaved={savedSchemeIds.includes(scheme.id)}
                onToggleSave={toggleSaveScheme}
                showImage={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Built For Every Citizen Section */}
      <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-600)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Human-Centered Inclusion
            </span>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>Built for Every Citizen</h2>
            <p className="section-subtitle">
              Designed to serve students, farmers, families, senior citizens, and job seekers across India.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {citizenGroups.map((grp, idx) => (
              <div className="citizen-card" key={idx}>
                <img src={grp.img} alt={grp.title} style={{ width: '100%', height: '170px', objectFit: 'cover' }} loading="lazy" />
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-900)', marginBottom: '0.35rem' }}>{grp.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--neutral-600)', lineHeight: '1.45' }}>"{grp.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Welfora Section */}
      <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--neutral-100)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-600)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Civic Technology Purpose
            </span>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>Why Welfora?</h2>
            <p className="section-subtitle">
              Why citizens and civic tech communities rely on Welfora for government benefits.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <div className="card">
              <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>🌐</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--primary-900)' }}>One Platform</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)' }}>
                Government schemes from central and state ministries organized in one unified platform.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>💡</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--primary-900)' }}>Simple Language</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)' }}>
                Complex legal text translated into easy eligibility guidelines and clear document checklists.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>🎯</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--primary-900)' }}>Personalized Discovery</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)' }}>
                Targeted recommendations based on your age, state, occupation, and household income.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>📱</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--primary-900)' }}>Accessible</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--neutral-600)' }}>
                Designed specifically for citizens with varying levels of digital literacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Welfora at a Glance (Impact Panel) */}
      <section style={{ padding: '3.5rem 0', backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div className="navy-card">
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-600)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Civic Platform Overview
              </span>
              <h2 style={{ fontSize: '2.25rem', color: 'var(--white)', marginTop: '0.5rem' }}>
                Welfora at a Glance
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '2.75rem', fontWeight: '800', color: 'var(--accent-600)', fontFamily: 'var(--font-heading)' }}>120+</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--neutral-300)', marginTop: '0.25rem' }}>Demo Schemes</div>
              </div>
              <div>
                <div style={{ fontSize: '2.75rem', fontWeight: '800', color: 'var(--accent-600)', fontFamily: 'var(--font-heading)' }}>8</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--neutral-300)', marginTop: '0.25rem' }}>Benefit Categories</div>
              </div>
              <div>
                <div style={{ fontSize: '2.75rem', fontWeight: '800', color: 'var(--accent-600)', fontFamily: 'var(--font-heading)' }}>28</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--neutral-300)', marginTop: '0.25rem' }}>Indian States</div>
              </div>
              <div>
                <div style={{ fontSize: '2.75rem', fontWeight: '800', color: 'var(--accent-600)', fontFamily: 'var(--font-heading)' }}>24/7</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--neutral-300)', marginTop: '0.25rem' }}>Digital Assistance</div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.8rem', color: 'var(--neutral-400)' }}>
              * Unified civic-tech platform for scheme discovery across India.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
