"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Building, 
  Eye, 
  EyeOff,
  FileText 
} from "lucide-react";

interface RegisterFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: 'user' | 'organization';
    organizationName?: string;
    organizationDescription?: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

export function RegisterForm({ onSubmit, isLoading = false }: RegisterFormProps) {
  const router = useRouter();
  const [role, setRole] = useState<'user' | 'organization'>('user');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    organizationName: '',
    organizationDescription: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    organizationName: '',
    organizationDescription: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      organizationName: '',
      organizationDescription: '',
    };

    // Required fields validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (role === 'organization') {
      if (!formData.organizationName.trim()) {
        newErrors.organizationName = 'Organization name is required';
      }
      if (!formData.organizationDescription.trim()) {
        newErrors.organizationDescription = 'Organization description is required';
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role,
        ...(role === 'organization' && {
          organizationName: formData.organizationName,
          organizationDescription: formData.organizationDescription,
        }),
      });
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Role Selection */}
      <div className="flex rounded-lg border p-1 mb-6">
        <button
          type="button"
          onClick={() => setRole('user')}
          className={`flex-1 py-2 rounded-md text-sm font-medium ${
            role === 'user'
              ? 'bg-blue-600 text-white'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Individual
        </button>
        <button
          type="button"
          onClick={() => setRole('organization')}
          className={`flex-1 py-2 rounded-md text-sm font-medium ${
            role === 'organization'
              ? 'bg-blue-600 text-white'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Organization
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={role === 'organization' ? "Contact Person Name" : "Full Name"}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              disabled={isLoading}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone Input */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`block w-full pl-10 pr-3 py-2 border ${
                errors.phone ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
              disabled={isLoading}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Organization Fields */}
        {role === 'organization' && (
          <>
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Organization Name"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.organizationName ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                  disabled={isLoading}
                />
              </div>
              {errors.organizationName && (
                <p className="mt-1 text-sm text-red-600">{errors.organizationName}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  placeholder="Organization Description"
                  value={formData.organizationDescription}
                  onChange={(e) => setFormData({ ...formData, organizationDescription: e.target.value })}
                  rows={3}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.organizationDescription ? 'border-red-300' : 'border-gray-300'
                  } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                  disabled={isLoading}
                />
              </div>
              {errors.organizationDescription && (
                <p className="mt-1 text-sm text-red-600">{errors.organizationDescription}</p>
              )}
            </div>
          </>
        )}

        {/* Password Inputs */}
        <div className="space-y-4">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`block w-full pl-10 pr-10 py-2 border ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`block w-full pl-10 pr-10 py-2 border ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                } rounded-lg focus:ring-blue-500 focus:border-blue-500`}
                disabled={isLoading}
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        {/* Login Link */}
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}