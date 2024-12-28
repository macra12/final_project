"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { 
  Building, 
  Calendar, 
  Clock, 
  Share2, 
  Heart,
  DollarSign,
  Users,
  BadgeCheck,
  X
} from "lucide-react";
import { useRouter } from "next/navigation";

interface DonationData {
  id: string;
  title: string;
  description: string;
  organization: {
    name: string;
    isVerified: boolean;
    logo: string;
  };
  category: string;
  targetAmount: number;
  currentAmount: number;
  donorsCount: number;
  daysLeft: number;
  image: string;
  updates: Array<{
    date: string;
    content: string;
  }>;
}

interface DonationContentProps {
  donation: DonationData;
}

export default function DonationContent({ donation }: DonationContentProps) {
  const router = useRouter();
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const predefinedAmounts = [10, 25, 50, 100];

  const getProgressPercentage = useCallback(() => {
    return Math.min((donation.currentAmount / donation.targetAmount) * 100, 100);
  }, [donation.currentAmount, donation.targetAmount]);

  const handleShareCampaign = async () => {
    try {
      await navigator.share({
        title: donation.title,
        text: donation.description,
        url: window.location.href,
      });
    } catch (error) {
      // If Web Share API is not supported or user cancels
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const validateDonationAmount = (amount: string): boolean => {
    const numAmount = Number(amount);
    if (isNaN(numAmount)) return false;
    if (numAmount <= 0) return false;
    if (numAmount > 1000000) return false; // Prevent unreasonably large donations
    return true;
  };

  const handleDonate = async () => {
    try {
      setError(null);
      if (!donationAmount) {
        setError("Please enter a donation amount");
        return;
      }

      if (!validateDonationAmount(donationAmount)) {
        setError("Please enter a valid donation amount");
        return;
      }

      setIsProcessing(true);

      // Here you would typically make an API call to your payment processor
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      // Redirect to checkout or payment page
      router.push(`/checkout?donation=${donation.id}&amount=${donationAmount}`);
    } catch (err) {
      setError("An error occurred while processing your donation. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCustomAmountChange = (value: string) => {
    // Remove any non-numeric characters except decimal point
    const sanitizedValue = value.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = sanitizedValue.split('.');
    if (parts.length > 2) return;
    if (parts[1]?.length > 2) return;

    setDonationAmount(sanitizedValue);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Campaign Image */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden">
            <Image
              src={donation.image}
              alt={donation.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Organization Info */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src={donation.organization.logo}
                  alt={donation.organization.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-900">
                    {donation.organization.name}
                  </h3>
                  {donation.organization.isVerified && (
                    <BadgeCheck 
                      className="ml-1 h-5 w-5 text-blue-500" 
                      aria-label="Verified Organization"
                    />
                  )}
                </div>
                <p className="text-sm text-gray-500">Verified Organization</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={handleShareCampaign}
              className="text-blue-600 hover:text-blue-700 transition-colors p-2 rounded-full hover:bg-blue-50"
              aria-label="Share campaign"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Campaign Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {donation.title}
            </h1>
            <p className="text-gray-600 mb-6">{donation.description}</p>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Campaign Updates
              </h2>
              {donation.updates.map((update, index) => (
                <div 
                  key={index} 
                  className="border-l-4 border-blue-500 pl-4"
                >
                  <time 
                    dateTime={update.date} 
                    className="text-sm text-gray-500"
                  >
                    {new Date(update.date).toLocaleDateString()}
                  </time>
                  <p className="text-gray-600">{update.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Donation Side Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">
                  ${donation.currentAmount.toLocaleString()}
                </span>
                <span className="text-gray-500">
                  raised of ${donation.targetAmount.toLocaleString()}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-2 bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage()}%` }}
                  role="progressbar"
                  aria-valuenow={getProgressPercentage()}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {donation.donorsCount}
                </div>
                <div className="text-sm text-gray-500">Donors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {getProgressPercentage()}%
                </div>
                <div className="text-sm text-gray-500">Funded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {donation.daysLeft}
                </div>
                <div className="text-sm text-gray-500">Days Left</div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center justify-between">
                <span className="text-sm">{error}</span>
                <button 
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Donation Amount Selection */}
            <div className="space-y-4">
              {!customAmount && (
                <div className="grid grid-cols-2 gap-2">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount.toString())}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        donationAmount === amount.toString()
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-blue-600'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              )}

              {customAmount ? (
                <div className="space-y-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={donationAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter amount"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomAmount(false);
                      setDonationAmount("");
                    }}
                    className="w-full text-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Choose preset amount
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setCustomAmount(true)}
                  className="w-full text-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Enter custom amount
                </button>
              )}

              <button
                type="button"
                onClick={handleDonate}
                disabled={!donationAmount || isProcessing}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Processing...
                  </div>
                ) : (
                  <>
                    <Heart className="h-5 w-5 mr-2" />
                    Donate Now
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}