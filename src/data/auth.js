import { API_URL } from "./fetcher";
import { fetchWithResponse } from "./fetcher";

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  
  const data = await response.json();
  return data; // Should contain { token, user } or similar
};

export const fetchUserProfile = async (token) => {
  const response = await fetch(`${API_URL}/auth/user`, {
    headers: { Authorization: `Token ${token}` }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  
  return await response.json();
};

export const getStoredToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const setStoredToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const removeStoredToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

export const registerUser = async (userData) => {
  const response = await fetchWithResponse(`auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  if (!response) {
    throw new Error("No response from server")
  }
  
  if (response.token) {
    setStoredToken(response.token);
  }
  
  return response;
};