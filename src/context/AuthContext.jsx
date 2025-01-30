/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';

const defaultValue = {
  user: null,
  isLoading: true,
  error: null,
  setUser: () => null,
  logout: () => null,
};

const AuthContext = createContext(defaultValue);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        setError('Failed to restore authentication state');
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      // Clear user data
      setUser(null);
      localStorage.removeItem('user');
      
      // Clear any other auth-related data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('auth_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      setError('Logout failed');
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData) => {
    try {
      setIsLoading(true);
      setUser(userData);
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      setError('Failed to update user data');
      console.error('Update user error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = {
    user,
    isLoading,
    error,
    setUser: updateUser,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
