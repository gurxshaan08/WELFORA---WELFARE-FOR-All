// ============================================================================
// WELFORA CENTRALIZED IMAGE REGISTRY
// High quality civic, community, and sector photos from Unsplash
// ============================================================================

export const categoryImages = {
  Education: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
  Healthcare: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
  Agriculture: "https://images.unsplash.com/photo-1595274435816-56837a71eb64?auto=format&fit=crop&w=600&q=80",
  Employment: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80",
  "Women & Child Welfare": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  Housing: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
  "Senior Citizens": "https://images.unsplash.com/photo-1581579438747-1dc8d1e058ca?auto=format&fit=crop&w=600&q=80",
  Entrepreneurship: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80"
};

export const citizenImages = {
  heroCitizen: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80",
  students: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
  farmers: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80",
  womenFamilies: "https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&w=600&q=80",
  seniorCitizens: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  jobSeekers: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
  assistantBanner: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
};

export const getSchemeImage = (category) => {
  return categoryImages[category] || categoryImages.Education;
};
