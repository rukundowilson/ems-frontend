'use client'

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Copy, Check } from 'lucide-react';
// Use admin layout's sidebar/header; no top Header here

export default function AdminBookingDetailsPage() {
  const params = useParams() as { id?: string };
  const id = params?.id || '';
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [serviceName, setServiceName] = useState<string>('');

  useEffect(() => {
    if (!id) {
      router.push('/adminstration/doctor');
      return;
    }

    (async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/bookings/${id}`);
        if (!res.ok) throw new Error('Failed to fetch booking');
        const data = await res.json();
        setBooking(data.data);

        // Fetch service name if booking has a service ID
        if (data.data?.service) {
          try {
            const serviceRes = await fetch(`http://localhost:4000/api/services/${data.data.service}`);
            if (serviceRes.ok) {
              const serviceData = await serviceRes.json();
              setServiceName(serviceData.data?.title || data.data.service);
            } else {
              setServiceName(data.data.service);
            }
          } catch (err) {
            setServiceName(data.data.service);
          }
        }
      } catch (err) {
        console.error('Error fetching booking:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (booking) {
      try {
        const shortId = String((booking._id || '')).slice(0, 8);
        document.title = `Appointment ${shortId} — EMS Clinic`;
      } catch (e) {
        document.title = 'Appointment — EMS Clinic';
      }
    } else {
      document.title = 'Appointment — EMS Clinic';
    }
  }, [booking]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>
  );

  if (!booking) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">Booking not found</div>
  );

  const b = booking as any;

  const numberToWords = (num: number) => {
    if (!num && num !== 0) return '';
    const a = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
    const b10 = ['','', 'Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];

    function inWords(n: number): string {
      if (n < 20) return a[n];
      if (n < 100) return b10[Math.floor(n/10)] + (n%10 ? ' ' + a[n%10] : '');
      if (n < 1000) return a[Math.floor(n/100)] + ' Hundred' + (n%100 ? ' ' + inWords(n%100) : '');
      if (n < 1000000) return inWords(Math.floor(n/1000)) + ' Thousand' + (n%1000 ? ' ' + inWords(n%1000) : '');
      return String(n);
    }

    return inWords(num) + ' Rwandan Francs';
  };

  const receiptDate = b.createdAt ? new Date(b.createdAt).toLocaleString() : new Date().toLocaleString();

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText((b._id || '').toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Appointment Receipt</h1>
        <div className="bg-white shadow rounded-lg p-8">
          <div className="flex justify-between items-start mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">EMS</div>
            <div>
              <h3 className="text-xl font-bold">EMS Clinic</h3>
              <p className="text-sm text-gray-600">Healthcare Services</p>
              <p className="text-sm text-gray-600">Phone: +250 790080450</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">APPOINTMENT RECEIPT</div>
            <div className="text-xs text-gray-400">Date: {new Date().toLocaleDateString()}</div>
            <div className="text-xs text-gray-400 mt-3 flex items-center justify-end gap-2">
              <span>Appointment ID: {(b._id || '').toString()}</span>
              <button
                onClick={handleCopyId}
                className="p-1 hover:bg-gray-100 rounded transition"
                title="Copy appointment ID"
              >
                {copied ? (
                  <Check size={14} className="text-green-500" />
                ) : (
                  <Copy size={14} className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-b py-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs text-gray-500">RECEIVED WITH THANKS FROM</div>
              <div className="font-semibold text-lg">Patient</div>
              <div className="text-sm text-gray-600 mt-2">Email: {b.patientEmail || '-'}</div>
              <div className="text-sm text-gray-600">Phone: {b.patientPhone || '-'}</div>
            </div>
            <div className="col-span-1 md:col-span-1 flex items-center justify-center">
              <div>
                <div className="text-sm text-gray-500">AMOUNT</div>
                <div className="text-3xl font-bold mt-2">{b.amount ?? '-'} FRW</div>
                <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mt-2">{b.status || ''}</div>
              </div>
            </div>
            <div className="col-span-1 md:col-span-1">
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-xs text-gray-500">SERVICE DESCRIPTION</div>
                <div className="font-semibold mt-2">Appointment Fees</div>
                <div className="text-sm text-gray-600 mt-3">Service: {serviceName || b.service}</div>
                <div className="text-sm text-gray-600">Doctor: {b.doctorId || 'doctor-1'}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs text-gray-500">AMOUNT IN WORDS</div>
              <div className="font-semibold mt-2">{numberToWords(Number(b.amount) || 0)}</div>
              <div className="text-sm text-gray-600 mt-3">Payment Method: {b.paymentMethod || '-'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">APPOINTMENT DETAILS</div>
              <div className="mt-2 text-sm">Date: {b.date}</div>
              <div className="mt-1 text-sm">Time: {b.time}</div>
              <div className="mt-1 text-sm">ID: {(b._id || '').toString()}</div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 text-sm text-gray-600 flex justify-between">
          <div>Receipt Date: {receiptDate}</div>
          <div className="text-right">
            <div>Authorized Signature</div>
            <div className="mt-8 border-t w-40"></div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
