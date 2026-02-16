'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  fetchDoctorServices, 
  fetchBookings, 
  fetchServices, 
  buildServiceMap,
  updateBookingStatus, 
  refetchBookingsAfterError 
} from './api_calls/bookingService';
import { Booking, ServiceMap } from './types/booking.types';

export default function BookingsListPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [doctorServices, setDoctorServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [serviceMap, setServiceMap] = useState<ServiceMap>({});
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userRaw = localStorage.getItem('user_data');
    if (!token || !userRaw) {
      router.push('/auth/signin');
      return;
    }

    try {
      const user = JSON.parse(userRaw);
      const currentDoctorId = user?._id || user?.id || null;
      setDoctorId(currentDoctorId);
      
      if (currentDoctorId) {
        (async () => {
          try {
            const svcData = await fetchDoctorServices(currentDoctorId);
            setDoctorServices(svcData);
            setSelectedService(null);
          } catch (err) {
            if (user?.services && Array.isArray(user.services)) {
              setDoctorServices(user.services);
              setSelectedService(null);
            }
          }
        })();
      } else {
        if (user?.services && Array.isArray(user.services)) {
          setDoctorServices(user.services);
          setSelectedService(null);
        }
      }
    } catch (e) {
      console.error('Error parsing user data:', e);
    }

    (async () => {
      try {
        const bookingsList = await fetchBookings();
        setBookings(bookingsList);

        const services = await fetchServices();
        const map = buildServiceMap(services);
        setServiceMap(map);
      } catch (err) {
        console.error('Error fetching data:', err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const handleUpdateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      setUpdatingId(bookingId);
      const res = await updateBookingStatus(bookingId, newStatus as any, doctorId || undefined);
      
      if (res?.data) {
        setBookings(prev => prev.map(b => b._id === bookingId ? res.data! : b));
      } else if (res?.success) {
        setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: newStatus as any } : b));
      }
      
      alert(`Booking status updated to ${newStatus}`);
    } catch (err: any) {
      if (err.response?.status === 404) {
        console.warn('Got 404, but checking if update actually happened...');
        setTimeout(async () => {
          const updated = await refetchBookingsAfterError(bookingId, newStatus as any);
          if (updated) {
            const refreshedBookings = await fetchBookings();
            setBookings(refreshedBookings);
          }
        }, 500);
      }
      
      const errorMsg = err.response?.data?.error || err.message;
      alert(`Failed to update booking status: ${errorMsg}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const normalize = (v: any) => (v || '').toString().trim().toLowerCase();

  const filtered = selectedService
    ? bookings.filter((b) => normalize(b.service) === normalize(selectedService) || (String(b.service) === String(selectedService)))
    : bookings;

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Bookings</h1>
          <div className="text-sm text-gray-600">Total: {filtered.length}</div>
        </div>

        <div className="mb-4 flex gap-2 flex-wrap">
          {doctorServices.length > 0 ? (
            doctorServices.map((s, idx) => {
              const key = typeof s === 'string' ? s : (s._id || s.slug || s.title || s.name || String(idx));
              const label = serviceMap[String(s)] || (typeof s === 'string' ? s : (s.title || s.name || s.slug || JSON.stringify(s)));
              return (
                <button 
                  key={key} 
                  onClick={() => setSelectedService(s)} 
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedService === s ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {label}
                </button>
              );
            })
          ) : (
            <div className="text-sm text-gray-500">No services assigned</div>
          )}
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No bookings</div>
          ) : (
            filtered.map((b) => (
              <div key={b._id} className="bg-white rounded p-4 shadow flex items-center justify-between">
                <div>
                  <div className="font-semibold">{b.patientName || b.patientEmail || 'Patient'}</div>
                  <div className="text-xs text-gray-500">{serviceMap[b.service] || b.service} • {b.date} • {b.time}</div>
                  <div className="text-xs mt-2">
                    <span className={`inline-block px-2 py-1 rounded-full font-semibold ${
                      b.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                      b.status === 'completed' ? 'bg-green-100 text-green-700' :
                      b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {b.status?.charAt(0).toUpperCase() + b.status?.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-xs text-gray-500 font-mono">{b.time || (b.date ? new Date(b.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '')}</div>
                  {b.status === 'confirmed' && (
                    <button 
                      onClick={() => handleUpdateBookingStatus(b._id, 'completed')}
                      disabled={updatingId === b._id}
                      className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
                    >
                      {updatingId === b._id ? 'Updating...' : 'Mark Complete'}
                    </button>
                  )}
                  <button 
                    onClick={() => router.push(`/adminstration/doctor/booking/${b._id}`)} 
                    className="px-3 py-1 text-xs bg-teal-500 text-white rounded"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
