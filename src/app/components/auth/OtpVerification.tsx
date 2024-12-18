"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle, RefreshCcw } from 'lucide-react';

interface OtpVerificationProps {
  phoneNumber: string;
  onVerify: (otp: string) => Promise<void>;
  onResendOtp: () => Promise<void>;
  isLoading?: boolean;
}

export function OtpVerification({
  phoneNumber,
  onVerify,
  onResendOtp,
  isLoading = false
}: OtpVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Move to next input if value is entered
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 4) {
      setError('Please enter all digits');
      return;
    }

    try {
      await onVerify(otpString);
    } catch (error) {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0 || isResending) return;

    setIsResending(true);
    try {
      await onResendOtp();
      setResendTimer(30);
      setOtp(['', '', '', '']);
      setError('');
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        <h2 className="mt-6 text-2xl font-bold text-gray-900">Verify Your Phone</h2>
        <p className="mt-2 text-sm text-gray-600">
          We've sent a verification code to {phoneNumber}
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="flex justify-center space-x-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-14 h-14 text-center text-2xl font-semibold border ${
                error ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              disabled={isLoading}
            />
          ))}
        </div>

        {error && (
          <p className="text-center text-sm text-red-600">{error}</p>
        )}

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading || otp.includes('')}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Verifying...
              </>
            ) : (
              'Verify OTP'
            )}
          </button>

          <button
            onClick={handleResendOtp}
            disabled={resendTimer > 0 || isResending}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {resendTimer > 0 ? (
              `Resend OTP in ${resendTimer}s`
            ) : isResending ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCcw className="h-5 w-5 mr-2" />
                Resend OTP
              </>
            )}
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-gray-600">
        Didn't receive the code? Check your spam folder or try again.
      </p>
    </div>
  );
}