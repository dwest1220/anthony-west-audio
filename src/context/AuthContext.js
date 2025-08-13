'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  loginUser, 
  fetchUserProfile, 
  getStoredToken, 
  setStoredToken, 
  removeStoredToken 
} from '@/data/auth';

const AuthContext = createContext();

const PUBLIC_ROUTES = ['/register', '/login', '/'];

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
      logout,
      loading,
      isAuthenticated: !!user && !!token,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};