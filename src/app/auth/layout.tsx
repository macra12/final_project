"use client";

import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        {children}
      </div>

      {/* Right Side - Image and Info */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-between bg-blue-600 p-12 text-white">
        {/* Top section with logo */}
        <div>
          <Image
            src="/logos/logo-white.svg"
            width={120}
            height={40}
            alt="Logo"
            className="mb-8"
          />
          <h1 className="text-4xl font-bold mb-4">
            Make a Difference Today
          </h1>
          <p className="text-lg text-blue-100">
            Join our community of donors and organizations working together to create positive change.
          </p>
        </div>

        {/* Center Image */}
        <div className="relative h-96">
          <Image
            src="/images/auth-illustration.svg"
            alt="Donation Illustration"
            fill
            className="object-contain"
          />
        </div>

        {/* Bottom section with testimonial */}
        <div className="space-y-4">
          <blockquote className="text-lg italic text-blue-100">
            "This platform has made it incredibly easy for us to reach out and help those in need. The transparency and ease of use are remarkable."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-xl font-semibold">JD</span>
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-blue-200">Regular Donor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}