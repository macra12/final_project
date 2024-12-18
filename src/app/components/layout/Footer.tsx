"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Mail, Phone, Globe } from "lucide-react";

export function Footer() {
  const navigationLinks = {
    forDonors: [
      { label: "Browse Donations", href: "/donations" },
      { label: "Schedule Donations", href: "/profile/schedule" },
      { label: "Donation History", href: "/profile/history" },
      { label: "How It Works", href: "/how-it-works" },
    ],
    forOrganizations: [
      { label: "Create Campaign", href: "/organization/donations/create" },
      { label: "Manage Donations", href: "/organization/donations" },
      { label: "Organization Dashboard", href: "/organization" },
      { label: "Verification Process", href: "/organization/verification" },
    ],
    support: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  };

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="/logos/main-logo.svg"
                alt="Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-600">
              Making a difference through transparent and effective donations.
            </p>
            <div className="space-y-2">
              <a
                href="mailto:contact@example.com"
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <Mail className="h-4 w-4 mr-2" />
                contact@example.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <Phone className="h-4 w-4 mr-2" />
                +1 (234) 567-890
              </a>
            </div>
          </div>

          {/* For Donors */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">For Donors</h3>
            <ul className="space-y-3">
              {navigationLinks.forDonors.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Organizations */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">For Organizations</h3>
            <ul className="space-y-3">
              {navigationLinks.forOrganizations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              {navigationLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Start Donating CTA */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Ready to Make a Difference?
            </h3>
            <p className="text-gray-600 mb-4">
              Join thousands of donors supporting meaningful causes
            </p>
            <Link
              href="/donations"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <Heart className="h-5 w-5 mr-2" />
              Start Donating
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Your Company Name. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Globe className="h-6 w-6" />
              </a>
              {/* Add more social media links as needed */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}