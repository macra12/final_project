"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  Edit2, 
  Camera,
  Save,
  Heart,
  Clock,
  History,
  User as UserIcon
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinedDate: Date;
  totalDonations: number;
  activeDonations: number;
  donationStats: {
    total: number;
    monthly: number;
    campaigns: number;
  };
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("/default-avatar.jpg");
  
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    avatar: "/default-avatar.jpg",
    joinedDate: new Date("2024-01-01"),
    totalDonations: 12,
    activeDonations: 3,
    donationStats: {
      total: 2500,
      monthly: 200,
      campaigns: 8
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    // Implement save functionality
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
                    <Camera className="h-4 w-4 text-white" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              {/* Basic Info */}
              <div className="ml-6">
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="text-xl font-bold text-gray-900 border-b border-gray-300 focus:border-blue-500 focus:ring-0"
                  />
                ) : (
                  <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Member since {profile.joinedDate.toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="text-gray-900 border-b border-gray-300 focus:border-blue-500 focus:ring-0"
                    />
                  ) : (
                    <span className="text-gray-900">{profile.email}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="text-gray-900 border-b border-gray-300 focus:border-blue-500 focus:ring-0"
                    />
                  ) : (
                    <span className="text-gray-900">{profile.phone}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats and Quick Links */}
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900">Donation Overview</h3>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Total Donated</span>
                <span className="text-lg font-semibold">${profile.donationStats.total}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Monthly Donation</span>
                <span className="text-lg font-semibold">${profile.donationStats.monthly}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Campaigns Supported</span>
                <span className="text-lg font-semibold">{profile.donationStats.campaigns}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link 
                href="/profile/history" 
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <History className="h-5 w-5 mr-3" />
                Donation History
              </Link>
              <Link 
                href="/profile/schedule" 
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <Clock className="h-5 w-5 mr-3" />
                Scheduled Donations
              </Link>
              <Link 
                href="/donations" 
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <Heart className="h-5 w-5 mr-3" />
                Find Campaigns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}