import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage for an existing token when the app loads
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token); // Store token in localStorage
    setIsAuthenticated(true); // Set auth state to true
  };

  const logout = () => {
    localStorage.removeItem('authToken'); // Remove token
    setIsAuthenticated(false); // Set auth state to false
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
