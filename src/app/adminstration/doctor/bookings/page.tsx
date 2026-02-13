'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/app/shared/services/axios';

export default function BookingsListPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [doctorServices, setDoctorServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [serviceMap, setServiceMap] = useState<Record<string, string>>({}); // Maps service ID to title

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userRaw = localStorage.getItem('user_data');
    if (!token || !userRaw) {
      router.push('/auth/signin');
      return;
    }

      try {
        const user = JSON.parse(userRaw);
        // Try to fetch up-to-date services for this doctor from the backend
        const doctorId = user?._id || user?.id || null;
        if (doctorId) {
          (async () => {
            try {
              const svcRes = await api.get(`/doctors/${doctorId}/services`);
              const svcData = svcRes.data;
              // svcData.data may be an array of strings or objects
              setDoctorServices(Array.isArray(svcData.data) ? svcData.data : (user?.services || []));
              setSelectedService(null);
            } catch (err) {
              // on error, fallback to local services
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
      // ignore
    }

    (async () => {
      try {
        const res = await api.get('/bookings');
        const list = res.data.data || [];
        setBookings(list.map((b: any) => ({ ...b })));

        // Fetch all services to build a mapping
        try {
          const servicesRes = await api.get('/services');
          const services = servicesRes.data.data || [];
          const map: Record<string, string> = {};
          services.forEach((s: any) => {
            if (s._id) map[String(s._id)] = s.title;
            if (s.id) map[String(s.id)] = s.title;
          });
          setServiceMap(map);
        } catch (err) {
          console.error('Error fetching services:', err);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const normalize = (v: any) => (v || '').toString().trim().toLowerCase();

  // Show all bookings by default; doctor-side service buttons act as optional filters
  const bookingsForDoctorServices = bookings;

  const filtered = selectedService
    ? bookingsForDoctorServices.filter((b) => normalize(b.service) === normalize(selectedService) || (String(b.service) === String(selectedService)))
    : bookingsForDoctorServices;

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
                <button key={key} onClick={() => setSelectedService(s)} className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedService === s ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
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
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-xs text-gray-500 font-mono">{String(b._id).slice(0,8)}</div>
                  <button onClick={() => router.push(`/adminstration/doctor/booking/${b._id}`)} className="px-3 py-1 text-xs bg-teal-500 text-white rounded">View</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
