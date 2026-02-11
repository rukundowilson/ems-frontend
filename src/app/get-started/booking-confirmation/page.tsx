'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, CreditCard, Wallet, DollarSign } from 'lucide-react';
import Header from '@/app/components/Header';

interface BookingData {
  doctorId: string;
  service: string;
  serviceSlug: string;
  date: string;
  time: string;
  dayName: string;
  dayDate: number;
}

const PAYMENT_METHODS = [
  {
    id: 'MTN Mobile Money',
    name: 'MTN Mobile Money',
    icon: CreditCard,
    description: 'Mobile payment through MTN network',
  },
  {
    id: 'debit-card',
    name: 'Debit Card',
    icon: CreditCard,
    description: 'Direct from your bank account',
  }
];

const PRICE = 150; // Default appointment price

export default function BookingConfirmationPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('credit-card');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const pending = localStorage.getItem('pending_booking');
    if (!pending) {
      router.push('/get-started/book');
      return;
    }

    try {
      const data = JSON.parse(pending);
      setBooking(data);
      setLoading(false);
    } catch (e) {
      router.push('/get-started/book');
    }
  }, [router]);

  const handleConfirmBooking = async () => {
    if (!booking) return;

    // Store booking with selected payment method
    const bookingWithPayment = {
      ...booking,
      paymentMethod: selectedPayment,
    };

    localStorage.setItem('pending_booking', JSON.stringify(bookingWithPayment));
    router.push('/get-started/booking-details');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!booking) {
    return null;
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50">
=======
    <div className="min-h-screen bg-gray-100">
>>>>>>> main
        <Header/>
      <div className="max-w-6xl mx-auto my-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Booking Review</h1>
          <p className="text-gray-600 mt-2">Confirm your appointment details and choose a payment method</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Review */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Appointment Details</h2>

              {/* Service Info */}
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Service</p>
                  <p className="text-lg font-semibold text-gray-900">{booking.service}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {booking.dayName}, {booking.dayDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Time</p>
                    <p className="text-lg font-semibold text-gray-900">{booking.time}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm text-gray-600 mb-2">Doctor ID</p>
                  <p className="text-gray-700">{booking.doctorId}</p>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white shadow-sm p-8 mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>

              <div className="space-y-4">
                {PAYMENT_METHODS.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <label
                      key={method.id}
                      className="flex items-center p-4 border-2 cursor-pointer transition-all hover:border-purple-300"
                      style={{
                        borderColor: selectedPayment === method.id ? '#9333ea' : '#e5e7eb',
                        backgroundColor: selectedPayment === method.id ? '#faf5ff' : 'white',
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="w-4 h-4 accent-purple-600"
                      />
                      <IconComponent className="w-6 h-6 text-purple-600 mx-4" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{method.name}</p>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm p-8 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Service</span>
                  <span className="font-semibold">${PRICE.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${PRICE.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleConfirmBooking}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 py-3 rounded-lg font-bold text-white transition-all"
              >
                Proceed to Payment
              </button>

              <p className="text-xs text-gray-600 text-center mt-4">
                By confirming, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD
=======
      <br />
>>>>>>> main
    </div>
  );
}
