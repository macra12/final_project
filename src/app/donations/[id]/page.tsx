// src/app/donations/[id]/page.tsx

import { Suspense } from "react";
import DonationContent from "./DonationContent";

interface PageProps {
  params: {
    id: string;
  };
}

async function getDonationData(id: string) {
  // This would be replaced with your actual API call
  return {
    id,
    title: "Medical Equipment for Children's Hospital",
    description: "Help us provide essential medical equipment to treat children in need. Your donation will directly contribute to purchasing vital medical supplies and equipment for our pediatric ward.",
    organization: {
      name: "Health Care Foundation",
      isVerified: true,
      logo: "/organization-logo.jpg"
    },
    category: "Medical",
    targetAmount: 50000,
    currentAmount: 35000,
    donorsCount: 145,
    daysLeft: 30,
    image: "/campaign-image.jpg",
    updates: [
      {
        date: "2024-03-15",
        content: "Successfully purchased first batch of equipment. Thank you for your support!"
      }
    ]
  };
}

export default async function DonationPage({ params }: PageProps) {
  const donationData = await getDonationData(params.id);

  return (
    <Suspense 
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <DonationContent donation={donationData} />
    </Suspense>
  );
}