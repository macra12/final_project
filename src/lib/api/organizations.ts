// src/lib/api/organizations.ts

import { getAuthToken } from '../utils/auth';
import type { 
  OrganizationProfile,
  OrganizationVerification,
  DonationCampaign
} from '../types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Get all organizations
 */
export async function getOrganizations(params?: {
  status?: 'pending' | 'verified' | 'rejected';
  search?: string;
  page?: number;
  limit?: number;
}): Promise<{
  organizations: OrganizationProfile[];
  total: number;
  pages: number;
}> {
  try {
    const queryParams = params ? `?${new URLSearchParams(params as any)}` : '';
    const response = await fetch(`${API_URL}/organizations${queryParams}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleOrganizationError(error);
  }
}

/**
 * Get organization by ID
 */
export async function getOrganizationById(id: string): Promise<OrganizationProfile> {
  try {
    const response = await fetch(`${API_URL}/organizations/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleOrganizationError(error);
  }
}

/**
 * Create organization profile
 */
export async function createOrganization(data: FormData): Promise<OrganizationProfile> {
  try {
    const response = await fetch(`${API_URL}/organizations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: data,
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleOrganizationError(error);
  }
}

/**
 * Update organization profile
 */
export async function updateOrganization(
  id: string,
  data: FormData
): Promise<OrganizationProfile> {
  try {
    const response = await fetch(`${API_URL}/organizations/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: data,
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleOrganizationError(error);
  }
}

/**
 * Submit organization verification
 */
export async function submitVerification(
  id: string,
  documents: FormData
): Promise<OrganizationVerification> {
  try {
    const response = await fetch(`${API_URL}/organizations/${id}/verify`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: documents,
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleOrganizationError(error);
  }
}

/**
 * Update verification status
 */
export async function updateVerificationStatus(
  id: string,
  status: 'approved' | 'rejected',
  notes?: string
): Promise<OrganizationVerification> {
  try {
    const response = await fetch(`${API_URL}/organizations/${id}/verify/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify({ status, notes }),
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleOrganizationError(error);
  }
}

/**
 * Get organization donations
 */
export async function getOrganizationDonations(
  id: string,
  params?: {
    status?: string;
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
  }
): Promise<{
  campaigns: DonationCampaign[];
  total: number;
  pages: number;
}> {
  try {
    const queryParams = params ? `?${new URLSearchParams(params as any)}` : '';
    const response = await fetch(`${API_URL}/organizations/${id}/donations${queryParams}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleOrganizationError(error);
  }
}

/**
 * Get organization analytics
 */
export async function getOrganizationAnalytics(
  id: string,
  timeframe: 'week' | 'month' | 'year' = 'month'
): Promise<{
  totalDonations: number;
  totalAmount: number;
  donorCount: number;
  campaignStats: {
    active: number;
    completed: number;
    totalRaised: number;
  };
  recentActivity: {
    date: string;
    amount: number;
    donorCount: number;
  }[];
}> {
  try {
    const response = await fetch(
      `${API_URL}/organizations/${id}/analytics?timeframe=${timeframe}`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleOrganizationError(error);
  }
}

/**
 * Update organization settings
 */
export async function updateOrganizationSettings(
  id: string,
  settings: {
    emailNotifications?: boolean;
    payoutMethod?: string;
    taxInformation?: {
      taxId: string;
      address: string;
    };
  }
): Promise<{ success: boolean }> {
  try {
    const response = await fetch(`${API_URL}/organizations/${id}/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleOrganizationError(error);
  }
}

/**
 * Handle organization errors
 */
function handleOrganizationError(error: any): Error {
  if (error.message) {
    return new Error(error.message);
  }
  return new Error('An unexpected error occurred while processing the organization request');
}