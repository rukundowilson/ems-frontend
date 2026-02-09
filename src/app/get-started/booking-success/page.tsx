'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, Mail, Calendar, Clock } from 'lucide-react';

export default function BookingSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!bookingId) {
      router.push('/get-started/book');
      return;
    }

    const pending = localStorage.getItem('pending_booking');
    if (pending) {
      try {
        const data = JSON.parse(pending);
        setBooking(data);
      } catch (e) {
        // ignore
      }
    }

    setLoading(false);
  }, [bookingId, router]);

  if (loading || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 mx-auto">
            <Check className="w-10 h-10 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Booking Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your appointment has been successfully booked. A confirmation email has been sent to you.
          </p>

          {/* Booking Details */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 mb-8 text-left">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Booking Details</h2>

            <div className="space-y-5">
              {/* Service */}
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg flex-shrink-0">
                  <span className="text-purple-600 font-bold">📋</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Service</p>
                  <p className="text-lg font-semibold text-gray-900">{booking.service}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {booking.dayName}, {booking.dayDate}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg flex-shrink-0">
                  <Clock className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="text-lg font-semibold text-gray-900">{booking.time}</p>
                </div>
              </div>

              {/* Confirmation Number */}
              <div className="flex items-start gap-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg flex-shrink-0">
                  <span className="text-green-600 font-bold">#</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Confirmation Number</p>
                  <p className="text-lg font-mono font-semibold text-gray-900">{bookingId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-8 text-left">
            <h3 className="text-lg font-bold text-gray-900 mb-4">What's Next?</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-600 rounded-full text-sm font-bold flex-shrink-0">
                  1
                </div>
                <p className="text-gray-700">Check your email for the appointment confirmation</p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-600 rounded-full text-sm font-bold flex-shrink-0">
                  2
                </div>
                <p className="text-gray-700">Arrive 10 minutes early for your appointment</p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center justify-center w-6 h-6 bg-purple-100 text-purple-600 rounded-full text-sm font-bold flex-shrink-0">
                  3
                </div>
                <p className="text-gray-700">Bring a valid ID and insurance card if applicable</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link
              href="/get-started"
              className="block w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold py-3 rounded-lg text-center hover:from-purple-700 hover:to-purple-900 transition-all shadow-lg"
            >
              Back to Home
            </Link>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = 'mailto:?subject=My%20Appointment%20Confirmation';
                }
              }}
              className="block w-full bg-white border-2 border-purple-600 text-purple-600 font-bold py-3 rounded-lg text-center hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Send Confirmation Email
            </button>
          </div>

          {/* Footer */}
          <p className="text-sm text-gray-600 mt-8">
            Have questions?{' '}
            <Link href="/contact" className="text-purple-600 hover:text-purple-700 font-semibold">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
