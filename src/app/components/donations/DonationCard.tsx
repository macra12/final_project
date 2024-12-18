"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CalendarDays, Users } from "lucide-react";

interface DonationCardProps {
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
}

export function DonationCard({
  id,
  title,
  description,
  image,
  organization,
  targetAmount,
  currentAmount,
  donorsCount,
  daysLeft,
  category,
}: DonationCardProps) {
  const getProgressPercentage = () => {
    return Math.min((currentAmount / targetAmount) * 100, 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-video">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Organization Info */}
        <div className="flex items-center mb-3">
          <div className="relative h-8 w-8">
            <Image
              src={organization.logo}
              alt={organization.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="ml-2 flex items-center">
            <span className="text-sm font-medium text-gray-900">
              {organization.name}
            </span>
            {organization.isVerified && (
              <BadgeCheck className="ml-1 h-4 w-4 text-blue-500" />
            )}
          </div>
        </div>

        {/* Title and Description */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-semibold text-gray-900">
              ${currentAmount.toLocaleString()}
            </span>
            <span className="text-gray-500">
              of ${targetAmount.toLocaleString()}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {donorsCount} donors
          </div>
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1" />
            {daysLeft} days left
          </div>
        </div>

        {/* Action Button */}
        <Link 
          href={`/donations/${id}`}
          className="block w-full text-center py-2 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Donate Now
        </Link>
      </div>
    </div>
  );
}