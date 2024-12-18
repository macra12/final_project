"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, 
  Search, 
  Filter,
  MoreVertical, 
  ArrowUpRight,
  Calendar,
  DollarSign
} from "lucide-react";

interface Donation {
  id: string;
  title: string;
  category: string;
  targetAmount: number;
  currentAmount: number;
  status: 'active' | 'completed' | 'expired';
  startDate: Date;
  endDate: Date;
  donorsCount: number;
  image?: string;
}

export default function OrganizationDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: "1",
      title: "Medical Equipment for Children's Hospital",
      category: "Medical",
      targetAmount: 50000,
      currentAmount: 35000,
      status: 'active',
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-06-30"),
      donorsCount: 145,
      image: "/sample-donation.jpg"
    },
    // Add more sample donations as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      expired: "bg-gray-100 text-gray-800"
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusClasses[status as keyof typeof statusClasses]
      }`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donation Campaigns</h1>
          <p className="text-gray-600">Manage your organization's donation campaigns</p>
        </div>
        <Link
          href="/organization/donations/create"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full p-2">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Raised</p>
              <p className="text-lg font-semibold text-gray-900">$123,456</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-2">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-lg font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-purple-100 rounded-full p-2">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Donors</p>
              <p className="text-lg font-semibold text-gray-900">1,234</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
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
        <div className="sm:w-48">
          <select
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Donations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donations.map((donation) => (
          <div key={donation.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Campaign Image */}
            <div className="relative h-48">
              <Image
                src={donation.image || "/placeholder.jpg"}
                alt={donation.title}
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Campaign Info */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {donation.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{donation.category}</p>
                </div>
                {getStatusBadge(donation.status)}
              </div>

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
                <div>{new Date(donation.endDate).toLocaleDateString()}</div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-end space-x-2">
                <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50">
                  View Details
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}