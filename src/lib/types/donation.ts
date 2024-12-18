// src/lib/types/donation.ts

import { type UserRole } from './auth';

export type DonationStatus = 'active' | 'completed' | 'expired' | 'cancelled';
export type DonationFrequency = 'one-time' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  category: string;
  organizationId: string;
  organization: {
    name: string;
    logo: string;
    isVerified: boolean;
  };
  targetAmount: number;
  currentAmount: number;
  donorsCount: number;
  startDate: Date;
  endDate: Date;
  status: DonationStatus;
  image: string;
  tags: string[];
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DonationTransaction {
  id: string;
  campaignId: string;
  userId: string;
  amount: number;
  frequency: DonationFrequency;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  isAnonymous: boolean;
  message?: string;
  transactionDate: Date;
  scheduleId?: string;
  paymentDetails: {
    provider: string;
    transactionId: string;
    fee?: number;
  };
}

export interface ScheduledDonation {
  id: string;
  userId: string;
  campaignId: string;
  amount: number;
  frequency: Exclude<DonationFrequency, 'one-time'>;
  status: 'active' | 'paused' | 'cancelled';
  startDate: Date;
  nextPaymentDate: Date;
  lastPaymentDate?: Date;
  paymentMethod: string;
  totalDonated: number;
  transactionCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DonationStatistics {
  totalAmount: number;
  donorCount: number;
  averageDonation: number;
  completionPercentage: number;
  recentDonations: DonationTransaction[];
  topDonors: {
    userId: string;
    totalAmount: number;
    donationCount: number;
  }[];
}

export interface CreateDonationRequest {
  campaignId: string;
  amount: number;
  frequency: DonationFrequency;
  paymentMethod: string;
  isAnonymous?: boolean;
  message?: string;
  scheduleDetails?: {
    startDate: Date;
    endDate?: Date;
  };
}

export interface UpdateDonationRequest {
  campaignId: string;
  title?: string;
  description?: string;
  targetAmount?: number;
  endDate?: Date;
  status?: DonationStatus;
  image?: string;
  tags?: string[];
}

export interface DonationFilter {
  category?: string;
  status?: DonationStatus;
  organizationId?: string;
  minAmount?: number;
  maxAmount?: number;
  startDate?: Date;
  endDate?: Date;
  featured?: boolean;
  search?: string;
  sortBy?: 'recent' | 'amount' | 'popularity' | 'endingSoon';
  page?: number;
  limit?: number;
}

export interface DonationResponse {
  data: DonationCampaign[];
  totalCount: number;
  pageCount: number;
  currentPage: number;
}

export interface DonorProfile {
  userId: string;
  totalDonations: number;
  totalAmount: number;
  frequentCategories: string[];
  lastDonation: Date;
  badges: {
    type: string;
    name: string;
    earnedAt: Date;
  }[];
  impactStats: {
    campaignsSupported: number;
    organizationsSupported: number;
    consecutiveMonths: number;
  };
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal';
  details: {
    last4?: string;
    brand?: string;
    bankName?: string;
    email?: string;
  };
  isDefault: boolean;
  createdAt: Date;
}

export interface DonationNotification {
  id: string;
  type: 'donation_received' | 'goal_reached' | 'campaign_ending' | 'payment_failed';
  userId: string;
  campaignId: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface DonationAnalytics {
  campaign: {
    dailyDonations: {
      date: Date;
      amount: number;
      count: number;
    }[];
    donorRetention: number;
    averageDonation: number;
    peakHours: {
      hour: number;
      count: number;
    }[];
  };
  donor: {
    frequencyDistribution: {
      frequency: DonationFrequency;
      count: number;
    }[];
    categoryPreferences: {
      category: string;
      percentage: number;
    }[];
    donationHistory: {
      month: string;
      amount: number;
    }[];
  };
}

export interface DonationReceipt {
  transactionId: string;
  campaignTitle: string;
  organizationName: string;
  donorName: string;
  amount: number;
  date: Date;
  paymentMethod: string;
  taxDeductible: boolean;
  receiptNumber: string;
}