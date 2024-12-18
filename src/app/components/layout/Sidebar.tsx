"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  ChevronLeft,
  LayoutDashboard,
  Heart,
  History,
  Calendar,
  Settings,
  Users,
  Building,
  Tags,
  LogOut,
  ChevronDown,
  PieChart,
  Clock,
} from "lucide-react";

interface SidebarProps {
  user: {
    name: string;
    role: 'admin' | 'organization' | 'user';
    image?: string;
  };
  onLogout: () => void;
}

export function Sidebar({ user, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getNavigationItems = () => {
    const commonItems = [
      { label: "Settings", icon: Settings, href: "/settings" }
    ];

    const roleBasedItems = {
      admin: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
        { label: "Categories", icon: Tags, href: "/admin/categories" },
        { label: "Organizations", icon: Building, href: "/admin/organizations" },
      ],
      organization: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/organization" },
        { label: "Donations", icon: Heart, href: "/organization/donations" },
        { label: "Analytics", icon: PieChart, href: "/organization/analytics" },
        { label: "Profile", icon: Building, href: "/organization/profile" },
      ],
      user: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { label: "Donations", icon: Heart, href: "/donations" },
        { label: "History", icon: History, href: "/profile/history" },
        { label: "Schedule", icon: Calendar, href: "/profile/schedule" },
      ],
    };

    return [...roleBasedItems[user.role], ...commonItems];
  };

  const navigationItems = getNavigationItems();

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } min-h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col`}
    >
      {/* Sidebar Header */}
      <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
        {!isCollapsed && (
          <Link href="/">
            <Image
              src="/logos/main-logo.svg"
              alt="Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ChevronLeft
            className={`h-5 w-5 text-gray-500 transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center ${
                isCollapsed ? "justify-center" : ""
              } px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-gray-200 p-4">
        <div className={`flex ${isCollapsed ? "justify-center" : "items-center"}`}>
          {isCollapsed ? (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <Users className="h-5 w-5 text-gray-500" />
            </div>
          ) : (
            <>
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <Users className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </div>
                <div className="text-sm text-gray-500 truncate capitalize">
                  {user.role}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className={`mt-4 flex items-center w-full px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
}