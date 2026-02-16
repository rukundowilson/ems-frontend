'use client';

import { X, CheckCircle } from 'lucide-react';

interface ReceiptProps {
  booking: {
    _id: string;
    patientName?: string;
    patientEmail?: string;
    patientPhone?: string;
    service?: string;
    doctorId?: string;
    doctorName?: string;
    date: string;
    time: string;
    amount?: number;
    status: string;
    paymentMethod?: string;
    createdAt?: Date | string;
  };
  onClose: () => void;
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

export default function Receipt({ booking, onClose }: ReceiptProps) {
  const receiptDate = typeof booking.createdAt === 'string' 
    ? new Date(booking.createdAt) 
    : booking.createdAt || new Date();

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white px-4 pb-4 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <div className="flex justify-end p-2 sticky top-0 bg-white">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-2">
          {/* Success Message */}
          <div className="bg-green-50 border-l-4 border-green-500 p-2 rounded-lg mb-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900">Appointment  receipt</h3>
              </div>
            </div>
          </div>

          {/* Receipt */}
          <div className="bg-white rounded-sm p-8 shadow-lg border">
            {/* Receipt Header */}
            <div className="flex items-center justify-between border-b pb-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-md flex items-center justify-center text-white font-bold text-xl">EMS</div>
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
                <p className="text-xs text-gray-600 font-semibold mb-2">SERVICE & DOCTOR</p>
                <div className="text-sm text-gray-800">
                  <div className="font-semibold">Appointment Fees</div>
                  <div className="text-xs mt-1">Service: {booking.service || '—'}</div>
                  <div className="text-xs">Doctor: {booking.doctorName || '—'} {booking.doctorId ? `(ID: ${booking.doctorId})` : ''}</div>
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
              <div className="text-xs text-gray-500">Receipt Date: {receiptDate.toLocaleString()}</div>
              <div className="text-center">
                <div className="text-xs text-gray-600">Authorized Signature</div>
                <div className="mt-6 h-8 w-40 border-b"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
