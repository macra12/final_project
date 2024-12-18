"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Building,
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Edit2, 
  Save,
  Upload,
  DollarSign,
  Users,
  TrendingUp
} from "lucide-react";

interface OrganizationProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  description: string;
  logo: string;
  foundedYear: number;
  registrationNumber: string;
}

export default function OrganizationProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState("/organization-logo.jpg");
  
  const [profile, setProfile] = useState<OrganizationProfile>({
    name: "Health Care Foundation",
    email: "contact@healthcarefoundation.org",
    phone: "+1 234 567 890",
    address: "123 Healthcare Street, Medical District, City",
    website: "www.healthcarefoundation.org",
    description: "A non-profit organization dedicated to providing healthcare services to underserved communities.",
    logo: "/organization-logo.jpg",
    foundedYear: 2010,
    registrationNumber: "ORG123456789"
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
    // Add your API call here
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Organization Profile</h1>
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Donations</p>
              <p className="text-2xl font-semibold text-gray-900">$125,000</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Donors</p>
              <p className="text-2xl font-semibold text-gray-900">1,234</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Profile Section */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Profile Header with Logo */}
        <div className="p-6 border-b">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-lg overflow-hidden">
                <Image
                  src={profileImage}
                  alt="Organization Logo"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
                  <Upload className="h-4 w-4 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="text-2xl font-bold text-gray-900 border-b border-gray-300 focus:border-blue-500 focus:ring-0 w-full"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Registered since {profile.foundedYear} • Reg. No: {profile.registrationNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="flex-1 border-b border-gray-300 focus:border-blue-500 focus:ring-0"
                    />
                  ) : (
                    <span className="text-gray-600">{profile.email}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="flex-1 border-b border-gray-300 focus:border-blue-500 focus:ring-0"
                    />
                  ) : (
                    <span className="text-gray-600">{profile.phone}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="url"
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      className="flex-1 border-b border-gray-300 focus:border-blue-500 focus:ring-0"
                    />
                  ) : (
                    <a href={profile.website} className="text-blue-600 hover:underline">{profile.website}</a>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      className="flex-1 border-b border-gray-300 focus:border-blue-500 focus:ring-0"
                    />
                  ) : (
                    <span className="text-gray-600">{profile.address}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Organization Description */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">About Organization</h3>
              {isEditing ? (
                <textarea
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  rows={4}
                  className="w-full border rounded-lg focus:border-blue-500 focus:ring-0"
                />
              ) : (
                <p className="text-gray-600">{profile.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}