"use client";

import { useState } from "react";
import { use } from "react";
import Image from "next/image";
import { 
  BadgeCheck, 
  Heart, 
  Share2 
} from "lucide-react";

interface DonationData {
  id: string;
  title: string;
  description: string;
  organization: {
    name: string;
    isVerified: boolean;
    logo: string;
    description: string;
  };
  category: string;
  targetAmount: number;
  currentAmount: number;
  donorsCount: number;
  daysLeft: number;
  image: string;
  updates: Array<{
    date: string;
    content: string;
  }>;
}

interface DonationPageProps {
  params: Promise<{ id: string }>;
}

function DonationContent({ donationId }: { donationId: string }) {
  const [donationAmount, setDonationAmount] = useState<string>("");
  const predefinedAmounts = [10, 25, 50, 100];

  // This would come from your API based on the ID
  const donation: DonationData = {
    id: donationId,
    title: "Medical Equipment for Children's Hospital",
    description: "Help us provide essential medical equipment to treat children in need. Your support will directly contribute to improving healthcare facilities and ensuring better medical care for children.",
    organization: {
      name: "Health Care Foundation",
      isVerified: true,
      logo: "/org-logo1.jpg",
      description: "A non-profit organization dedicated to improving healthcare access."
    },
    category: "Medical",
    targetAmount: 50000,
    currentAmount: 35000,
    donorsCount: 145,
    daysLeft: 30,
    image: "/donation1.jpg",
    updates: [
      {
        date: "2024-03-15",
        content: "Successfully purchased first batch of equipment. Thank you for your support!"
      }
    ]
  };

  const getProgressPercentage = () => {
    return Math.min((donation.currentAmount / donation.targetAmount) * 100, 100);
  };

  const handleDonateClick = async () => {
    if (!donationAmount) return;
    // Add your donation handling logic here
    console.log(`Processing donation of $${donationAmount}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Campaign Image */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden">
            <Image
              src={donation.image}
              alt={donation.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Organization Info */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <Image
                src={donation.organization.logo}
                alt={donation.organization.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-900">{donation.organization.name}</h3>
                  {donation.organization.isVerified && (
                    <BadgeCheck className="ml-1 h-5 w-5 text-blue-500" aria-label="Verified Organization" />
                  )}
                </div>
                <p className="text-sm text-gray-500">Verified Organization</p>
              </div>
            </div>
            <button 
              className="text-gray-400 hover:text-gray-500"
              aria-label="Share campaign"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Campaign Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{donation.title}</h1>
            <p className="text-gray-600 mb-6">{donation.description}</p>
            
            {/* Campaign Updates */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Campaign Updates</h2>
              {donation.updates.map((update, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <time className="text-sm text-gray-500">{new Date(update.date).toLocaleDateString()}</time>
                  <p className="text-gray-600">{update.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Donation Side Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">${donation.currentAmount.toLocaleString()}</span>
                <span className="text-gray-500">of ${donation.targetAmount.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage()}%` }}
                  role="progressbar"
                  aria-valuenow={getProgressPercentage()}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{donation.donorsCount}</div>
                <div className="text-sm text-gray-500">Donors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{getProgressPercentage()}%</div>
                <div className="text-sm text-gray-500">Funded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{donation.daysLeft}</div>
                <div className="text-sm text-gray-500">Days Left</div>
              </div>
            </div>

            {/* Donation Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setDonationAmount(amount.toString())}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      donationAmount === amount.toString()
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-blue-600'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleDonateClick}
                disabled={!donationAmount}
              >
                <Heart className="h-5 w-5 mr-2" />
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DonationDetailPage({ params }: DonationPageProps) {
  const resolvedParams = use(params);
  return <DonationContent donationId={resolvedParams.id} />;
}