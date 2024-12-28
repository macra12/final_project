// src/lib/donations.ts
export interface DonationData {
  id: string;
  title: string;
  description: string;
  organization: {
    name: string;
    isVerified: boolean;
    logo: string;
  };
  category: string;
  targetAmount: number;
  currentAmount: number;
  donorsCount: number;
  daysLeft: number;
  updates: Array<{
    date: string;
    content: string;
  }>;
}

export async function getDonationData(id: string): Promise<DonationData> {
  // In a real app, this would fetch from your API
  return {
    id,
    title: "Medical Equipment for Children's Hospital",
    description: "Help us provide essential medical equipment to treat children in need...",
    organization: {
      name: "Health Care Foundation",
      isVerified: true,
      logo: "/api/placeholder/96/96" // Using placeholder during development
    },
    category: "Medical",
    targetAmount: 50000,
    currentAmount: 35000,
    donorsCount: 145,
    daysLeft: 30,
    updates: [
      {
        date: "2024-03-15",
        content: "Successfully purchased first batch of equipment. Thank you for your support!"
      }
    ]
  };
}