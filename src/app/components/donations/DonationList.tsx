"use client";

import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { DonationCard } from "./DonationCard";

interface Donation {
  id: string;
  title: string;
  description: string;
  image: string;
  organization: {
    name: string;
    logo: string;
    isVerified: boolean;
  };
  targetAmount: number;
  currentAmount: number;
  donorsCount: number;
  daysLeft: number;
  category: string;
  createdAt: Date;
}

interface DonationListProps {
  donations: Donation[];
  isLoading?: boolean;
}

type SortOption = 'newest' | 'mostFunded' | 'endingSoon';

export function DonationList({ donations, isLoading = false }: DonationListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "Medical",
    "Education",
    "Environment",
    "Disaster Relief",
    "Animals",
    "Community"
  ];

  // Filter donations based on search and category
  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || donation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort donations based on selected option
  const sortedDonations = [...filteredDonations].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'mostFunded':
        return (b.currentAmount / b.targetAmount) - (a.currentAmount / a.targetAmount);
      case 'endingSoon':
        return a.daysLeft - b.daysLeft;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="mostFunded">Most Funded</option>
            <option value="endingSoon">Ending Soon</option>
          </select>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === "all"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedCategory === category
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {sortedDonations.length} campaigns
      </div>

      {/* Donations Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-video rounded-lg mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {sortedDonations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedDonations.map((donation) => (
                <DonationCard
                  key={donation.id}
                  {...donation}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No donations found matching your criteria
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}