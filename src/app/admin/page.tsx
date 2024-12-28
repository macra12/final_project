// src/app/admin/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Building,
  ArrowUpRight,
  AlertCircle,
  Calendar,
  BarChart
} from "lucide-react";

interface DashboardStats {
  totalDonations: number;
  totalOrganizations: number;
  activeOrganizations: number;
  pendingVerifications: number;
  monthlyDonations: number;
  totalUsers: number;
}

interface RecentActivity {
  id: string;
  type: 'donation' | 'organization' | 'verification';
  title: string;
  amount?: number;
  organization?: string;
  date: Date;
  status: 'completed' | 'pending' | 'rejected';
}

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  
  // Sample data - replace with API calls
  const stats: DashboardStats = {
    totalDonations: 125000,
    totalOrganizations: 50,
    activeOrganizations: 45,
    pendingVerifications: 5,
    monthlyDonations: 15000,
    totalUsers: 1200
  };

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      type: "donation",
      title: "New donation received",
      amount: 1000,
      organization: "Health Care Foundation",
      date: new Date(),
      status: "completed"
    },
    // Add more activities
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of platform statistics and activities</p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as 'weekly' | 'monthly' | 'yearly')}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Donations</p>
              <p className="text-2xl font-bold text-gray-900">${stats.totalDonations.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">12%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Organizations</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeOrganizations}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Building className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-500">
              {stats.pendingVerifications} pending verifications
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">8%</span>
            <span className="text-gray-500 ml-1">new users this month</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Link
          href="/admin/organizations"
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
        >
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Verify Organizations</h3>
              <p className="text-sm text-gray-500">{stats.pendingVerifications} pending</p>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-gray-400" />
        </Link>

        <Link
          href="/admin/categories"
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
        >
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <BarChart className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Manage Categories</h3>
              <p className="text-sm text-gray-500">View and edit categories</p>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-gray-400" />
        </Link>

        <Link
          href="/admin/reports"
          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
        >
          <div className="flex items-center">
            <div className="bg-purple-100 p-2 rounded-lg mr-3">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium">Monthly Reports</h3>
              <p className="text-sm text-gray-500">View detailed analytics</p>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 text-gray-400" />
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start justify-between border-b pb-4">
              <div className="flex items-start">
                <div className={`p-2 rounded-lg mr-3 ${
                  activity.type === 'donation' ? 'bg-blue-100' :
                  activity.type === 'organization' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {activity.type === 'donation' ? (
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  ) : activity.type === 'organization' ? (
                    <Building className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <div className="text-sm text-gray-500">
                    {activity.organization && `${activity.organization} • `}
                    {activity.date.toLocaleDateString()}
                  </div>
                </div>
              </div>
              {activity.amount && (
                <div className="text-right">
                  <span className="font-medium text-gray-900">
                    ${activity.amount.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}