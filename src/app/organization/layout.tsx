"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Building,
  LayoutDashboard, 
  Heart, 
  UserCircle, 
  Settings, 
  LogOut,
  Bell,
  TrendingUp
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/organization",
    icon: LayoutDashboard
  },
  {
    name: "Donations",
    href: "/organization/donations",
    icon: Heart
  },
  {
    name: "Profile",
    href: "/organization/profile",
    icon: UserCircle
  },
  {
    name: "Settings",
    href: "/organization/settings",
    icon: Settings
  }
];

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            {/* Logo and Org Name */}
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Organization Dashboard</span>
            </div>
            
            {/* Right side nav items */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              </button>
              
              {/* Organization Profile */}
              <div className="flex items-center space-x-3">
                <div className="flex flex-col text-right">
                  <span className="text-sm font-medium text-gray-900">Health Care Foundation</span>
                  <span className="text-xs text-gray-500">Organization Account</span>
                </div>
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src="/organization-logo.jpg"
                    alt="Organization Logo"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-4rem)] fixed">
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Quick Stats */}
          <div className="mt-8 px-4">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <div className="ml-3">
                    <p className="text-xs font-medium text-gray-500">Total Donations</p>
                    <p className="text-sm font-semibold">$125,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="absolute bottom-0 w-full p-4">
            <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}