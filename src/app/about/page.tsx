// src/app/about/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Heart, Globe, Users, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Making a Difference Together
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            A transparent and secure platform connecting generous donors with verified organizations
            to create meaningful impact in communities worldwide.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                We believe in creating a world where giving is easy, transparent, and impactful. 
                Our platform connects donors with verified organizations, ensuring that every 
                contribution makes a real difference in people's lives.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-blue-600 mt-1 mr-3" />
                  <p className="text-gray-600">
                    100% verified organizations with thorough background checks
                  </p>
                </div>
                <div className="flex items-start">
                  <Globe className="h-6 w-6 text-blue-600 mt-1 mr-3" />
                  <p className="text-gray-600">
                    Supporting causes across multiple categories worldwide
                  </p>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-blue-600 mt-1 mr-3" />
                  <p className="text-gray-600">
                    Building a community of donors and organizations working together
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/about/mission.jpg"
                alt="Making a difference"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Organizations</h3>
              <p className="text-gray-600">
                Thorough verification process ensuring all organizations are legitimate and trustworthy.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Donations</h3>
              <p className="text-gray-600">
                Simple and secure donation process with multiple payment options and scheduled giving.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Impact</h3>
              <p className="text-gray-600">
                Support causes worldwide with real-time tracking of your donation's impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our community of donors and organizations working together to create positive change.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/donations"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Browse Causes
            </Link>
            <Link
              href="/auth/register"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}