// src/lib/api/donations.ts

import { getAuthToken } from '../utils/auth';
import type { 
  DonationCampaign, 
  DonationTransaction, 
  ScheduledDonation,
  DonationFilter,
  DonationResponse,
  CreateDonationRequest
} from '../types/donation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Get all donations with filters
 */
export async function getDonations(filters?: DonationFilter): Promise<DonationResponse> {
  try {
    const queryParams = filters ? `?${new URLSearchParams(filters as any)}` : '';
    const response = await fetch(`${API_URL}/donations${queryParams}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleDonationError(error);
  }
}

/**
 * Get donation by ID
 */
export async function getDonationById(id: string): Promise<DonationCampaign> {
  try {
    const response = await fetch(`${API_URL}/donations/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleDonationError(error);
  }
}

/**
 * Create donation campaign
 */
export async function createDonationCampaign(
  data: Omit<DonationCampaign, 'id' | 'createdAt' | 'updatedAt'>
): Promise<DonationCampaign> {
  try {
    const response = await fetch(`${API_URL}/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleDonationError(error);
  }
}

/**
 * Update donation campaign
 */
export async function updateDonationCampaign(
  id: string,
  data: Partial<DonationCampaign>
): Promise<DonationCampaign> {
  try {
    const response = await fetch(`${API_URL}/donations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleDonationError(error);
  }
}

/**
 * Process donation transaction
 */
export async function processDonation(data: CreateDonationRequest): Promise<DonationTransaction> {
  try {
    const response = await fetch(`${API_URL}/donations/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleDonationError(error);
  }
}

/**
 * Create scheduled donation
 */
export async function createScheduledDonation(
  data: Omit<ScheduledDonation, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ScheduledDonation> {
  try {
    const response = await fetch(`${API_URL}/donations/schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleDonationError(error);
  }
}

/**
 * Get user's donation history
 */
export async function getDonationHistory(): Promise<DonationTransaction[]> {
  try {
    const response = await fetch(`${API_URL}/donations/history`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleDonationError(error);
  }
}

/**
 * Get user's scheduled donations
 */
export async function getScheduledDonations(): Promise<ScheduledDonation[]> {
  try {
    const response = await fetch(`${API_URL}/donations/scheduled`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleDonationError(error);
  }
}

/**
 * Update scheduled donation
 */
export async function updateScheduledDonation(
  id: string,
  data: Partial<ScheduledDonation>
): Promise<ScheduledDonation> {
  try {
    const response = await fetch(`${API_URL}/donations/schedule/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleDonationError(error);
  }
}

/**
 * Cancel scheduled donation
 */
export async function cancelScheduledDonation(id: string): Promise<{ success: boolean }> {
  try {
    const response = await fetch(`${API_URL}/donations/schedule/${id}/cancel`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleDonationError(error);
  }
}

/**
 * Get similar donations
 */
export async function getSimilarDonations(id: string): Promise<DonationCampaign[]> {
  try {
    const response = await fetch(`${API_URL}/donations/${id}/similar`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.json();
  } catch (error) {
    throw handleDonationError(error);
  }
}

/**
 * Get donation receipt
 */
export async function getDonationReceipt(transactionId: string): Promise<Blob> {
  try {
    const response = await fetch(`${API_URL}/donations/receipt/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      throw await response.json();
    }

    return response.blob();
  } catch (error) {
    throw handleDonationError(error);
  }
}

/**
 * Handle donation errors
 */
function handleDonationError(error: any): Error {
  if (error.message) {
    return new Error(error.message);
  }
  return new Error('An unexpected error occurred while processing the donation');
}