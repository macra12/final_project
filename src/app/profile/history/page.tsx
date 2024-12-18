"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  Filter,
  Download,
  CalendarRange,
  ArrowUpRight,
  ChevronDown
} from "lucide-react";

interface DonationHistory {
  id: string;
  campaignTitle: string;
  organizationName: string;
  organizationLogo: string;
  amount: number;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  receiptUrl?: string;
  category: string;
}

export default function DonationHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Sample data - replace with API call
  const donations: DonationHistory[] = [
    {
      id: "1",
      campaignTitle: "Medical Equipment for Children's Hospital",
      organizationName: "Health Care Foundation",
      organizationLogo: "/org-logo.jpg",
      amount: 100,
      date: new Date("2024-03-15"),
      status: "completed",
      receiptUrl: "/receipt.pdf",
      category: "Medical"
    },
    // Add more sample donations
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800"
    };

    return statusStyles[status as keyof typeof statusStyles];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donation History</h1>
          <p className="text-gray-600">Track all your contributions</p>
        </div>
        <button
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <Download className="h-4 w-4 mr-2" />
          Export History
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search donations..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Date Range Filter */}
          <div className="md:w-48">
            <select
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="md:w-48">
            <select
              className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="name">Campaign Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Donations List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
          <div className="bg-gray-50 px-6 py-3 grid grid-cols-12 gap-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-4">Campaign</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200 bg-white">
            {donations.map((donation) => (
              <div key={donation.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50">
                {/* Campaign Info */}
                <div className="col-span-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <Image
                        src={donation.organizationLogo}
                        alt={donation.organizationName}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {donation.campaignTitle}
                      </div>
                      <div className="text-sm text-gray-500">
                        {donation.organizationName}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="col-span-2">
                  <div className="text-sm text-gray-900">
                    {donation.date.toLocaleDateString()}
                  </div>
                </div>

                {/* Amount */}
                <div className="col-span-2">
                  <div className="text-sm font-medium text-gray-900">
                    ${donation.amount.toLocaleString()}
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(donation.status)}`}>
                    {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center space-x-3">
                  <Link
                    href={`/donations/${donation.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                  {donation.receiptUrl && (
                    <a
                      href={donation.receiptUrl}
                      download
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Download className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}