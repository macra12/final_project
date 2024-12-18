export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Make a Difference Today
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Support causes you care about and join a community of givers making positive change in the world.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/donations"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Donate Now
              </a>
              <a
                href="/about"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
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
          <a
            href="/auth/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}