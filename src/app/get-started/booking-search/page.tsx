'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Search, AlertCircle, CheckCircle, Copy } from 'lucide-react';
import Header from '@/app/components/Header';
import api from '@/app/shared/services/axios';

interface BookingInfo {
  _id: string;
  doctorId: string;
  patientId?: string;
  service: string;
  date: string;
  time: string;
  patientEmail?: string;
  patientName?: string;
  patientPhone?: string;
  paymentMethod?: string;
  amount?: number;
  status: string;
  createdAt: string;
}

// Convert number to words
const numberToWords = (num: number): string => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const scales = ['', 'Thousand', 'Million', 'Billion'];

  if (num === 0) return 'Zero';
  let result = '';
  let scaleIndex = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      let chunkWords = '';
      const hundreds = Math.floor(chunk / 100);
      const remainder = chunk % 100;
      const ten = Math.floor(remainder / 10);
      const one = remainder % 10;

      if (hundreds > 0) chunkWords += ones[hundreds] + ' Hundred ';
      if (remainder >= 10 && remainder < 20) chunkWords += teens[remainder - 10];
      else {
        if (ten > 0) chunkWords += tens[ten];
        if (one > 0) chunkWords += ' ' + ones[one];
      }

      chunkWords += ' ' + scales[scaleIndex];
      result = chunkWords.trim() + ' ' + result;
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return result.trim();
};

export default function BookingSearchPage() {
  const [searchId, setSearchId] = useState('');
  const [booking, setBooking] = useState<BookingInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchId.trim()) {
      setError('Please enter a booking ID');
      return;
    }

    setLoading(true);
    setError('');
    setBooking(null);
    setSearched(true);

    try {
      const response = await api.get(`/bookings/${searchId.trim()}`);
      setBooking(response.data.data || response.data);
    } catch (err) {
      const errorMessage = (err as Error).message;
      if (errorMessage.includes('Booking not found')) {
        setError(
          'Appointment not found with this ID. Please verify the ID is correct and check your confirmation email or receipt.'
        );
      } else if (errorMessage.includes('Network') || errorMessage.includes('Failed')) {
        setError('Unable to connect to the server. Please check your internet connection and try again.');
      } else {
        setError(errorMessage || 'Failed to fetch booking. Please check the ID and try again.');
      }
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
        <Header/>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Find Your appointment</h1>
          <p className="text-gray-600 mt-2">Enter your appointment ID to view all details about your appointment</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-md p-8 mb-8">
          <form onSubmit={handleSearch}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter your booking ID (e.g., 507f1f77bcf86cd799439011)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-300 hover:to-purple-900'
                }`}
              >
                <Search className="w-5 h-5" />
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900">Search Error</h3>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Booking Details as Receipt */}
        {booking && (
          <div className="space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900">Appointment Found</h3>
                  <p className="text-green-700 mt-1">Here is your appointment receipt and details</p>
                </div>
              </div>
            </div>

            {/* Receipt */}
            <div className="bg-white rounded-sm p-8 shadow-lg ">
              {/* Receipt Header */}
              <div className="flex items-center justify-between border-b pb-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-md flex items-center justify-center text-white font-bold text-xl">EMS</div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">EMS Clinic</div>
                    <div className="text-xs text-gray-600">Healthcare Services</div>
                    <div className="text-xs text-gray-500">Phone: +250 790080450</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">APPOINTMENT RECEIPT</div>
                  <div className="text-xs text-gray-500">Date: {new Date().toLocaleDateString()}</div>
                  <div className="text-xs text-gray-500">Appointment ID: {booking._id}</div>
                </div>
              </div>

              {/* Patient & Amount */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-xs text-gray-600 font-semibold mb-1">RECEIVED WITH THANKS FROM</p>
                  <div className="font-semibold text-gray-900">{booking.patientName || 'Patient'}</div>
                  <div className="text-xs text-gray-600 mt-3">Email: {booking.patientEmail || '—'}</div>
                  <div className="text-xs text-gray-600">Phone: {booking.patientPhone || '—'}</div>
                </div>

                <div>
                  <p className="text-xs text-gray-600 font-semibold mb-1">AMOUNT</p>
                  <div className="text-2xl font-bold text-gray-900">{booking.amount || 2000} FRW</div>
                  <div className={`inline-block px-3 py-1 rounded-full font-semibold text-xs mt-2 ${
                    booking.status.toLowerCase() === 'confirmed' ? 'bg-green-100 text-green-800' :
                    booking.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status.toLowerCase() === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </div>
                </div>
              </div>

              {/* Service & Appointment Details */}
              <div className="grid grid-cols-2 gap-6 mb-6 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-xs text-gray-600 font-semibold mb-2">SERVICE DESCRIPTION</p>
                  <div className="text-sm text-gray-800">
                    <div className="font-semibold">Appointment Fees</div>
                    <div className="text-xs mt-1">Service: {booking.service || '—'}</div>
                    <div className="text-xs">Doctor: {booking.doctorId || '—'}</div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-600 font-semibold mb-2">APPOINTMENT DETAILS</p>
                  <div className="text-xs text-gray-700 space-y-1">
                    <div>Date: {new Date(booking.date).toLocaleDateString()}</div>
                    <div>Time: {booking.time || '—'}</div>
                    <div className="mt-2">ID: {booking._id}</div>
                  </div>
                </div>
              </div>

              {/* Amount In Words */}
              <div className="border-t pt-4 mt-8 mb-6">
                <p className="text-xs text-gray-600 font-semibold mb-2">AMOUNT IN WORDS</p>
                <div className="text-sm text-gray-800 font-semibold">{numberToWords(booking.amount || 2000)} Rwandan Francs</div>
              </div>

              {/* Payment & Footer */}
              <div className="mb-6 text-xs text-gray-600">
                <span>Payment Method: {booking.paymentMethod || 'Not specified'}</span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <div className="text-xs text-gray-500">Receipt Date: {new Date(booking.createdAt).toLocaleString()}</div>
                <div className="text-center">
                  <div className="text-xs text-gray-600">Authorized Signature</div>
                  <div className="mt-6 h-8 w-40 border-b"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {searched && !booking && !loading && (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No booking found with the provided ID</p>
            <p className="text-gray-400 mt-2">Please double-check the ID and try again</p>
          </div>
        )}

        {/* Initial State */}
        {!searched && (
          <div className="bg-white p-12 text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <p className="text-gray-700 text-lg font-semibold mb-2">Find Your Appointment</p>
            <p className="text-gray-500 mb-6">Enter your appointment ID to view all booking details</p>
            <div className="px-6 max-w-md mx-auto">
              <p className="text-sm text-blue-900 text-left font-semibold mb-2">
                Where to find your ID:
              </p>
              <ul className="text-sm  text-left list-disc list-inside space-y-1">
                <li>In your confirmation email</li>
                <li>On your receipt from the booking-success page</li>
                <li>It looks like: <code className="bg-blue-100 px-2 py-1 rounded text-xs">507f1f77bcf86cd799439011</code></li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <br />
    </div>
  );
}
