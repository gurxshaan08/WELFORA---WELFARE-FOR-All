// ============================================================================
// WELFORA LOCAL STORAGE UTILITIES
// Handles persistence for authentication, profile attributes, and saved schemes.
// ============================================================================

const STORAGE_KEYS = {
  USER: "welfora_user",
  PROFILE: "welfora_profile",
  SAVED_SCHEMES: "welfora_saved_schemes"
};

// Default profile structure for new users
export const DEFAULT_PROFILE = {
  name: "Rahul Sharma",
  age: 20,
  state: "Punjab",
  occupation: "Student",
  education: "Undergraduate",
  income: 200000, // ₹2,00,000
  gender: "Male"
};

// User Auth Helpers
export const getStoredUser = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Error reading stored user:", e);
    return null;
  }
};

export const setStoredUser = (user) => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  } catch (e) {
    console.error("Error setting stored user:", e);
  }
};

// Profile Helpers
export const getStoredProfile = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : DEFAULT_PROFILE;
  } catch (e) {
    console.error("Error reading stored profile:", e);
    return DEFAULT_PROFILE;
  }
};

export const setStoredProfile = (profile) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error("Error saving stored profile:", e);
  }
};

// Saved Schemes Helpers (Array of Scheme IDs)
export const getStoredSavedSchemes = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SAVED_SCHEMES);
    return data ? JSON.parse(data) : ["pm-kisan", "post-matric-scholarship"]; // Initial default saved items
  } catch (e) {
    console.error("Error reading saved schemes:", e);
    return ["pm-kisan", "post-matric-scholarship"];
  }
};

export const setStoredSavedSchemes = (schemeIds) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_SCHEMES, JSON.stringify(schemeIds));
  } catch (e) {
    console.error("Error setting saved schemes:", e);
  }
};
