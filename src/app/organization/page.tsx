// src/app/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Heart, 
  ArrowRight, 
  Users, 
  Globe, 
  TrendingUp,
  Shield 
} from "lucide-react";

interface TrendingCampaign {
  id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  donorsCount: number;
  daysLeft: number;
  organization: {
    name: string;
    logo: string;
    isVerified: boolean;
  };
}

export default function HomePage() {
  // Sample trending campaigns
  const trendingCampaigns: TrendingCampaign[] = [
    {
      id: "1",
      title: "Help Build Clean Water Wells",
      image: "/campaigns/water.jpg",
      category: "Environment",
      description: "Provide clean water access to rural communities in need...",
      currentAmount: 35000,
      targetAmount: 50000,
      donorsCount: 235,
      daysLeft: 15,
      organization: {
        name: "Clean Water Initiative",
        logo: "/organizations/water-org.jpg",
        isVerified: true
      }
    },
    // Add more campaigns...
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Make a Difference Today
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join our community of changemakers and support causes that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donations"
              className="px-8 py-4 bg-blue-600 rounded-full font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
            >
              <Heart className="mr-2 h-5 w-5" />
              Start Donating
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-medium hover:bg-white/20 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats with Animation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-4xl font-bold text-blue-600 mb-2">$2.5M+</div>
              <div className="text-gray-600">Total Donations</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Active Campaigns</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-4xl font-bold text-purple-600 mb-2">15K+</div>
              <div className="text-gray-600">Global Donors</div>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Causes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Causes</h2>
            <p className="text-gray-600 mt-2">Support these urgent campaigns making a real impact</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingCampaigns.map((campaign) => (
              <div 
                key={campaign.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-video">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 rounded-full text-sm font-medium">
                      {campaign.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Image
                      src={campaign.organization.logo}
                      alt={campaign.organization.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {campaign.organization.name}
                    </span>
                    {campaign.organization.isVerified && (
                      <Shield className="h-4 w-4 ml-1 text-blue-500" />
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {campaign.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {campaign.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">
                          ${campaign.currentAmount.toLocaleString()}
                        </span>
                        <span className="text-gray-500">
                          of ${campaign.targetAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${(campaign.currentAmount / campaign.targetAmount) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{campaign.donorsCount} donors</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                  </div>

                  <Link
                    href={`/donations/${campaign.id}`}
                    className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Donate Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 bg-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/patterns/pattern-1.svg"
            alt="Background pattern"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our community of donors and start making a difference today.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center px-8 py-3 border-2 border-white rounded-full text-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}