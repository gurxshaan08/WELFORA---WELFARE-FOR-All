// ============================================================================
// WELFORA MOCK DATASET - GOVERNMENT SCHEMES
// IMPORTANT: MOCK / DEMO DATA — NOT OFFICIAL GOVERNMENT DATA
// This dataset is created strictly for frontend prototype evaluation.
// ============================================================================

export const MOCK_DISCLAIMER = "MOCK / DEMO DATA — NOT OFFICIAL GOVERNMENT DATA";

export const SCHEME_CATEGORIES = [
  "All Categories",
  "Education",
  "Healthcare",
  "Agriculture",
  "Women & Child Welfare",
  "Employment",
  "Housing",
  "Senior Citizens",
  "Entrepreneurship"
];

export const INDIAN_STATES = [
  "All States",
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal"
];

export const mockSchemes = [
  {
    id: "pm-kisan",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    shortDescription: "Direct financial support of ₹6,000 per year to small and marginal farmer families.",
    category: "Agriculture",
    state: "All States",
    benefit: "₹6,000 / year paid directly in 3 installments of ₹2,000 every 4 months.",
    eligibility: "Small and marginal landholder farmer families with cultivable land ownership up to 2 hectares.",
    eligibilityRules: {
      maxIncome: 300000,
      minAge: 18,
      maxAge: 75,
      occupations: ["Farmer", "Agriculture Worker", "Self-Employed"],
      educationLevels: ["Any"],
      genders: ["Any"]
    },
    documents: [
      "Aadhaar Card",
      "Landholding Ownership Document / Khasra-Khatauni",
      "Active Bank Account Details (Aadhaar linked)",
      "Passport Size Photograph"
    ],
    applicationProcess: "Register online via PM-KISAN portal or visit the nearest Common Service Centre (CSC) or Agriculture Office.",
    deadline: "Open All Year Round"
  },
  {
    id: "post-matric-scholarship",
    name: "Post-Matric Scholarship Scheme for SC/ST Students",
    shortDescription: "Financial assistance for post-secondary education to reduce dropout rates among backward category students.",
    category: "Education",
    state: "All States",
    benefit: "100% compulsory non-refundable fees covered + Monthly maintenance allowance up to ₹1,200.",
    eligibility: "Students belonging to SC/ST categories pursuing Higher Secondary, Diploma, UG or PG degrees with family income under ₹2,50,000/year.",
    eligibilityRules: {
      maxIncome: 250000,
      minAge: 15,
      maxAge: 30,
      occupations: ["Student"],
      educationLevels: ["High School", "Higher Secondary", "Undergraduate", "Postgraduate"],
      genders: ["Any"]
    },
    documents: [
      "Caste Certificate",
      "Family Income Certificate issued by Tehsildar",
      "Mark Sheets of previous qualifying exams",
      "Fee Receipt of current academic year",
      "Bank Passbook copy"
    ],
    applicationProcess: "Apply online via National Scholarship Portal (NSP) or State Scholarship Portal before the annual deadline.",
    deadline: "2026-10-31"
  },
  {
    id: "ayushman-bharat-pmjay",
    name: "Ayushman Bharat - PMJAY (Pradhan Mantri Jan Arogya Yojana)",
    shortDescription: "World's largest health assurance scheme offering cashless hospital treatment.",
    category: "Healthcare",
    state: "All States",
    benefit: "Health insurance cover of ₹5,00,000 per family per year for secondary and tertiary care hospitalization.",
    eligibility: "Families identified based on SECC 2011 deprivation criteria, informal sector workers, and low-income households.",
    eligibilityRules: {
      maxIncome: 250000,
      minAge: 0,
      maxAge: 100,
      occupations: ["Any"],
      educationLevels: ["Any"],
      genders: ["Any"]
    },
    documents: [
      "Aadhaar Card",
      "Ration Card / Ayushman Card",
      "Mobile Number linked to Aadhaar"
    ],
    applicationProcess: "Check eligibility online at pmjay.gov.in or visit any empaneled hospital / CSC to generate Ayushman Golden Card.",
    deadline: "Open All Year Round"
  },
  {
    id: "pm-awas-yojana-urban",
    name: "PM Awas Yojana (PMAY-U) Housing for All",
    shortDescription: "Credit Linked Subsidy and housing grant for affordable house purchase or construction.",
    category: "Housing",
    state: "All States",
    benefit: "Interest subsidy up to ₹2.67 Lakhs on home loans or upfront financial assistance of ₹1.5 Lakhs for home construction.",
    eligibility: "Economically Weaker Section (EWS) / Low Income Group (LIG) families who do not own a pucca house anywhere in India.",
    eligibilityRules: {
      maxIncome: 600000,
      minAge: 21,
      maxAge: 70,
      occupations: ["Any"],
      educationLevels: ["Any"],
      genders: ["Any"]
    },
    documents: [
      "Aadhaar Card of all family members",
      "Income Certificate / Form 16",
      "Affidavit of not owning a pucca house",
      "Approved Building Construction Plan"
    ],
    applicationProcess: "Submit application through local Urban Local Body (ULB) office or apply online on PMAY Urban portal.",
    deadline: "2026-12-31"
  },
  {
    id: "mgnrega-job-guarantee",
    name: "MGNREGA - Rural Employment Guarantee Scheme",
    shortDescription: "Legal guarantee of 100 days of wage employment per financial year for rural households.",
    category: "Employment",
    state: "All States",
    benefit: "Guaranteed minimum daily wage (₹220-₹350/day depending on state) for manual unskilled work.",
    eligibility: "Any adult member (18+ years) of a rural household willing to do public work manual labor.",
    eligibilityRules: {
      maxIncome: 400000,
      minAge: 18,
      maxAge: 65,
      occupations: ["Unemployed", "Agriculture Worker", "Daily Wage Worker", "Self-Employed"],
      educationLevels: ["Primary", "High School", "Illiterate", "Any"],
      genders: ["Any"]
    },
    documents: [
      "Job Card Registration Form",
      "Aadhaar Card",
      "Bank/Post Office Account Passbook",
      "Passport Photograph"
    ],
    applicationProcess: "Submit written application for Job Card to local Gram Panchayat office.",
    deadline: "Open All Year Round"
  },
  {
    id: "punjab-ashirwad-scheme",
    name: "Ashirwad Scheme (Punjab Government)",
    shortDescription: "Financial grant for marriage of girls belonging to low-income SC/BC/EWS families.",
    category: "Women & Child Welfare",
    state: "Punjab",
    benefit: "One-time financial grant of ₹51,000 directly transferred to bride's bank account.",
    eligibility: "Daughters of SC, BC, or Economically Weaker Section families residing in Punjab with annual income under ₹30,000.",
    eligibilityRules: {
      maxIncome: 50000,
      minAge: 18,
      maxAge: 40,
      occupations: ["Any"],
      educationLevels: ["Any"],
      genders: ["Female"]
    },
    documents: [
      "Punjab Domicile / Residence Certificate",
      "Caste / EWS Certificate",
      "Income Certificate",
      "Bride & Groom Age Proof (Aadhaar / Matric Certificate)",
      "Bank Account Details"
    ],
    applicationProcess: "Apply at Sub-Divisional Magistrate (SDM) office or District Social Security office 30 days prior to or after marriage.",
    deadline: "Open All Year Round"
  },
  {
    id: "stand-up-india-entrepreneurship",
    name: "Stand Up India Loan Scheme",
    shortDescription: "Bank loans between ₹10 Lakhs and ₹1 Crore for setting up greenfield enterprises.",
    category: "Entrepreneurship",
    state: "All States",
    benefit: "Composite bank loan of ₹10 Lakhs to ₹1 Crore covering up to 75% of total project cost.",
    eligibility: "SC/ST and/or Woman entrepreneurs above 18 years of age setting up manufacturing, services or trading ventures.",
    eligibilityRules: {
      maxIncome: 1500000,
      minAge: 18,
      maxAge: 65,
      occupations: ["Entrepreneur", "Self-Employed", "Business Owner", "Unemployed"],
      educationLevels: ["High School", "Higher Secondary", "Undergraduate", "Postgraduate"],
      genders: ["Female", "Any"]
    },
    documents: [
      "Aadhaar & PAN Card",
      "Category Certificate (if SC/ST)",
      "Detailed Business Plan / Project Report",
      "Bank Statement for last 6 months",
      "Proof of Business Premises / Lease"
    ],
    applicationProcess: "Apply directly online via Stand Up India portal (standupmitra.in) or at commercial bank branches.",
    deadline: "Open All Year Round"
  },
  {
    id: "igndps-senior-pension",
    name: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
    shortDescription: "Monthly pension for senior citizens belonging to Below Poverty Line (BPL) households.",
    category: "Senior Citizens",
    state: "All States",
    benefit: "Monthly pension of ₹500 to ₹1,000 depending on state top-up allowances.",
    eligibility: "Senior citizens aged 60 years and above who belong to a BPL household.",
    eligibilityRules: {
      maxIncome: 120000,
      minAge: 60,
      maxAge: 110,
      occupations: ["Retired", "Unemployed", "Senior Citizen"],
      educationLevels: ["Any"],
      genders: ["Any"]
    },
    documents: [
      "Age Proof Certificate (Aadhaar / Voter ID)",
      "BPL Ration Card",
      "Domicile Certificate",
      "Bank Passbook copy"
    ],
    applicationProcess: "Apply at Gram Panchayat / Block Development Office or Municipal Social Welfare department.",
    deadline: "Open All Year Round"
  },
  {
    id: "pm-mudra-yojana",
    name: "Pradhan Mantri MUDRA Yojana (PMMY)",
    shortDescription: "Collateral-free micro loans up to ₹10 Lakhs for non-corporate, non-farm small/micro enterprises.",
    category: "Entrepreneurship",
    state: "All States",
    benefit: "Collateral-free business loans under 3 categories: Shishu (up to ₹50k), Kishore (₹50k-₹5L), Tarun (₹5L-₹10L).",
    eligibility: "Small business owners, shopkeepers, artisans, fruit vendors, food stalls, and micro-manufacturers.",
    eligibilityRules: {
      maxIncome: 1000000,
      minAge: 18,
      maxAge: 65,
      occupations: ["Self-Employed", "Entrepreneur", "Business Owner"],
      educationLevels: ["Any"],
      genders: ["Any"]
    },
    documents: [
      "Identity & Address Proof",
      "Business Proof / Registration Certificate",
      "Bank Account Statement for 6 months",
      "Quotation of Machinery / Items to be purchased"
    ],
    applicationProcess: "Apply at any public/private commercial bank, RRB, NBFC, or online via UdyamiMitra portal.",
    deadline: "Open All Year Round"
  },
  {
    id: "sukanya-samriddhi-yojana",
    name: "Sukanya Samriddhi Yojana (SSY)",
    shortDescription: "High-interest government savings scheme dedicated for the girl child's education and marriage.",
    category: "Women & Child Welfare",
    state: "All States",
    benefit: "Attractive guaranteed interest rate (8.2% p.a.) + 100% Tax deduction under Section 80C.",
    eligibility: "Parents or legal guardians of a girl child below 10 years of age (maximum 2 girl children per family).",
    eligibilityRules: {
      maxIncome: 2000000,
      minAge: 0,
      maxAge: 10,
      occupations: ["Any"],
      educationLevels: ["Any"],
      genders: ["Female"]
    },
    documents: [
      "Girl Child Birth Certificate",
      "Parent/Guardian Aadhaar Card & PAN",
      "Proof of Residence",
      "Passport Photograph of Girl Child"
    ],
    applicationProcess: "Open SSY account at any India Post Office branch or authorized commercial bank.",
    deadline: "Open All Year Round"
  },
  {
    id: "pm-vishwakarma-scheme",
    name: "PM Vishwakarma Kaushal Samman",
    shortDescription: "End-to-end support for traditional artisans and craftspeople working with hands and tools.",
    category: "Employment",
    state: "All States",
    benefit: "PM Vishwakarma ID Card + ₹15,000 Toolkit Incentive + Collateral-free credit up to ₹3 Lakhs at 5% interest.",
    eligibility: "Traditional artisans across 18 trades (Carpenters, Blacksmiths, Goldsmiths, Potters, Tailors, Masons, etc.).",
    eligibilityRules: {
      maxIncome: 400000,
      minAge: 18,
      maxAge: 70,
      occupations: ["Self-Employed", "Artisan", "Craftsperson", "Daily Wage Worker"],
      educationLevels: ["Any"],
      genders: ["Any"]
    },
    documents: [
      "Aadhaar Card",
      "Mobile Number",
      "Bank Account Details",
      "Ration Card"
    ],
    applicationProcess: "Register at nearest Common Service Centre (CSC) with Aadhaar biometric verification.",
    deadline: "Open All Year Round"
  },
  {
    id: "pm-poshan-mid-day-meal",
    name: "PM POSHAN (Mid-Day Meal Scheme)",
    shortDescription: "Free nutritious hot cooked meals for school children studying in government classes 1 to 8.",
    category: "Education",
    state: "All States",
    benefit: "Guaranteed daily free balanced meal at school with essential calories and micro-nutrients.",
    eligibility: "All children enrolled in Classes I to VIII in Government and Government-aided schools.",
    eligibilityRules: {
      maxIncome: 1000000,
      minAge: 5,
      maxAge: 15,
      occupations: ["Student"],
      educationLevels: ["Primary", "Middle School"],
      genders: ["Any"]
    },
    documents: [
      "School Enrollment ID / Student Admission Record"
    ],
    applicationProcess: "Automatic benefit provided upon enrollment in participating government schools.",
    deadline: "Ongoing Academic Year"
  },
  {
    id: "delhi-ladli-scheme",
    name: "Delhi Ladli Scheme for Girl Child",
    shortDescription: "Financial assistance deposited at milestone stages of girl child's education in Delhi.",
    category: "Women & Child Welfare",
    state: "Delhi",
    benefit: "Cumulative financial deposits up to ₹1,00,000 paid upon reaching 18 years of age and passing Class X/XII.",
    eligibility: "Girl children born in Delhi with family annual income not exceeding ₹1,00,000.",
    eligibilityRules: {
      maxIncome: 100000,
      minAge: 0,
      maxAge: 18,
      occupations: ["Student", "Any"],
      educationLevels: ["Any"],
      genders: ["Female"]
    },
    documents: [
      "Delhi Residence Proof (minimum 3 years)",
      "Birth Certificate of Girl Child",
      "Family Income Certificate",
      "School Admission Receipt"
    ],
    applicationProcess: "Apply at Department of Women and Child Development, Govt. of NCT of Delhi.",
    deadline: "Open All Year Round"
  },
  {
    id: "kerala-karunya-benevolent",
    name: "Karunya Benevolent Fund (Kerala)",
    shortDescription: "Financial grant for poor patients suffering from critical chronic diseases in Kerala.",
    category: "Healthcare",
    state: "Kerala",
    benefit: "Financial assistance up to ₹2,00,000 for medical treatment of cancer, heart surgery, kidney illness, etc.",
    eligibility: "Low-income family patients residing in Kerala with annual household income below ₹3,00,000.",
    eligibilityRules: {
      maxIncome: 300000,
      minAge: 0,
      maxAge: 100,
      occupations: ["Any"],
      educationLevels: ["Any"],
      genders: ["Any"]
    },
    documents: [
      "Medical Certificate & Estimate from Government Hospital doctor",
      "Kerala Domicile Certificate",
      "Income Certificate from Village Officer",
      "Aadhaar Card & Ration Card"
    ],
    applicationProcess: "Submit application form to the District Lottery Office or State Lotteries Directorate, Thiruvananthapuram.",
    deadline: "Open All Year Round"
  }
];
