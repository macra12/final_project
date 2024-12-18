"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Eye, 
  Search,
  Filter,
  MoreVertical,
  Check,
  X
} from "lucide-react";

interface Organization {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  contactPerson: string;
  joinedDate: Date;
  totalDonations: number;
  logo?: string;
}

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: "1",
      name: "Health Care Foundation",
      email: "contact@hcf.org",
      phone: "+1234567890",
      status: "approved",
      contactPerson: "John Doe",
      joinedDate: new Date("2024-01-15"),
      totalDonations: 15000,
      logo: "/placeholder.png"
    },
    {
      id: "2",
      name: "Education First",
      email: "info@educationfirst.org",
      phone: "+1234567891",
      status: "pending",
      contactPerson: "Jane Smith",
      joinedDate: new Date("2024-02-20"),
      totalDonations: 0,
      logo: "/placeholder.png"
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleStatusChange = async (orgId: string, newStatus: 'approved' | 'rejected') => {
    if (window.confirm(`Are you sure you want to ${newStatus} this organization?`)) {
      setOrganizations(organizations.map(org => 
        org.id === orgId ? { ...org, status: newStatus } : org
      ));
    }
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
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Organizations Management</h1>
        <p className="text-gray-600">Verify and manage organization accounts</p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search organizations..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sm:w-48">
          <select
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Organizations Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Organization
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Donations
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {organizations.map((org) => (
              <tr key={org.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <Image
                        src={org.logo || "/placeholder.png"}
                        alt={org.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{org.name}</div>
                      <div className="text-sm text-gray-500">{org.contactPerson}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{org.email}</div>
                  <div className="text-sm text-gray-500">{org.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(org.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {org.joinedDate.toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${org.totalDonations.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {org.status === 'pending' && (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleStatusChange(org.id, 'approved')}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleStatusChange(org.id, 'rejected')}
                        className="text-red-600 hover:text-red-900"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                  <button className="text-blue-600 hover:text-blue-900">
                    <Eye className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}