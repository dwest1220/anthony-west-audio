'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  loginUser, 
  registerUser,
  fetchUserProfile, 
  getStoredToken, 
  setStoredToken, 
  removeStoredToken 
} from '@/data/auth';

const AuthContext = createContext();

const PUBLIC_ROUTES = ['/register', '/login', '/', '/about', '/contact', '/services'];

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  // Check if current route is public
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    // Check for existing token on page load
    const storedToken = getStoredToken();
    
    if (storedToken) {
      console.log('AuthProvider: Found stored token, verifying...');
      setToken(storedToken);
      // Verify token and get user info
      verifyTokenAndGetUser(storedToken);
    } else {
      console.log('AuthProvider: No token found, setting loading to false');
      setLoading(false);
    }
  }, []);

  // Handle route protection after auth state is determined
  useEffect(() => {
    if (!loading && !isPublicRoute && !user) {
      console.log('AuthProvider: Redirecting to login from protected route');
      router.push('/login');
    }
  }, [loading, user, isPublicRoute, router, pathname]);

  const verifyTokenAndGetUser = async (token) => {
    try {
      console.log('AuthProvider: Verifying token and fetching user...');
      const userData = await fetchUserProfile(token);
      console.log('AuthProvider: User data received:', userData);
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
      console.log('AuthProvider: Attempting login...');
      const data = await loginUser(credentials);
      
      setStoredToken(data.token);
      setToken(data.token);
      
      // If login response includes user data, use it. Otherwise fetch it.
      if (data.user) {
        setUser(data.user);
      } else {
        await verifyTokenAndGetUser(data.token);
      }
      
      console.log('AuthProvider: Login successful');
      return data;
    } catch (error) {
      console.error('AuthProvider: Login failed:', error);
      throw error;
    }
  };

  // NEW: Register function that handles the full auth flow
  const register = async (userData) => {
    try {
      console.log('AuthProvider: Attempting registration...');
      
      // Step 1: Register the user
      const registerResponse = await registerUser(userData);
      console.log('AuthProvider: Registration successful');
      
      // Step 2: If registration returned a token, use it. Otherwise, login.
      if (registerResponse.token) {
        console.log('AuthProvider: Token received from registration');
        setStoredToken(registerResponse.token);
        setToken(registerResponse.token);
        
        if (registerResponse.user) {
          setUser(registerResponse.user);
        } else {
          await verifyTokenAndGetUser(registerResponse.token);
        }
      } else {
        console.log('AuthProvider: No token from registration, attempting login...');
        // Auto-login after registration
        await login({
          username: userData.username,
          password: userData.password
        });
      }
      
      console.log('AuthProvider: Registration and authentication complete');
      return registerResponse;
    } catch (error) {
      console.error('AuthProvider: Registration failed:', error);
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

  // Show loading spinner while checking auth (except on public routes)
  if (loading && !isPublicRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // For public routes, always render content regardless of auth state
  if (isPublicRoute) {
    return (
      <AuthContext.Provider value={{
        user,
        token,
        login,
        register, // NEW: Add register function
        logout,
        loading,
        isAuthenticated: !!user && !!token,
        isAdmin
      }}>
        {children}
      </AuthContext.Provider>
    );
  }

  // For protected routes, only render if user is authenticated
  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      register, // NEW: Add register function
      logout,
      loading,
      isAuthenticated: !!user && !!token,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};