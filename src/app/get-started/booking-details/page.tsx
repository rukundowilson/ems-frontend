'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';
import Header from '@/app/components/Header';

interface BookingData {
  doctorId: string;
  service: string;
  serviceSlug: string;
  date: string;
  time: string;
  dayName: string;
  dayDate: number;
  paymentMethod: string;
}

const PRICE = 150;

export default function BookingDetailsPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

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

      // Pre-fill with user data if logged in
      const userData = localStorage.getItem('user_data');
      if (userData) {
        const user = JSON.parse(userData);
        setFormData((prev) => ({
          ...prev,
          email: user.email || '',
          phone: user.phone || '',
        }));
      }

      setLoading(false);
    } catch (e) {
      router.push('/get-started/book');
    }
  }, [router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (booking?.paymentMethod === 'credit-card' || booking?.paymentMethod === 'debit-card') {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }

      if (!formData.cardName.trim()) {
        newErrors.cardName = 'Cardholder name is required';
      }

      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Use MM/YY format';
      }

      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (formData.cvv.length < 3 || formData.cvv.length > 4) {
        newErrors.cvv = 'CVV must be 3-4 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      // Format card number with spaces every 4 digits
      const cleaned = value.replace(/\s/g, '').slice(0, 16);
      const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else if (name === 'expiryDate') {
      // Format expiry date as MM/YY
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      const formatted = cleaned.length >= 2 ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}` : cleaned;
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else if (name === 'cvv') {
      // Only digits for CVV
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      setFormData((prev) => ({ ...prev, [name]: cleaned }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !booking) return;

    setSubmitting(true);

    try {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user_data');
      const user = userData ? JSON.parse(userData) : null;

      const bookingPayload = {
        doctorId: booking.doctorId,
        service: booking.service,
        date: booking.date,
        time: booking.time,
        paymentMethod: booking.paymentMethod,
        amount: PRICE,
        patientEmail: formData.email,
        patientPhone: formData.phone,
        ...(user && {
          patientId: user._id || user.id,
          patientName: user.name,
        }),
      };

      // Add card info if card payment
      if (booking.paymentMethod === 'credit-card' || booking.paymentMethod === 'debit-card') {
        Object.assign(bookingPayload, {
          cardNumber: formData.cardNumber.replace(/\s/g, '').slice(-4), // Only store last 4 digits
          cardName: formData.cardName,
          expiryDate: formData.expiryDate,
        });
      }

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('http://localhost:4000/api/bookings', {
        method: 'POST',
        headers,
        body: JSON.stringify(bookingPayload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create booking');
      }

      const result = await response.json();

      // Store booking success data for receipt
      const successData = {
        appointmentId: result.data._id,
        service: booking.service,
        date: booking.date,
        time: booking.time,
        dayName: booking.dayName,
        doctorId: booking.doctorId,
        patientEmail: formData.email,
        patientPhone: formData.phone,
        amount: PRICE,
      };

      localStorage.setItem('booking_success_data', JSON.stringify(successData));

      // Clear pending booking
      localStorage.removeItem('pending_booking');
      localStorage.removeItem('booking_context');

      // Redirect to success page
      router.push(`/get-started/booking-success?bookingId=${result.data._id}`);
    } catch (err) {
      console.error('Booking error:', err);
      alert((err as Error).message);
    } finally {
      setSubmitting(false);
    }
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

  const isCardPayment = booking.paymentMethod === 'credit-card' || booking.paymentMethod === 'debit-card';
  const paymentMethodLabel = {
    'MTN MOMO': 'Mobile money',
    'debit-card': 'Debit Card',
  }[booking.paymentMethod] || 'Unknown';

  return (
    <div className="min-h-screen bg-gray-100">
      <Header/>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Patient Details</h1>
          <p className="text-gray-600 mt-2">Please enter your information to complete the booking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-md shadow-sm p-8">
              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Contact Information</h2>

                <div className="space-y-4">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="your@email.com"
                      required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
                        errors.phone ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              {isCardPayment && (
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-6 pb-6 border-b border-gray-200">
                    {paymentMethodLabel} Details
                  </h2>

                  <div className="space-y-4">
                    {/* Cardholder Name */}
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
                          errors.cardName ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder="John Doe"
                        required
                      />
                      {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
                    </div>

                    {/* Card Number */}
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <div className="relative">
                        <input
                          type={showCard ? 'text' : 'password'}
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCard(!showCard)}
                          className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700"
                        >
                          {showCard ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
                            errors.expiryDate ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="MM/YY"
                          required
                        />
                        {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>}
                      </div>

                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="password"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${
                            errors.cvv ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="123"
                          required
                        />
                        {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className={`w-full mt-8 py-4 rounded-lg font-bold text-white transition-all ${
                  submitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-500 hover:cursor-pointer'
                }`}
              >
                {submitting ? 'Processing...' : 'Complete Booking'}
              </button>

              <p className="text-xs text-gray-600 text-center mt-4">
                Your information is secure and encrypted
              </p>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-sm shadow-sm p-8 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Booking Summary</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Service</p>
                  <p className="text-gray-900 font-semibold">{booking.service}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="text-gray-900 font-semibold">
                    {booking.dayName} {booking.dayDate}
                    <br />
                    {booking.time}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="text-gray-900 font-semibold">{paymentMethodLabel}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-700 mb-2">
                    <span>Subtotal</span>
                    <span>${PRICE.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 mb-3">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-3">
                    <span>Total</span>
                    <span>${PRICE.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
