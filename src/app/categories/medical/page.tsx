// src/app/categories/medical/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Heart, Users, Calendar } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  currentAmount: number;
  targetAmount: number;
  donorsCount: number;
  daysLeft: number;
  organizationName: string;
  organizationLogo: string;
}

async function getMedicalCampaigns(): Promise<Campaign[]> {
  // In a real app, this would fetch from your API
  return [
    {
      id: "1",
      title: "Children's Hospital Equipment Fund",
      description: "Help us provide essential medical equipment for the pediatric ward. Your support will directly impact the quality of care we can provide to children in need.",
      image: "/api/placeholder/800/600",
      currentAmount: 25000,
      targetAmount: 50000,
      donorsCount: 150,
      daysLeft: 30,
      organizationName: "City Children's Hospital",
      organizationLogo: "/api/placeholder/64/64"
    },
    {
      id: "2",
      title: "Emergency Medical Support",
      description: "Support our emergency response team with vital medical supplies and equipment to help those in critical need.",
      image: "/api/placeholder/800/600",
      currentAmount: 35000,
      targetAmount: 60000,
      donorsCount: 200,
      daysLeft: 15,
      organizationName: "Emergency Medical Services",
      organizationLogo: "/api/placeholder/64/64"
    },
    {
      id: "3",
      title: "Rural Healthcare Initiative",
      description: "Bringing essential healthcare services to underserved rural communities through mobile medical units.",
      image: "/api/placeholder/800/600",
      currentAmount: 45000,
      targetAmount: 75000,
      donorsCount: 300,
      daysLeft: 45,
      organizationName: "Rural Health Foundation",
      organizationLogo: "/api/placeholder/64/64"
    }
  ];
}

export default async function MedicalCategoryPage() {
  const campaigns = await getMedicalCampaigns();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white">
        <div className="relative h-64 md:h-80">
          <Image
            src="/api/placeholder/1920/400"
            alt="Medical Category"
            fill
            className="object-cover opacity-30"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-blue-600/60" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Medical Campaigns
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Support healthcare initiatives and help provide medical treatment to those in need.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">$500K+</div>
              <div className="text-gray-600 mt-1">Total Raised</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">25+</div>
              <div className="text-gray-600 mt-1">Active Campaigns</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">1.2K+</div>
              <div className="text-gray-600 mt-1">Donors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Active Medical Campaigns</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={campaign.image}
                  alt={campaign.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-8 h-8">
                    <Image
                      src={campaign.organizationLogo}
                      alt={campaign.organizationName}
                      fill
                      className="rounded-full"
                      sizes="32px"
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {campaign.organizationName}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {campaign.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {campaign.description}
                </p>

                <div className="mb-4">
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
                      className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min((campaign.currentAmount / campaign.targetAmount) * 100, 100)}%`
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {campaign.donorsCount} donors
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {campaign.daysLeft} days left
                  </div>
                </div>

                <Link
                  href={`/donations/${campaign.id}`}
                  className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Donate Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Hospitals Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Healthcare Partners</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <Image
                    src={`/api/placeholder/96/96`}
                    alt={`Partner ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="96px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}