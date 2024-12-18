// src/lib/types/auth.ts

export type UserRole = 'admin' | 'organization' | 'user';

export type AuthMethod = 'email' | 'phone' | 'google' | 'facebook';

export interface AuthCredentials {
  email?: string;
  password?: string;
  phone?: string;
  otp?: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterCredentials extends AuthCredentials {
  name: string;
  role: UserRole;
  organizationName?: string;
  organizationDescription?: string;
}

export interface VerificationData {
  userId: string;
  type: 'email' | 'phone';
  code: string;
  expiresAt: Date;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}

export interface ResetPasswordData {
  email: string;
  token: string;
  newPassword: string;
}

export interface SocialAuthCredentials {
  provider: 'google' | 'facebook';
  accessToken: string;
  profile?: {
    id: string;
    email: string;
    name: string;
    image?: string;
  };
}

export interface AuthSession {
  userId: string;
  token: string;
  expiresAt: Date;
  lastActivity: Date;
  deviceInfo?: {
    userAgent: string;
    ip: string;
  };
}

// Organization verification types
export interface OrganizationVerification {
  organizationId: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: VerificationDocument[];
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  notes?: string;
}

export interface VerificationDocument {
  id: string;
  type: 'registration' | 'tax' | 'identity' | 'other';
  url: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
}

// Request and Response types for auth endpoints
export interface LoginRequest {
  method: AuthMethod;
  credentials: AuthCredentials;
}

export interface RegisterRequest {
  credentials: RegisterCredentials;
  verificationMethod?: 'email' | 'phone';
}

export interface VerifyAccountRequest {
  userId: string;
  code: string;
  type: 'email' | 'phone';
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}