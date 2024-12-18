"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar,
  Clock,
  Edit2,
  Trash2,
  PauseCircle,
  PlayCircle,
  AlertCircle,
  ChevronRight
} from "lucide-react";

interface ScheduledDonation {
  id: string;
  campaignTitle: string;
  organizationName: string;
  organizationLogo: string;
  amount: number;
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  nextPayment: Date;
  status: 'active' | 'paused';
  startDate: Date;
  totalDonated: number;
  paymentMethod: string;
}

export default function ScheduleDonationsPage() {
  const [scheduledDonations] = useState<ScheduledDonation[]>([
    {
      id: "1",
      campaignTitle: "Children's Education Fund",
      organizationName: "Education First",
      organizationLogo: "/org-logo.jpg",
      amount: 50,
      frequency: "monthly",
      nextPayment: new Date("2024-04-15"),
      status: "active",
      startDate: new Date("2024-01-15"),
      totalDonated: 150,
      paymentMethod: "Visa ending in 4242"
    },
    // Add more sample scheduled donations
  ]);

  const handlePauseResume = (donationId: string) => {
    // Implement pause/resume logic
    console.log("Toggle pause for donation:", donationId);
  };

  const handleEdit = (donationId: string) => {
    // Implement edit logic
    console.log("Edit donation:", donationId);
  };

  const handleDelete = (donationId: string) => {
    if (window.confirm("Are you sure you want to cancel this scheduled donation?")) {
      // Implement delete logic
      console.log("Delete donation:", donationId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scheduled Donations</h1>
          <p className="text-gray-600">Manage your recurring donations</p>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">About Scheduled Donations</h3>
            <p className="mt-1 text-sm text-blue-600">
              Your scheduled donations help organizations plan for the future. You can pause, resume, or cancel these donations at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Scheduled Donations List */}
      <div className="space-y-4">
        {scheduledDonations.map((donation) => (
          <div 
            key={donation.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                {/* Organization Info */}
                <div className="flex items-center">
                  <Image
                    src={donation.organizationLogo}
                    alt={donation.organizationName}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {donation.campaignTitle}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {donation.organizationName}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  donation.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                </span>
              </div>

              {/* Donation Details */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-gray-500">Amount</div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">
                    ${donation.amount} <span className="text-sm font-normal text-gray-500">/ {donation.frequency}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Next Payment</div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">
                    {donation.nextPayment.toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Donated</div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">
                    ${donation.totalDonated}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6 text-sm text-gray-500">
                Payment Method: {donation.paymentMethod}
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-end space-x-3">
                <button
                  onClick={() => handlePauseResume(donation.id)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  {donation.status === 'active' ? (
                    <>
                      <PauseCircle className="h-4 w-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Resume
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleEdit(donation.id)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(donation.id)}
                  className="inline-flex items-center px-3 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {scheduledDonations.length === 0 && (
        <div className="text-center py-12">
          <Clock className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No scheduled donations</h3>
          <p className="mt-1 text-sm text-gray-500">
            Start making a difference by setting up a recurring donation.
          </p>
          <div className="mt-6">
            <Link
              href="/donations"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Campaigns
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}