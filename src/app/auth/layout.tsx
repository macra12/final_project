"use client";

import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
}

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

const Testimonial = ({ quote, name, role, initials }: TestimonialProps) => (
  <div className="space-y-4">
    <blockquote className="text-lg italic text-blue-100">
      {quote}
    </blockquote>
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
        <span className="text-xl font-semibold">{initials}</span>
      </div>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-blue-200">{role}</p>
      </div>
    </div>
  </div>
);

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:w-1/2">
        <div className="w-full">
          {children}
        </div>
      </div>

      {/* Right Side - Image and Info */}
      <div className="hidden lg:flex lg:w-1/2 lg:flex-col lg:justify-between bg-blue-600 p-12 text-white">
        {/* Top section with logo and heading */}
        <div className="space-y-8">
          <div className="w-40">
            <Image
              src="/logos/logo-white.svg"
              width={160}
              height={48}
              alt="Company Logo"
              className="w-full"
              priority
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Make a Difference Today
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              Join our community of donors and organizations working together to create positive change.
            </p>
          </div>
        </div>

        {/* Center Illustration */}
        <div className="relative h-96 my-8">
          <Image
            src="/images/auth-illustration.svg"
            alt="Donation Platform Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Bottom Testimonial */}
        <Testimonial
          quote="This platform has made it incredibly easy for us to reach out and help those in need. The transparency and ease of use are remarkable."
          name="John Doe"
          role="Regular Donor"
          initials="JD"
        />
      </div>
    </div>
  );
}