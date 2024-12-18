"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  Filter, 
  BadgeCheck, 
  ArrowUpRight,
  SlidersHorizontal
} from "lucide-react";

interface Donation {
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
  daysLeft: number;
  image: string;
  donorsCount: number;
}

export default function DonationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Sample data - replace with API call
  const donations: Donation[] = [
    {
      id: "1",
      title: "Medical Equipment for Children's Hospital",
      description: "Help us provide essential medical equipment to treat children in need.",
      organization: {
        name: "Health Care Foundation",
        isVerified: true,
        logo: "/org-logo1.jpg"
      },
      category: "Medical",
      targetAmount: 50000,
      currentAmount: 35000,
      daysLeft: 30,
      image: "/donation1.jpg",
      donorsCount: 145
    },
    // Add more sample donations
  ];

  const categories = [
    "Medical",
    "Education",
    "Disaster Relief",
    "Environment",
    "Animals",
    "Community"
  ];

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Donation Campaigns</h1>
        <p className="mt-2 text-gray-600">Support causes you care about and make a difference</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search campaigns..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white rounded-lg border">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-lg text-sm ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Donations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation) => (
          <Link 
            href={`/donations/${donation.id}`}
            key={donation.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Campaign Image */}
            <div className="relative h-48">
              <Image
                src={donation.image}
                alt={donation.title}
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Campaign Info */}
            <div className="p-4">
              {/* Organization Info */}
              <div className="flex items-center mb-2">
                <Image
                  src={donation.organization.logo}
                  alt={donation.organization.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="ml-2 text-sm text-gray-600">
                  {donation.organization.name}
                </span>
                {donation.organization.isVerified && (
                  <BadgeCheck className="ml-1 h-4 w-4 text-blue-500" />
                )}
              </div>

              {/* Campaign Title */}
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {donation.title}
              </h3>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">${donation.currentAmount.toLocaleString()}</span>
                  <span className="text-gray-500">of ${donation.targetAmount.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${getProgressPercentage(donation.currentAmount, donation.targetAmount)}%` }}
                  />
                </div>
              </div>

              {/* Campaign Stats */}
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <div>{donation.donorsCount} donors</div>
                <div>{donation.daysLeft} days left</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}