import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, ShieldCheck, ChevronRight, RefreshCw, Dice5 } from 'lucide-react';

const INDIAN_FIRST_NAMES = [
  'Aarav', 'Ramesh', 'Priya', 'Sunita', 'Gurpreet', 'Kavitha', 'Vikram', 'Ananya',
  'Deepak', 'Meenakshi', 'Rajesh', 'Sangeeta', 'Manish', 'Lakshmi', 'Balwinder',
  'Suresh', 'Rohit', 'Geeta', 'Arjun', 'Amit', 'Kalyani', 'Abdul', 'Fatima',
  'Devendra', 'Manoj', 'Pooja', 'Karan', 'Komal', 'Siddharth', 'Naveen'
];

const INDIAN_LAST_NAMES = [
  'Sharma', 'Patil', 'Verma', 'Reddy', 'Nair', 'Singh', 'Mukherjee', 'Yadav',
  'Choudhury', 'Gowda', 'Joshi', 'Kaur', 'Deshmukh', 'Das', 'Gupta', 'Mishra',
  'Bose', 'Kulkarni', 'Bhat', 'Rao', 'Pandey', 'Chauhan'
];

const CITIZEN_ARCHETYPES = [
  {
    id: 'farmer',
    label: 'Farmer',
    icon: '🌾',
    role: 'Smallholder Farmer',
    locations: ['Satara, Maharashtra', 'Karnal, Haryana', 'Vidarbha, Maharashtra', 'Thanjavur, Tamil Nadu', 'Ludhiana, Punjab', 'Kota, Rajasthan'],
    details: ['Land: 2.2 Acres • BPL Card', 'Land: 3.0 Acres • PM-Kisan Active', 'Rainfed Farming • Crop Insurance Active', 'Organic Cultivation • KCC Holder'],
    schemesCount: 11,
    annualBenefit: '₹84,000',
    topScheme: 'PM-Kisan Samman Nidhi (+₹6,000/yr)',
    matchScore: 98,
    categories: [
      { name: 'Agriculture & Fertilizer', count: 5, pct: 90, color: '#16a34a' },
      { name: 'Healthcare & PM-JAY', count: 2, pct: 65, color: '#0284c7' },
      { name: 'Social Welfare', count: 2, pct: 50, color: '#ea580c' },
      { name: 'Housing & Solar Pump', count: 2, pct: 45, color: '#9333ea' },
    ]
  },
  {
    id: 'student',
    label: 'Student',
    icon: '👩‍🎓',
    role: 'Undergraduate Scholar',
    locations: ['Jaipur, Rajasthan', 'Lucknow, Uttar Pradesh', 'Bhopal, Madhya Pradesh', 'Kolkata, West Bengal', 'Mysuru, Karnataka', 'Patna, Bihar'],
    details: ['B.Tech 3rd Yr • Merit-cum-Means', 'B.Sc Nursing • Pre-Final Yr', 'Diploma Polytechnic • Post-Matric Eligible', 'BA Honors • First Generation Learner'],
    schemesCount: 9,
    annualBenefit: '₹68,000',
    topScheme: 'Post-Matric Scholarship & NSP Aid',
    matchScore: 96,
    categories: [
      { name: 'Education & Tuition Aid', count: 4, pct: 85, color: '#2563eb' },
      { name: 'Skill India Training', count: 2, pct: 60, color: '#16a34a' },
      { name: 'Free Laptop & Digital Tools', count: 2, pct: 45, color: '#0284c7' },
      { name: 'Hostel & Travel Subsidy', count: 1, pct: 35, color: '#ea580c' },
    ]
  },
  {
    id: 'women',
    label: 'Women SHG',
    icon: '🧵',
    role: 'Self-Help Group Artisan',
    locations: ['Bhagalpur, Bihar', 'Anand, Gujarat', 'Sambalpur, Odisha', 'Varanasi, UP', 'Dharmapuri, Tamil Nadu', 'Udaipur, Rajasthan'],
    details: ['SHG Leader • Handloom Micro-Credit', 'Food Processing • Mudra Kishor Ready', 'Rural Retailer • Lakhpati Didi Scheme', 'Tailoring & Garment Enterprise'],
    schemesCount: 14,
    annualBenefit: '₹1,30,000',
    topScheme: 'PM MUDRA Loan & Lakhpati Didi',
    matchScore: 99,
    categories: [
      { name: 'Women & Child Welfare', count: 6, pct: 95, color: '#ec4899' },
      { name: 'Micro-Credit & MUDRA', count: 4, pct: 80, color: '#8b5cf6' },
      { name: 'Maternal Healthcare', count: 2, pct: 55, color: '#0284c7' },
      { name: 'PM Awas Subsidy', count: 2, pct: 45, color: '#f97316' },
    ]
  },
  {
    id: 'senior',
    label: 'Senior Citizen',
    icon: '👴',
    role: 'Retired Senior Citizen',
    locations: ['Thrissur, Kerala', 'Mysuru, Karnataka', 'Dehradun, Uttarakhand', 'Varanasi, UP', 'Madurai, Tamil Nadu', 'Shimla, HP'],
    details: ['Age: 68 • BPL Pension Category', 'Age: 71 • Ayushman Senior Cover', 'Age: 66 • PM Vaya Vandana Yojana', 'Age: 74 • Rashtriya Vayoshri Aid'],
    schemesCount: 7,
    annualBenefit: '₹54,000',
    topScheme: 'Ayushman Bharat (₹5 Lakh Free Cover)',
    matchScore: 95,
    categories: [
      { name: 'National Old Age Pension', count: 3, pct: 80, color: '#d97706' },
      { name: 'Geriatric Medical Cover', count: 2, pct: 75, color: '#059669' },
      { name: 'Assistive Devices (Vayoshri)', count: 2, pct: 50, color: '#3b82f6' },
    ]
  }
];

// Helper to construct a randomized realistic citizen based on an archetype
const buildRandomCitizen = (archetypeIndex) => {
  const arch = CITIZEN_ARCHETYPES[archetypeIndex % CITIZEN_ARCHETYPES.length];
  const firstName = INDIAN_FIRST_NAMES[Math.floor(Math.random() * INDIAN_FIRST_NAMES.length)];
  const lastName = INDIAN_LAST_NAMES[Math.floor(Math.random() * INDIAN_LAST_NAMES.length)];
  const location = arch.locations[Math.floor(Math.random() * arch.locations.length)];
  const detail = arch.details[Math.floor(Math.random() * arch.details.length)];

  return {
    ...arch,
    archetypeIndex,
    name: `${firstName} ${lastName}`,
    location,
    role: `${arch.role} (${detail.split('•')[0].trim()})`,
    subDetail: detail
  };
};

export const LiveBenefitMatcher = () => {
  const [currentArchetypeIndex, setCurrentArchetypeIndex] = useState(0);
  const [currentCitizen, setCurrentCitizen] = useState(() => buildRandomCitizen(0));
  const [isUpdating, setIsUpdating] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(CITIZEN_ARCHETYPES[0].schemesCount);

  // Auto-cycle through citizens every 4.5 seconds with fresh randomized names
  useEffect(() => {
    const timer = setInterval(() => {
      triggerNewCitizen((prevIndex) => (prevIndex + 1) % CITIZEN_ARCHETYPES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const triggerNewCitizen = (getNextIndexFn) => {
    setIsUpdating(true);
    setTimeout(() => {
      setCurrentArchetypeIndex((prev) => {
        const nextIndex = typeof getNextIndexFn === 'function' ? getNextIndexFn(prev) : getNextIndexFn;
        const newCitizen = buildRandomCitizen(nextIndex);
        setCurrentCitizen(newCitizen);
        return nextIndex;
      });
      setIsUpdating(false);
    }, 250);
  };

  const handleSelectArchetype = (index) => {
    triggerNewCitizen(index);
  };

  const handleRandomizeName = () => {
    const randomArchetype = Math.floor(Math.random() * CITIZEN_ARCHETYPES.length);
    triggerNewCitizen(randomArchetype);
  };

  // Smooth number counting effect
  useEffect(() => {
    let start = 0;
    const end = currentCitizen.schemesCount;
    const duration = 400;
    const stepTime = Math.max(12, Math.floor(duration / end));

    const counter = setInterval(() => {
      start += 1;
      setDisplayedCount(start);
      if (start >= end) clearInterval(counter);
    }, stepTime);

    return () => clearInterval(counter);
  }, [currentCitizen]);

  return (
    <div className="live-benefit-card">
      {/* Scanning light pulse beam during update */}
      <div className={`scanline-shimmer ${isUpdating ? 'active' : ''}`} />

      {/* Header bar with Live Pulse Engine Status */}
      <div className="live-header">
        <div className="live-pulse-badge">
          <span className="live-dot" />
          <span className="live-text">LIVE MATCH ENGINE</span>
        </div>

        <button
          type="button"
          className="live-update-status"
          onClick={handleRandomizeName}
          title="Click to simulate a new random citizen match"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <Dice5 size={13} className={`refresh-icon ${isUpdating ? 'spinning' : ''}`} style={{ color: 'var(--accent-600)' }} />
          <span>Simulate Random</span>
        </button>
      </div>

      {/* Citizen Persona Selector Pills */}
      <div className="persona-pills">
        {CITIZEN_ARCHETYPES.map((arch, idx) => (
          <button
            key={arch.id}
            type="button"
            className={`persona-pill-btn ${idx === currentArchetypeIndex ? 'active' : ''}`}
            onClick={() => handleSelectArchetype(idx)}
            title={`Simulate match for ${arch.label}`}
          >
            <span>{arch.icon}</span>
            <span className="pill-name">{arch.label}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Randomized Citizen Profile Banner */}
      <div className="profile-banner">
        <div className="persona-avatar">{currentCitizen.icon}</div>
        <div className="persona-details">
          <div className="persona-title-row">
            <strong className="persona-name">{currentCitizen.name}</strong>
            <span className="persona-state">📍 {currentCitizen.location}</span>
          </div>
          <span className="persona-sub">{currentCitizen.role}</span>
        </div>
      </div>

      {/* Primary Metric Score Box */}
      <div className="metrics-box">
        <div className="metric-left">
          <div className="metric-count-row">
            <span className="metric-big-number">{displayedCount}</span>
            <span className="metric-sub-label">Schemes<br/>Eligible</span>
          </div>
          <div className="metric-accuracy">
            <Sparkles size={13} style={{ color: '#ea580c' }} />
            <span>{currentCitizen.matchScore}% Match Score</span>
          </div>
        </div>

        <div className="metric-right">
          <span className="metric-val-caption">Est. Annual Value</span>
          <span className="metric-val-amount">{currentCitizen.annualBenefit}</span>
          <span className="metric-val-tag">Direct Benefit Transfer</span>
        </div>
      </div>

      {/* Dynamic Category Bars */}
      <div className="category-bars-list">
        {currentCitizen.categories.map((cat, i) => (
          <div key={i} className="cat-bar-item">
            <div className="cat-bar-labels">
              <span className="cat-name">{cat.name}</span>
              <span className="cat-count">
                <strong>{cat.count}</strong> schemes
              </span>
            </div>
            <div className="cat-progress-track">
              <div
                className="cat-progress-fill"
                style={{
                  width: `${cat.pct}%`,
                  backgroundColor: cat.color,
                  transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Top Matched Scheme Spotlight */}
      <div className="top-scheme-pill">
        <CheckCircle2 size={15} className="check-icon" />
        <div className="top-scheme-text">
          <span className="top-scheme-caption">Top Highlight:</span>
          <strong className="top-scheme-title">{currentCitizen.topScheme}</strong>
        </div>
      </div>

      {/* Verified DBT Compliance Footer */}
      <div className="live-card-footer">
        <div className="dbt-verified">
          <ShieldCheck size={14} className="shield-icon" />
          <span>Demo Preview • Sample Scheme Data</span>
        </div>

        <Link to="/schemes" className="check-exact-btn">
          <span>Check Your Match</span>
          <ChevronRight size={13} />
        </Link>
      </div>
    </div>
  );
};
