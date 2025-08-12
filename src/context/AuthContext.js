'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  loginUser, 
  fetchUserProfile, 
  getStoredToken, 
  setStoredToken, 
  removeStoredToken 
} from '@/data/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for existing token on page load
    const storedToken = getStoredToken();
    
    if (storedToken) {
      setToken(storedToken);
      // Verify token and get user info
      verifyTokenAndGetUser(storedToken);
    } else {
      console.log('AuthProvider: No token found, setting loading to false');
      setLoading(false);
    }
  }, []);

  const verifyTokenAndGetUser = async (token) => {
    try {
      const userData = await fetchUserProfile(token);
      setUser(userData);
    } catch (error) {
      console.error('AuthProvider: Error fetching user profile:', error);
      // Token is invalid, clear it
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      
      setStoredToken(data.token);
      setToken(data.token);
      setUser(data.user); // Assuming login returns user data
      
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    console.log('AuthProvider: Logging out');
    removeStoredToken();
    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.is_staff || false;

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      loading,
      isAuthenticated: !!user && !!token,
      isAdmin  // Add this to the context value
    }}>
      {children}
    </AuthContext.Provider>
  );
};