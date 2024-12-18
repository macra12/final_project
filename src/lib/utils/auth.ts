// src/lib/utils/auth.ts

import { AuthUser, UserRole } from '../types/auth';
import { jwtDecode } from 'jwt-decode';

/**
 * Sets the authentication token in local storage
 */
export const setAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

/**
 * Gets the authentication token from local storage
 */
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

/**
 * Removes the authentication token from local storage
 */
export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
};

/**
 * Checks if the current user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return (decodedToken.exp ?? 0) > currentTime;
  } catch {
    return false;
  }
};

/**
 * Gets the authenticated user's information from the token
 */
export const getAuthUser = (): AuthUser | null => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

/**
 * Checks if the user has the required role
 */
export const hasRole = (requiredRole: UserRole | UserRole[]): boolean => {
  const user = getAuthUser();
  if (!user) return false;

  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role);
  }

  return user.role === requiredRole;
};

/**
 * Validates password strength
 */
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Formats phone number for authentication
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Add country code if not present
  if (!cleaned.startsWith('1') && cleaned.length === 10) {
    return `+1${cleaned}`;
  }
  
  return `+${cleaned}`;
};

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Handles authentication errors
 */
export const handleAuthError = (error: any): string => {
  const errorMessages: Record<string, string> = {
    'auth/wrong-password': 'Incorrect password',
    'auth/user-not-found': 'No account found with this email',
    'auth/invalid-email': 'Invalid email address',
    'auth/email-already-in-use': 'Email is already registered',
    'auth/weak-password': 'Password is too weak',
    'auth/invalid-phone-number': 'Invalid phone number',
    'auth/invalid-verification-code': 'Invalid verification code',
    'auth/code-expired': 'Verification code has expired',
  };

  if (typeof error === 'string' && error in errorMessages) {
    return errorMessages[error];
  }

  return 'An unexpected authentication error occurred';
};

/**
 * Generates a session storage key
 */
export const generateSessionKey = (userId: string): string => {
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(7);
  return `${userId}_${timestamp}_${random}`;
};

/**
 * Check if user has required permissions
 */
export const hasPermission = (
  requiredPermissions: string | string[]
): boolean => {
  const user = getAuthUser();
  if (!user) return false;

  // Admin has all permissions
  if (user.role === 'admin') return true;

  const userPermissions = user.permissions || [];
  if (Array.isArray(requiredPermissions)) {
    return requiredPermissions.every(permission => 
      userPermissions.includes(permission)
    );
  }

  return userPermissions.includes(requiredPermissions);
};