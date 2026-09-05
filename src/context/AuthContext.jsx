import React, { createContext, useState, useEffect } from 'react';
import { 
  getStoredUser, 
  setStoredUser, 
  getStoredProfile, 
  setStoredProfile,
  getStoredSavedSchemes,
  setStoredSavedSchemes
} from '../utils/storage';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [savedSchemeIds, setSavedSchemeIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Synchronize state with localStorage on mount
  useEffect(() => {
    const initialUser = getStoredUser();
    const initialProfile = getStoredProfile();
    const initialSaved = getStoredSavedSchemes();

    setUser(initialUser);
    setProfile(initialProfile);
    setSavedSchemeIds(initialSaved);
    setLoading(false);
  }, []);

  // Login Handler (Simulated)
  const login = (email, password) => {
    const mockUser = {
      name: email.split('@')[0].replace('.', ' '),
      email: email,
      token: "simulated_jwt_token_12345"
    };
    setUser(mockUser);
    setStoredUser(mockUser);
    return true;
  };

  // Register Handler (Simulated)
  const register = (name, email, password) => {
    const newUser = {
      name: name,
      email: email,
      token: "simulated_jwt_token_67890"
    };
    setUser(newUser);
    setStoredUser(newUser);

    // Initialize custom profile
    const newProfile = {
      name: name,
      age: 20,
      state: "Punjab",
      occupation: "Student",
      education: "Undergraduate",
      income: 200000,
      gender: "Male"
    };
    setProfile(newProfile);
    setStoredProfile(newProfile);
    return true;
  };

  // Logout Handler
  const logout = () => {
    setUser(null);
    setStoredUser(null);
  };

  // Update Profile Attributes
  const updateProfile = (updatedProfileData) => {
    setProfile(updatedProfileData);
    setStoredProfile(updatedProfileData);
  };

  // Bookmark / Save Scheme Handler
  const toggleSaveScheme = (schemeId) => {
    setSavedSchemeIds((prevIds) => {
      let updated;
      if (prevIds.includes(schemeId)) {
        updated = prevIds.filter(id => id !== schemeId);
      } else {
        updated = [...prevIds, schemeId];
      }
      setStoredSavedSchemes(updated);
      return updated;
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    profile,
    savedSchemeIds,
    loading,
    login,
    register,
    logout,
    updateProfile,
    toggleSaveScheme
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
