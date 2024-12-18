"use client";

import { useState } from "react";
import { DollarSign, CreditCard, Calendar, Clock, CheckCircle } from "lucide-react";

interface DonationFormProps {
  campaignId: string;
  minimumAmount?: number;
  onSubmit: (data: {
    amount: number;
    frequency: 'one-time' | 'monthly' | 'quarterly' | 'yearly';
    paymentMethod: string;
    isAnonymous: boolean;
  }) => Promise<void>;
  isLoading?: boolean;
}

export function DonationForm({
  campaignId,
  minimumAmount = 5,
  onSubmit,
  isLoading = false
}: DonationFormProps) {
  const [amount, setAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState(false);
  const [frequency, setFrequency] = useState<'one-time' | 'monthly' | 'quarterly' | 'yearly'>('one-time');
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [error, setError] = useState<string>("");

  const predefinedAmounts = [10, 25, 50, 100];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const donationAmount = Number(amount);
    if (isNaN(donationAmount) || donationAmount < minimumAmount) {
      setError(`Minimum donation amount is $${minimumAmount}`);
      return;
    }

    try {
      await onSubmit({
        amount: donationAmount,
        frequency,
        paymentMethod,
        isAnonymous
      });
    } catch (error) {
      setError("Failed to process donation. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Amount Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Amount
        </label>
        {!customAmount && (
          <div className="grid grid-cols-2 gap-2 mb-3">
            {predefinedAmounts.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(preset.toString())}
                className={`px-4 py-2 rounded-lg border ${
                  amount === preset.toString()
                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                    : 'border-gray-300 hover:border-blue-600'
                }`}
              >
                ${preset}
              </button>
            ))}
          </div>
        )}

        {customAmount ? (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              min={minimumAmount}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setCustomAmount(true)}
            className="w-full text-sm text-blue-600 hover:text-blue-500"
          >
            Enter custom amount
          </button>
        )}
      </div>

      {/* Donation Frequency */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Donation Frequency
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'one-time', label: 'One Time' },
            { value: 'monthly', label: 'Monthly' },
            { value: 'quarterly', label: 'Quarterly' },
            { value: 'yearly', label: 'Yearly' }
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFrequency(option.value as typeof frequency)}
              className={`px-4 py-2 rounded-lg border ${
                frequency === option.value
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-300 hover:border-blue-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Method
        </label>
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="card" className="ml-3 flex items-center">
              <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
              Credit/Debit Card
            </label>
          </div>
          {/* Add more payment methods as needed */}
        </div>
      </div>

      {/* Anonymous Donation */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="anonymous"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
          Make donation anonymous
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!amount || isLoading}
        className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Clock className="animate-spin h-5 w-5 mr-2" />
            Processing...
          </>
        ) : (
          <>
            <CheckCircle className="h-5 w-5 mr-2" />
            Donate ${amount || '0'}
            {frequency !== 'one-time' && ` ${frequency}`}
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By donating, you agree to our terms of service and privacy policy.
      </p>
    </form>
  );
}