// src/app/components/TrendingCampaigns.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  donorsCount: number;
  daysLeft: number;
}

export default function TrendingCampaigns() {
  const campaigns: Campaign[] = [
    {
      id: "1",
      title: "School Building Project",
      description: "Help us build a new school for underprivileged children...",
      currentAmount: 25000,
      targetAmount: 50000,
      donorsCount: 150,
      daysLeft: 15
    },
    // Add more campaigns as needed
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Trending Campaigns</h2>
          <Link 
            href="/categories"
            className="text-blue-600 hover:text-blue-700 flex items-center"
          >
            View all
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={`/api/placeholder/800/450`}
                  alt={campaign.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                  className="object-cover"
                  priority={campaign.id === "1"}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {campaign.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {campaign.description}
                </p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">${campaign.currentAmount.toLocaleString()}</span>
                    <span className="text-gray-500">of ${campaign.targetAmount.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min((campaign.currentAmount / campaign.targetAmount) * 100, 100)}%` 
                      }}
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={(campaign.currentAmount / campaign.targetAmount) * 100}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{campaign.donorsCount} donors</span>
                  <span>{campaign.daysLeft} days left</span>
                </div>
                <Link
                  href={`/donations/${campaign.id}`}
                  className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}