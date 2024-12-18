"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Phone } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [isOtpSent, setIsOtpSent] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    otp: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log('Form submitted:', formData);
  };

  const handleSendOTP = async () => {
    // Add your OTP sending logic here
    setIsOtpSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Image
            src="/logos/main-logo.svg"
            width={150}
            height={50}
            alt="Logo"
            className="mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to continue
          </p>
        </div>

        {/* Login Method Toggle */}
        <div className="flex rounded-lg border p-1 space-x-1">
          <button
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

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {loginMethod === 'email' ? (
            <>
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
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
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {!isOtpSent ? (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => {
                          const otp = formData.otp.split('');
                          otp[index] = e.target.value;
                          setFormData({ ...formData, otp: otp.join('') });
                          if (e.target.value && e.target.nextSibling) {
                            (e.target.nextSibling as HTMLInputElement).focus();
                          }
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    Didn't receive code? <button type="button" onClick={handleSendOTP} className="text-blue-600">Resend</button>
                  </p>
                </div>
              )}
            </div>
          )}

          <button
            type={isOtpSent ? 'submit' : 'button'}
            onClick={!isOtpSent && loginMethod === 'phone' ? handleSendOTP : undefined}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loginMethod === 'email' ? (
              'Sign in'
            ) : (
              isOtpSent ? 'Verify OTP' : 'Send OTP'
            )}
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Image
                src="/icons/google.svg"
                width={20}
                height={20}
                alt="Google"
                className="mr-2"
              />
              Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Image
                src="/icons/facebook.svg"
                width={20}
                height={20}
                alt="Facebook"
                className="mr-2"
              />
              Facebook
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}