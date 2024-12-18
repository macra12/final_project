// src/lib/api/auth.ts

import { 
    AuthCredentials, 
    LoginResponse, 
    RegisterCredentials, 
    AuthUser, 
    VerificationData,
    ResetPasswordData
  } from '../types/auth';
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  
  /**
   * Login with email and password
   */
  export async function loginWithEmail(
    email: string,
    password: string
  ): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      return response.json();
    } catch (error) {
      throw handleAuthError(error);
    }
  }
  
  /**
   * Login with phone number and OTP
   */
  export async function loginWithPhone(
    phone: string,
    otp: string
  ): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login/phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, otp }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      return response.json();
    } catch (error) {
      throw handleAuthError(error);
    }
  }
  
  /**
   * Register new user
   */
  export async function register(
    credentials: RegisterCredentials
  ): Promise<{ user: AuthUser; verificationId: string }> {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      return response.json();
    } catch (error) {
      throw handleAuthError(error);
    }
  }
  
  /**
   * Send verification code
   */
  export async function sendVerificationCode(
    type: 'email' | 'phone',
    contact: string
  ): Promise<{ verificationId: string }> {
    try {
      const response = await fetch(`${API_URL}/auth/send-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, contact }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      return response.json();
    } catch (error) {
      throw handleAuthError(error);
    }
  }
  
  /**
   * Verify code
   */
  export async function verifyCode(data: VerificationData): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      return response.json();
    } catch (error) {
      throw handleAuthError(error);
    }
  }
  
  /**
   * Request password reset
   */
  export async function requestPasswordReset(email: string): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      return response.json();
    } catch (error) {
      throw handleAuthError(error);
    }
  }
  
  /**
   * Reset password
   */
  export async function resetPassword(data: ResetPasswordData): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      return response.json();
    } catch (error) {
      throw handleAuthError(error);
    }
  }
  
  /**
   * Refresh authentication token
   */
  export async function refreshToken(): Promise<{ token: string }> {
    try {
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // for handling HTTP-only cookies
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      return response.json();
    } catch (error) {
      throw handleAuthError(error);
    }
  }
  
  /**
   * Logout user
   */
  export async function logout(): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      throw handleAuthError(error);
    }
  }
  
  /**
   * Change password
   */
  export async function changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      return response.json();
    } catch (error) {
      throw handleAuthError(error);
    }
  }
  
  /**
   * Get current user
   */
  export async function getCurrentUser(): Promise<AuthUser> {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
  
      return response.json();
    } catch (error) {
      throw handleAuthError(error);
    }
  }
  
  /**
   * Handle authentication errors
   */
  function handleAuthError(error: any): Error {
    if (error.message) {
      return new Error(error.message);
    }
    return new Error('An unexpected authentication error occurred');
  }
  
  /**
   * Get authentication token from local storage
   */
  function getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }