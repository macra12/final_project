"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Phone, Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  onSubmit: (data: {
    email?: string;
    password?: string;
    phone?: string;
    otp?: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    otp: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    phone: '',
    otp: ''
  });

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      phone: '',
      otp: ''
    };

    if (loginMethod === 'email') {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
    } else {
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      }

      if (isOtpSent && !formData.otp) {
        newErrors.otp = 'OTP is required';
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSendOTP = async () => {
    if (!formData.phone) {
      setErrors({ ...errors, phone: 'Phone number is required' });
      return;
    }
    // Add OTP sending logic here
    setIsOtpSent(true);
  };

  return (
    <div className="w-full max-w-md">
      {/* Login Method Toggle */}
      <div className="flex rounded-lg border p-1 mb-6">
        <button
          type="button"
          onClick={() => setLoginMethod('email')}
          className={`flex-1 py-2 rounded-md text-sm font-medium ${
            loginMethod === 'email'
              ? 'bg-blue-600 text-white'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => setLoginMethod('phone')}
          className={`flex-1 py-2 rounded-md text-sm font-medium ${
            loginMethod === 'phone'
              ? 'bg-blue-600 text-white'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Phone
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {loginMethod === 'email' ? (
          <>
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

            {/* Password Input */}
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
          </>
        ) : (
          <>
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
                  disabled={isLoading || isOtpSent}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* OTP Input */}
            {isOtpSent && (
              <div>
                <div className="flex gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg focus:ring-blue-500 focus:border-blue-500"
                      value={formData.otp[index] || ''}
                      onChange={(e) => {
                        const otp = formData.otp.split('');
                        otp[index] = e.target.value;
                        setFormData({ ...formData, otp: otp.join('') });
                        if (e.target.value && e.target.nextSibling) {
                          (e.target.nextSibling as HTMLInputElement).focus();
                        }
                      }}
                      disabled={isLoading}
                    />
                  ))}
                </div>
                {errors.otp && (
                  <p className="mt-1 text-sm text-red-600">{errors.otp}</p>
                )}
              </div>
            )}
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : loginMethod === 'email' ? 'Sign In' : isOtpSent ? 'Verify OTP' : 'Send OTP'}
        </button>

        {/* Links */}
        <div className="flex items-center justify-between text-sm">
          <Link 
            href="/auth/forgot-password" 
            className="text-blue-600 hover:text-blue-500"
          >
            Forgot password?
          </Link>
          <Link 
            href="/auth/register" 
            className="text-blue-600 hover:text-blue-500"
          >
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
}