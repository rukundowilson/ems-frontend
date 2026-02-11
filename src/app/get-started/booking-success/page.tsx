'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, Mail, Calendar, Clock, Copy, Printer } from 'lucide-react';
import Header from '@/app/components/Header';

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

function BookingSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!bookingId) {
      setTimeout(() => {
        router.push('/get-started/book');
      }, 500);
      return;
    }

    // Get booking success data from localStorage
    const successData = localStorage.getItem('booking_success_data');
    if (successData) {
      try {
        const data = JSON.parse(successData);
        setBooking(data);
      } catch (e) {
        console.error('Error parsing booking data:', e);
      }
    }

    setLoading(false);
  }, [bookingId, router]);

  const handleCopyBookingId = () => {
    navigator.clipboard.writeText(bookingId || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    if (typeof window === 'undefined') return;
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-lg text-gray-600">Processing your booking...</p>
        </div>
      </div>
    );
  }

  if (!bookingId) {
    return null; // Will redirect
  }

  const appointmentFee = 2000;
  const amountInWords = numberToWords(appointmentFee);

  return (
    <div className="min-h-screen bg-gray-100" id="receipt-container">
      <Header/>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #receipt, #receipt * {
            visibility: visible;
          }
          #receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none;
          }
        }
      `}</style>
      <div className="max-w-3xl mx-auto mt-12">
        {/* Print Button */}
        <div className="mb-4 no-print flex gap-3">
          
          <button
            onClick={handlePrint}
            className="px-4 flex py-2 font-semibold cursor-pointer"
          >
            <svg
                    className={`w-6 h-5 transition-transform`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
            Print / Save as PDF
          </button>
          <Link href="/get-started" className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
            Back to Home
          </Link>
        </div>

        {/* Receipt */}
        <div className="bg-white rounded-sm p-8" id="receipt">

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
              <div className="text-xs text-gray-500 flex items-center justify-end gap-2">
                <span>Appointment ID: {bookingId}</span>
                <button onClick={handleCopyBookingId} title="Copy appointment ID" className="p-1 rounded hover:bg-gray-100">
                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-500" />}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-xs text-gray-600 font-semibold mb-1">RECEIVED WITH THANKS FROM</p>
              <div className="font-semibold text-gray-900">Patient</div>
              <div className="text-xs text-gray-600 mt-3">Email: {booking?.patientEmail || '—'}</div>
              <div className="text-xs text-gray-600">Phone: {booking?.patientPhone || '—'}</div>
            </div>

            <div>
              <p className="text-xs text-gray-600 font-semibold mb-1">AMOUNT</p>
              <div className="text-2xl font-bold text-gray-900">{appointmentFee} FRW</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-xs text-gray-600 font-semibold mb-2">SERVICE DESCRIPTION</p>
              <div className="text-sm text-gray-800">
                <div className="font-semibold">Appointment Fees</div>
                <div className="text-xs mt-1">Service: {booking?.serviceName || '—'}</div>
                <div className="text-xs">Doctor: {booking?.doctorId || '—'}</div>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-600 font-semibold mb-2">APPOINTMENT DETAILS</p>
              <div className="text-xs text-gray-700 space-y-1">
                <div>Date: {booking?.date || booking?.dayName || '—'}</div>
                <div>Time: {booking?.time || '—'}</div>
                <div className="mt-2 flex items-center gap-2">ID: <span className="font-mono">{bookingId || '—'}</span>
                  <button onClick={handleCopyBookingId} title="Copy appointment ID" className="p-1 rounded hover:bg-gray-100">
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-500" />}
                  </button>
                </div>
              </div>
            </div>
          </div>


          <div className="border-t pt-4 mt-8 mb-6">
            <p className="text-xs text-gray-600 font-semibold mb-2">AMOUNT IN WORDS</p>
            <div className="text-sm text-gray-800 font-semibold">{amountInWords} Rwandan Francs</div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <div className="text-xs text-gray-500">Receipt Date: {new Date().toLocaleString()}</div>
            <div className="text-center">
              <div className="text-xs text-gray-600">Authorized Signature</div>
              <div className="mt-6 h-8 w-40 border-b"></div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-lg text-gray-600">Loading...</div></div>}>
      <BookingSuccessContent />
    </Suspense>
  );
}
