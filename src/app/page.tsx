import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react'; // Add this import

interface TrendingCampaign {
  id: string;
  title: string;
  image: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  donorsCount: number;
  daysLeft: number;
}

export default function Home() {
  // Sample trending campaigns data
  const trendingCampaigns: TrendingCampaign[] = [
    {
      id: "1",
      title: "School Building Project",
      image: "/campaigns/education.jpg",
      description: "Help us build a new school for  children...",
      currentAmount: 25000,
      targetAmount: 50000,
      donorsCount: 150,
      daysLeft: 15
    },
    {
      id: "2",
      title: "Medical Equipment Fund",
      image: "/campaigns/medical.jpg",
      description: "Support our hospital with new medical equipment...",
      currentAmount: 35000,
      targetAmount: 40000,
      donorsCount: 220,
      daysLeft: 10
    },
    {
      id: "3",
      title: "Clean Water Initiative",
      image: "/campaigns/water.jpg",
      description: "Provide clean water access to rural communities...",
      currentAmount: 15000,
      targetAmount: 30000,
      donorsCount: 180,
      daysLeft: 20
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative bg-blue-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Make a Difference Today
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              Join our community of donors and support causes that matter. Every donation counts towards creating positive change.
            </p>
            <Link
              href="/auth/register"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Campaigns Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Trending Campaigns</h2>
            <Link 
              href="/categories"
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              View all
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {campaign.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {campaign.description}
                  </p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">${campaign.currentAmount.toLocaleString()}</span>
                      <span className="text-gray-500">of ${campaign.targetAmount.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full" 
                        style={{ width: `${(campaign.currentAmount / campaign.targetAmount) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{campaign.donorsCount} donors</span>
                    <span>{campaign.daysLeft} days left</span>
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
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">$1M+</div>
              <div className="text-gray-600">Total Donations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Active Campaigns</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">10K+</div>
              <div className="text-gray-600">Donors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Campaigns</h2>
            <p className="text-gray-600 mt-2">Support these urgent causes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Campaign Cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-video bg-gray-100" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Campaign Title {i}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Brief description of the campaign and its impact...
                  </p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">$25,000</span>
                      <span className="text-gray-500">of $50,000</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-blue-600 rounded-full w-1/2" />
                    </div>
                  </div>
                  <a
                    href={`/donations/${i}`}
                    className="block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Donate Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
            <p className="text-gray-600 mt-2">Find causes that matter to you</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Medical', 'Education', 'Environment', 'Disaster Relief'].map((category) => (
              <a
                key={category}
                href={`/donations?category=${category.toLowerCase()}`}
                className="p-6 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium text-gray-900">{category}</h3>
                <p className="text-sm text-gray-600 mt-1">View campaigns</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of donors who are creating positive change in the world.
          </p>
          <Link
            href="/auth/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}