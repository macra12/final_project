"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  ChevronDown,
  MoreVertical,
  Check,
  X,
  Eye
} from "lucide-react";

interface Organization {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  logo: string;
  joinedDate: Date;
  totalDonations: number;
  verificationDocuments?: string[];
}

interface OrganizationTableProps {
  organizations: Organization[];
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
  onView: (id: string) => void;
  isLoading?: boolean;
}

export function OrganizationTable({
  organizations,
  onApprove,
  onReject,
  onView,
  isLoading = false,
}: OrganizationTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Organization;
    direction: 'asc' | 'desc';
  }>({
    key: 'joinedDate',
    direction: 'desc'
  });

  // Filter organizations
  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || org.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort organizations
  const sortedOrganizations = [...filteredOrganizations].sort((a, b) => {
    if (sortConfig.key === 'totalDonations') {
      return sortConfig.direction === 'asc' 
        ? a.totalDonations - b.totalDonations
        : b.totalDonations - a.totalDonations;
    }
    return sortConfig.direction === 'asc'
      ? a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
      : b[sortConfig.key] > a[sortConfig.key] ? 1 : -1;
  });

  const handleSort = (key: keyof Organization) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: {
        icon: AlertCircle,
        class: "bg-yellow-100 text-yellow-800",
      },
      approved: {
        icon: CheckCircle,
        class: "bg-green-100 text-green-800",
      },
      rejected: {
        icon: XCircle,
        class: "bg-red-100 text-red-800",
      },
    };

    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.class}`}>
        <Icon className="w-4 h-4 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Table Controls */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Organization
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('joinedDate')}
              >
                <div className="flex items-center">
                  Joined Date
                  <ChevronDown className="ml-1 h-4 w-4" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('totalDonations')}
              >
                <div className="flex items-center">
                  Total Donations
                  <ChevronDown className="ml-1 h-4 w-4" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedOrganizations.map((org) => (
              <tr key={org.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 relative">
                      <Image
                        src={org.logo}
                        alt={org.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{org.name}</div>
                      <div className="text-sm text-gray-500">{org.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {org.joinedDate.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(org.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${org.totalDonations.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end items-center space-x-2">
                    <button
                      onClick={() => onView(org.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    {org.status === 'pending' && (
                      <>
                        <button
                          onClick={() => onApprove(org.id)}
                          className="text-green-600 hover:text-green-700"
                          disabled={isLoading}
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => onReject(org.id)}
                          className="text-red-600 hover:text-red-700"
                          disabled={isLoading}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}