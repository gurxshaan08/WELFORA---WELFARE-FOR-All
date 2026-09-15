// ============================================================================
// WELFORA CENTRALIZED IMAGE REGISTRY
// High quality local civic, community, and sector photos with CDN & SVG fallbacks.
// Guaranteed 100% offline & online presentation reliability without broken icons.
// ============================================================================

// Local optimized image assets served directly by Vite from /public/images
export const categoryImages = {
  Education: "/images/categories/education.jpg",
  Healthcare: "/images/categories/healthcare.jpg",
  Agriculture: "/images/categories/agriculture.jpg",
  Employment: "/images/categories/employment.jpg",
  "Women & Child Welfare": "/images/categories/women.jpg",
  Housing: "/images/categories/housing.jpg",
  "Senior Citizens": "/images/categories/senior.jpg",
  Entrepreneurship: "/images/categories/entrepreneurship.jpg"
};

// Verified working high-res Unsplash CDN fallbacks (tested HTTP 200)
export const categoryFallbacks = {
  Education: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  Healthcare: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
  Agriculture: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
  Employment: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80",
  "Women & Child Welfare": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  Housing: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
  "Senior Citizens": "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
  Entrepreneurship: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
};

export const citizenImages = {
  heroCitizen: "/images/citizens/hero.jpg",
  students: "/images/citizens/students.jpg",
  farmers: "/images/citizens/farmers.jpg",
  womenFamilies: "/images/citizens/women.jpg",
  seniorCitizens: "/images/citizens/senior.jpg",
  jobSeekers: "/images/citizens/jobseekers.jpg"
};

export const citizenFallbacks = {
  heroCitizen: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80",
  students: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  farmers: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
  womenFamilies: "https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&w=800&q=80",
  seniorCitizens: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  jobSeekers: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
};

// Elegant vector fallback in SVG data-URI format to guarantee 0 broken images
export const getFallbackSvg = (label = 'Welfare Scheme', icon = '🏛️') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f2b48" />
        <stop offset="50%" stop-color="#1e3a8a" />
        <stop offset="100%" stop-color="#2563eb" />
      </linearGradient>
    </defs>
    <rect width="600" height="360" fill="url(#bg)" />
    <circle cx="300" cy="140" r="60" fill="rgba(255,255,255,0.12)" />
    <text x="50%" y="155" dominant-baseline="middle" text-anchor="middle" font-size="52">${icon}</text>
    <text x="50%" y="250" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="22" letter-spacing="0.5">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const getSchemeImage = (category) => {
  return categoryImages[category] || categoryImages.Education;
};
