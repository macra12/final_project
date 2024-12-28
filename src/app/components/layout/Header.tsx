// src/app/components/layout/Header.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, LogIn, Menu, X, ChevronDown, Heart } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { 
      label: 'Categories', 
      href: '/categories',
      children: [
        { label: 'Medical', href: '/categories/medical' },
        { label: 'Education', href: '/categories/education' },
        { label: 'Environment', href: '/categories/environment' },
        { label: 'Disaster Relief', href: '/categories/disaster-relief' },
      ]
    },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b backdrop-blur-lg bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logos/main-logo.svg" 
              alt="Logo" 
              width={40} 
              height={40}
              className="w-auto h-10"
            />
            <span className="text-xl font-bold text-gray-900">GiveHope</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link 
                  href={item.href}
                  className="inline-flex items-center text-gray-700 hover:text-blue-600 font-medium"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform" />
                  )}
                </Link>

                {item.children && (
                  <div className="absolute top-full left-0 w-48 py-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search campaigns..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {/* CTA Buttons */}
            <Link 
              href="/donations" 
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
            >
              <Heart className="h-4 w-4 mr-2" />
              Donate Now
            </Link>
            <Link 
              href="/auth/login"
              className="inline-flex items-center px-4 py-2 border-2 border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link 
                href="/donations"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-4 w-4 mr-2" />
                Donate Now
              </Link>
              <Link 
                href="/auth/login"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}