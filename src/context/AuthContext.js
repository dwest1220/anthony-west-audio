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
    console.log('AuthProvider: Initializing...');
    
    // Check for existing token on page load
    const storedToken = getStoredToken();
    console.log('AuthProvider: Stored token:', storedToken ? 'Found' : 'Not found');
    
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
    console.log('AuthProvider: Verifying token and fetching user...');
    try {
      const userData = await fetchUserProfile(token);
      console.log('AuthProvider: User data received:', userData);
      setUser(userData);
    } catch (error) {
      console.error('AuthProvider: Error fetching user profile:', error);
      // Token is invalid, clear it
      logout();
    } finally {
      console.log('AuthProvider: Setting loading to false');
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

  // Add isAdmin check based on your user data structure
  const isAdmin = user?.is_staff || false;

  console.log('AuthProvider: Current state:', {
    user,
    token: token ? 'Present' : 'None',
    loading,
    isAdmin,
    userIsStaff: user?.is_staff
  });

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