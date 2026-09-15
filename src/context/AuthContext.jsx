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
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('welfora-theme') || 'light';
  });

  // Apply theme to HTML element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('welfora-theme', theme);
  }, [theme]);

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

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Login Handler (Simulated)
  const login = (email, password) => {
    const mockUser = {
      name: email.includes('@')
        ? email.split('@')[0].replace('.', ' ')
        : `User ${email.slice(-4)}`,
      email: email,
      token: 'simulated_jwt_token_12345'
    };
    setUser(mockUser);
    setStoredUser(mockUser);
    return true;
  };

  // Register Handler (Simulated)
  const register = (name, contact, password) => {
    const newUser = {
      name: name,
      email: contact,
      token: 'simulated_jwt_token_67890'
    };
    setUser(newUser);
    setStoredUser(newUser);

    const newProfile = {
      name: name,
      age: 20,
      state: 'Delhi',
      occupation: 'Student',
      education: 'Undergraduate',
      income: 200000,
      gender: 'Male'
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

  // Update Profile
  const updateProfile = (updatedProfileData) => {
    setProfile(updatedProfileData);
    setStoredProfile(updatedProfileData);
  };

  // Bookmark / Save Scheme
  const toggleSaveScheme = (schemeId) => {
    setSavedSchemeIds((prevIds) => {
      const updated = prevIds.includes(schemeId)
        ? prevIds.filter((id) => id !== schemeId)
        : [...prevIds, schemeId];
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
    theme,
    toggleTheme,
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
