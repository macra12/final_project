// src/app/categories/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ArrowRight, Users, Heart } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  activeCampaigns: number;
  totalRaised: number;
  donors: number;
  featuredCampaigns: {
    id: string;
    title: string;
    image: string;
    currentAmount: number;
    targetAmount: number;
  }[];
}

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample categories data - replace with API call
  const categories: Category[] = [
    {
      id: "1",
      name: "Medical",
      description: "Support healthcare initiatives and medical treatments",
      image: "/categories/medical.jpg",
      activeCampaigns: 25,
      totalRaised: 500000,
      donors: 1200,
      featuredCampaigns: [
        {
          id: "1",
          title: "Children's Hospital Equipment",
          image: "/campaigns/medical-1.jpg",
          currentAmount: 25000,
          targetAmount: 50000
        }
      ]
    },
    {
      id: "2",
      name: "Education",
      description: "Help provide quality education to those in need",
      image: "/categories/education.jpg",
      activeCampaigns: 30,
      totalRaised: 750000,
      donors: 1500,
      featuredCampaigns: [
        {
          id: "2",
          title: "School Building Project",
          image: "/campaigns/education-1.jpg",
          currentAmount: 35000,
          targetAmount: 60000
        }
      ]
    },
    {
      id: "3",
      name: "Education",
      description: "Help provide quality education to those in need",
      image: "/categories/education.jpg",
      activeCampaigns: 30,
      totalRaised: 750000,
      donors: 1500,
      featuredCampaigns: [
        {
          id: "3",
          title: "School Building Project",
          image: "/campaigns/education-1.jpg",
          currentAmount: 35000,
          targetAmount: 60000
        }
      ]
    },
    {
      id: "4",
      name: "Education",
      description: "Help provide quality education to those in need",
      image: "/categories/education.jpg",
      activeCampaigns: 30,
      totalRaised: 750000,
      donors: 1500,
      featuredCampaigns: [
        {
          id: "4",
          title: "School Building Project",
          image: "/campaigns/education-1.jpg",
          currentAmount: 35000,
          targetAmount: 60000
        }
      ]
    },
    {
      id: "5",
      name: "Education",
      description: "Help provide quality education to those in need",
      image: "/categories/education.jpg",
      activeCampaigns: 30,
      totalRaised: 750000,
      donors: 1500,
      featuredCampaigns: [
        {
          id: "5",
          title: "School Building Project",
          image: "/campaigns/education-1.jpg",
          currentAmount: 35000,
          targetAmount: 60000
        }
      ]
    },
    {
      id: "6",
      name: "Education",
      description: "Help provide quality education to those in need",
      image: "/categories/education.jpg",
      activeCampaigns: 30,
      totalRaised: 750000,
      donors: 1500,
      featuredCampaigns: [
        {
          id: "6",
          title: "School Building Project",
          image: "/campaigns/education-1.jpg",
          currentAmount: 35000,
          targetAmount: 60000
        }
      ]
    },
    {
      id: "7",
      name: "Education",
      description: "Help provide quality education to those in need",
      image: "/categories/education.jpg",
      activeCampaigns: 30,
      totalRaised: 750000,
      donors: 1500,
      featuredCampaigns: [
        {
          id: "7",
          title: "School Building Project",
          image: "/campaigns/education-1.jpg",
          currentAmount: 35000,
          targetAmount: 60000
        }
      ]
    },
    {
      id: "8",
      name: "Education",
      description: "Help provide quality education to those in need",
      image: "/categories/education.jpg",
      activeCampaigns: 30,
      totalRaised: 750000,
      donors: 1500,
      featuredCampaigns: [
        {
          id: "8",
          title: "School Building Project",
          image: "/campaigns/education-1.jpg",
          currentAmount: 35000,
          targetAmount: 60000
        }
      ]
    },
    {
      id: "9",
      name: "Education",
      description: "Help provide quality education to those in need",
      image: "/categories/education.jpg",
      activeCampaigns: 30,
      totalRaised: 750000,
      donors: 1500,
      featuredCampaigns: [
        {
          id: "9",
          title: "School Building Project",
          image: "/campaigns/education-1.jpg",
          currentAmount: 35000,
          targetAmount: 60000
        }
      ]
    },
    

  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Donation Categories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore different causes and find the ones that matter most to you
          </p>
        </div>

        {/* Search */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Category Image */}
              <div className="relative h-48">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Category Info */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h2>
                <p className="text-gray-600 mb-4">{category.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      ${(category.totalRaised / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-gray-500">Raised</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      {category.activeCampaigns}
                    </div>
                    <div className="text-sm text-gray-500">Campaigns</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      {category.donors}
                    </div>
                    <div className="text-sm text-gray-500">Donors</div>
                  </div>
                </div>

                {/* Featured Campaign */}
                {category.featuredCampaigns[0] && (
                  <div className="border-t pt-4 mb-4">
                    <div className="text-sm font-medium text-gray-500 mb-2">Featured Campaign</div>
                    <div className="flex items-center space-x-3">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={category.featuredCampaigns[0].image}
                          alt={category.featuredCampaigns[0].title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {category.featuredCampaigns[0].title}
                        </h3>
                        <div className="mt-1 h-1.5 bg-gray-100 rounded-full">
                          <div
                            className="h-1.5 bg-blue-600 rounded-full"
                            style={{
                              width: `${(category.featuredCampaigns[0].currentAmount / category.featuredCampaigns[0].targetAmount) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <Link
                  href={`/donations?category=${category.name.toLowerCase()}`}
                  className="flex items-center justify-center w-full px-4 py-2 border border-blue-600 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  View Campaigns
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}