// src/app/categories/education/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { BookOpen, Users, GraduationCap, Heart } from "lucide-react";

async function getEducationCampaigns() {
  return [
    {
      id: "1",
      title: "Build a Rural School Library",
      description: "Help us create a library that will serve 500+ students in rural communities, providing access to books and digital learning resources.",
      image: "/api/placeholder/800/600",
      currentAmount: 35000,
      targetAmount: 50000,
      donorsCount: 245,
      daysLeft: 30,
      organization: {
        name: "Education For All",
        logo: "/api/placeholder/64/64",
        isVerified: true
      }
    },
    {
      id: "2",
      title: "Digital Learning Initiative",
      description: "Provide tablets and internet access to underprivileged students to ensure they can participate in online learning.",
      image: "/api/placeholder/800/600",
      currentAmount: 28000,
      targetAmount: 40000,
      donorsCount: 180,
      daysLeft: 25,
      organization: {
        name: "Digital Education Fund",
        logo: "/api/placeholder/64/64",
        isVerified: true
      }
    },
    {
      id: "3",
      title: "Teacher Training Program",
      description: "Support professional development for teachers in low-income areas to improve education quality.",
      image: "/api/placeholder/800/600",
      currentAmount: 42000,
      targetAmount: 60000,
      donorsCount: 310,
      daysLeft: 40,
      organization: {
        name: "Teacher Excellence Initiative",
        logo: "/api/placeholder/64/64",
        isVerified: true
      }
    }
  ];
}

export default async function EducationCategoryPage() {
  const campaigns = await getEducationCampaigns();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-700 text-white">
        <div className="relative h-[400px]">
          <Image
            src="/api/placeholder/1920/400"
            alt="Education Category"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600/90" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center">
                  <BookOpen className="mr-4 h-12 w-12" />
                  Education Campaigns
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Support educational initiatives that transform lives through learning. 
                  From building schools to providing supplies, every contribution helps 
                  create brighter futures.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-blue-100">Students Helped</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                    <div className="text-2xl font-bold">25+</div>
                    <div className="text-blue-100">Active Projects</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                    <div className="text-2xl font-bold">$1M+</div>
                    <div className="text-blue-100">Raised</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Together with our donors, we're making education accessible to all
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-blue-50">
              <GraduationCap className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Schools Built</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-blue-50">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
              <div className="text-gray-600">Students Supported</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-blue-50">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100K+</div>
              <div className="text-gray-600">Books Provided</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-blue-50">
              <Heart className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">5K+</div>
              <div className="text-gray-600">Donors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Active Campaigns</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                      src={campaign.organization.logo}
                      alt={campaign.organization.name}
                      fill
                      className="rounded-full"
                      sizes="32px"
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {campaign.organization.name}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
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
                  <div>{campaign.daysLeft} days left</div>
                </div>

                <Link
                  href={`/donations/${campaign.id}`}
                  className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Your contribution can help provide quality education to those who need it most.
            Join our community of donors making education accessible to all.
          </p>
          <Link
            href="/auth/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Start Donating
          </Link>
        </div>
      </div>
    </div>
  );
}