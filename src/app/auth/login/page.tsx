"use client";

import { useState, type ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Phone, Eye, EyeOff, ArrowLeft } from "lucide-react";

interface FormData {
  email: string;
  password: string;
  phone: string;
  otp: string[];
}

const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    phone: '',
    otp: Array(4).fill('')
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOtpChange = (index: number, value: string) => {
    setFormData(prev => {
      const newOtp = [...prev.otp];
      newOtp[index] = value;
      return { ...prev, otp: newOtp };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Add your authentication logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!formData.phone) return;
    setIsLoading(true);
    try {
      // Add your OTP sending logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setIsOtpSent(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <div className="bg-white p-8 rounded-2xl shadow-sm space-y-8">
            <div className="text-center">
              <Image
                src="/logos/main-logo.svg"
                width={48}
                height={48}
                alt="Logo"
                className="mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              <p className="mt-2 text-sm text-gray-600">
                Please sign in to your account
              </p>
            </div>

            <div className="flex p-1 bg-gray-100 rounded-lg">
              {['email', 'phone'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setLoginMethod(method as 'email' | 'phone')}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                    loginMethod === method
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Image
                  src="/icons/google.svg"
                  width={20}
                  height={20}
                  alt="Google"
                  className="mr-2"
                />
                Continue with Google
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Image
                  src="/icons/facebook.svg"
                  width={20}
                  height={20}
                  alt="Facebook"
                  className="mr-2"
                />
                Continue with Facebook
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {loginMethod === 'email' ? (
                <>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <Link href="/auth/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      Forgot password?
                    </Link>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  {!isOtpSent ? (
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Enter OTP
                      </label>
                      <div className="flex justify-center gap-3">
                        {formData.otp.map((digit, index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            className="w-14 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value.match(/^[0-9]?$/)) {
                                handleOtpChange(index, value);
                                if (value && e.target.nextElementSibling instanceof HTMLInputElement) {
                                  e.target.nextElementSibling.focus();
                                }
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Backspace' && !digit && index > 0) {
                                const prevInput = e.target.previousElementSibling as HTMLInputElement;
                                if (prevInput) {
                                  prevInput.focus();
                                }
                              }
                            }}
                            disabled={isLoading}
                          />
                        ))}
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={handleSendOTP}
                          className="text-sm font-medium text-blue-600 hover:text-blue-500"
                          disabled={isLoading}
                        >
                          Resend OTP
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <LoadingSpinner />
                ) : loginMethod === 'email' ? (
                  'Sign in'
                ) : isOtpSent ? (
                  'Verify OTP'
                ) : (
                  'Send OTP'
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/images/auth-bg.jpg"
          alt="Login background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-600/90 flex items-center justify-center">
          <div className="max-w-md text-white p-8">
            <h2 className="text-3xl font-bold mb-4">Make a Difference Today</h2>
            <p className="text-blue-100">
              Join our community of donors and support causes that matter. Every donation counts towards creating positive change.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}