"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Building, 
  Calendar, 
  Clock, 
  Share2, 
  Heart,
  DollarSign,
  Users,
  BadgeCheck
} from "lucide-react";

interface DonationPageProps {
  params: {
    id: string;
  };
}

export default function DonationPage({ params }: DonationPageProps) {
  // This would come from your API based on the ID
  const donation = {
    id: params.id,
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

  const [donationAmount, setDonationAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<boolean>(false);

  const predefinedAmounts = [10, 25, 50, 100];

  const getProgressPercentage = () => {
    return Math.min((donation.currentAmount / donation.targetAmount) * 100, 100);
  };

  const handleDonate = () => {
    // Implement donation logic here
    console.log("Donating:", donationAmount);
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
              layout="fill"
              objectFit="cover"
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
                    <BadgeCheck className="ml-1 h-5 w-5 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-500">Verified Organization</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-700">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Campaign Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{donation.title}</h1>
            <p className="text-gray-600 mb-6">{donation.description}</p>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Campaign Updates</h2>
              {donation.updates.map((update, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <p className="text-sm text-gray-500">{new Date(update.date).toLocaleDateString()}</p>
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
                <span className="text-gray-500">raised of ${donation.targetAmount.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: `${getProgressPercentage()}%` }}
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

            {/* Donation Amount Selection */}
            <div className="space-y-4">
              {!customAmount && (
                <div className="grid grid-cols-2 gap-2">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setDonationAmount(amount.toString())}
                      className={`px-4 py-2 rounded-lg border ${
                        donationAmount === amount.toString()
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-blue-600'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              )}

              {customAmount ? (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter amount"
                  />
                </div>
              ) : (
                <button
                  onClick={() => setCustomAmount(true)}
                  className="w-full text-center text-sm text-blue-600 hover:text-blue-700"
                >
                  Enter custom amount
                </button>
              )}

              <button
                onClick={handleDonate}
                disabled={!donationAmount}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}