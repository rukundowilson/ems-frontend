'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LogOut } from 'lucide-react';

interface DoctorUser {
  _id: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  services?: string[];
}

interface Booking {
  _id: string;
  patientName: string;
  patientEmail: string;
  doctorId: string;
  service: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  status?: string;
}

// Convert booking to appointment display format
function convertBookingToAppointment(booking: Booking, index: number) {
  return {
    id: String(booking._id ?? index),
    bookingId: String(booking._id ?? ''),
    name: booking.patientName || 'Patient',
    time: booking.startTime || '00:00',
    type: booking.service || 'Appointment',
    status: booking.status === 'completed' ? 'inactive' : 'active',
    assignedTo: 'me',
    controlled: booking.status === 'completed',
    date: booking.bookingDate || new Date().toISOString(),
  };
}

export default function DoctorDashboard() {
  const router = useRouter();
  const [doctorData, setDoctorData] = useState<DoctorUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [upcomingAppointmentsState, setUpcomingAppointmentsState] = useState<any[]>([]);
  const [view, setView] = useState<'day' | 'week'>('day');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [doctorServices, setDoctorServices] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const role = localStorage.getItem('user_role');
    const userData = localStorage.getItem('user_data');

    if (!token || role !== 'doctor') {
      router.push('/auth/signin');
      return;
    }

    if (userData) {
      try {
        const parsedDoctor = JSON.parse(userData) as DoctorUser;
        setDoctorData(parsedDoctor);
        
        // Set doctor's assigned services
        if (parsedDoctor.services && Array.isArray(parsedDoctor.services)) {
          setDoctorServices(parsedDoctor.services);
          // Set first service as default filter
          if (parsedDoctor.services.length > 0) {
            setSelectedService(parsedDoctor.services[0]);
          }
        }
        
        // Fetch all appointments without filtering by doctorId, filter by service on client
        fetchAllAppointments(token);
      } catch (err) {
        console.error('Failed to parse doctor data:', err);
        setUpcomingAppointmentsState([]);
      }
    }
    setLoading(false);
  }, [router]);

  const fetchAllAppointments = async (token: string) => {
    try {
      const response = await fetch('http://localhost:4000/api/bookings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.warn(`Failed to fetch appointments: ${response.status}`);
        setUpcomingAppointmentsState([]);
        return;
      }

      const responseData = await response.json();
      const bookings: Booking[] = responseData.data || [];
      const appointments = bookings.map((booking, index) =>
        convertBookingToAppointment(booking, index)
      );
      setUpcomingAppointmentsState(appointments);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setUpcomingAppointmentsState([]);
    }
  };

  // Filter appointments to only show services doctor is assigned to
  const appointmentsForDoctorServices = upcomingAppointmentsState.filter((apt: any) => 
    doctorServices.length === 0 || doctorServices.includes(apt.type)
  );
  
  // Further filter by selected service
  const filteredAppointments = selectedService 
    ? appointmentsForDoctorServices.filter((apt: any) => apt.type === selectedService)
    : appointmentsForDoctorServices;

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_data');
    router.push('/auth/signin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!doctorData) {
    return null;
  }

  // Data
  const dutyHourData = [
    { day: 'Sat', hours: 9 },
    { day: 'Sun', hours: 7 },
    { day: 'Mon', hours: 4 },
    { day: 'Tue', hours: 8 },
    { day: 'Wed', hours: 5 },
    { day: 'Thu', hours: 9 },
    { day: 'Fri', hours: 7 },
  ];

  const genderData = [
    { name: 'Male', value: 80 },
    { name: 'Female', value: 20 },
  ];

  // sample appointments with dates (ISO) to allow aggregation by day/week
  function toggleControlled(id: number) {
    setUpcomingAppointmentsState((prev: any[]) => prev.map((a: any) => (a.id === id ? { ...a, controlled: !a.controlled } : a)));
  }

  function startOfDay(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function formatDayLabel(d: Date) {
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'numeric', day: 'numeric' });
  }

  // aggregate by day for last `n` days
  function aggregateByDay(apts: any[], days = 7) {
    const today = startOfDay(new Date());
    const result: { name: string; pending: number; solved: number }[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const start = startOfDay(d).getTime();
      const end = start + 24 * 60 * 60 * 1000;
      const slice = apts.filter((a: any) => {
        const t = new Date(a.date).getTime();
        return t >= start && t < end && a.assignedTo === 'me';
      });
      result.push({ name: formatDayLabel(d), pending: slice.filter((s: any) => !s.controlled).length, solved: slice.filter((s: any) => s.controlled).length });
    }
    return result;
  }

  // aggregate by week for last `n` weeks (week ending today)
  function aggregateByWeek(apts: any[], weeks = 4) {
    const result: { name: string; pending: number; solved: number }[] = [];
    const today = startOfDay(new Date());
    for (let w = weeks - 1; w >= 0; w--) {
      const end = today.getTime() - w * 7 * 24 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000; // inclusive end
      const start = end - 7 * 24 * 60 * 60 * 1000;
      const slice = apts.filter((a: any) => {
        const t = new Date(a.date).getTime();
        return t >= start && t < end && a.assignedTo === 'me';
      });
      const weekLabel = new Date(start).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' }) + ' - ' + new Date(end - 1).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
      result.push({ name: weekLabel, pending: slice.filter((s: any) => !s.controlled).length, solved: slice.filter((s: any) => s.controlled).length });
    }
    return result;
  }

  const chartData = view === 'day' ? aggregateByDay(appointmentsForDoctorServices, 7) : aggregateByWeek(appointmentsForDoctorServices, 4);
  const totalPending = chartData.reduce((sum, r) => sum + r.pending, 0);
  const totalSolved = chartData.reduce((sum, r) => sum + r.solved, 0);

  const patientFiles = [
    { id: 1, name: 'Linda Press.pdf', status: 'new' },
    { id: 2, name: 'John Checkup.pdf', status: 'view' },
    { id: 3, name: 'James Press.pdf', status: 'view' },
    { id: 4, name: 'Nelly X-ray result.pdf', status: 'view' },
  ];

  const patientReviews = [
    { id: 1, name: 'Linda Brown', review: 'Dr James is a great doctor!' },
    { id: 2, name: 'John Doe', review: 'Dr James is my favourite' },
    { id: 3, name: 'James Vane', review: 'Thanks Doc!' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Hello {doctorData.name}!</h1>
            <p className="text-gray-600 text-sm max-w-md">Welcome to Your Dashboard. Let's help patients to live a healthier and happier life</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600 transition font-bold text-lg">+</button>
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  {doctorData.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-gray-800 hidden sm:inline">{doctorData.name}</span>
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-3 border-b text-sm">
                    <p className="font-semibold text-gray-900">{doctorData.name}</p>
                    <p className="text-xs text-gray-600">{doctorData.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 text-sm font-semibold transition"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Section - 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Appointments Chart - Left (2 cols) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-none p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Appointments (Assigned to me)</h2>
                <div className="flex items-center gap-3">
                  <div className="text-xs text-gray-500">View:</div>
                  <button onClick={() => setView('day')} className={`px-3 py-1 rounded-full text-xs font-semibold ${view === 'day' ? 'bg-teal-500 text-white' : 'bg-teal-100 text-teal-700'}`}>Day</button>
                  <button onClick={() => setView('week')} className={`px-3 py-1 rounded-full text-xs font-semibold ${view === 'week' ? 'bg-teal-500 text-white' : 'bg-teal-100 text-teal-700'}`}>Week</button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} allowDecimals={false} />
                  <Tooltip />
                    <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={3} dot={{ r: 6 }} name="Pending" />
                    <Line type="monotone" dataKey="solved" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} name="Solved" />
                    <Legend />
                </LineChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div>
                    <p className="text-gray-600 text-sm font-medium">Pending</p>
                    <p className="text-3xl font-bold text-teal-600">{totalPending}</p>
                </div>
                <div>
                    <p className="text-gray-600 text-sm font-medium">Solved</p>
                    <p className="text-3xl font-bold text-teal-600">{totalSolved}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Gender */}
          <div className="bg-white rounded-2xl shadow-none p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Patient Gender</h3>
            <div className="flex items-center justify-center mb-6">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={genderData} cx={70} cy={70} innerRadius={40} outerRadius={70} dataKey="value" startAngle={90} endAngle={-270}>
                    <Cell fill="#0ea5e9" />
                    <Cell fill="#cbd5e1" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700 font-medium">4000 Male</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-700 font-medium">1000 Female</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Two-day Calendar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-none p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Calendar</h2>
                <Link href="/adminstration/doctor/calendar" className="text-xs text-teal-600 font-semibold hover:text-teal-700 transition">View All →</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(() => {
                  const days = [new Date(), new Date(Date.now() + 24 * 60 * 60 * 1000)];
                  function getAppointmentsForDay(d: Date) {
                    const start = startOfDay(d).getTime();
                    const end = start + 24 * 60 * 60 * 1000;
                    return appointmentsForDoctorServices
                      .filter((a: any) => a.assignedTo === 'me')
                      .filter((a: any) => {
                        const t = new Date(a.date).getTime();
                        return t >= start && t < end;
                      })
                      .sort((x: any, y: any) => new Date(x.date).getTime() - new Date(y.date).getTime());
                  }

                  return days.map((day) => {
                    const apts = getAppointmentsForDay(day);
                    return (
                      <div key={day.toISOString()} className="p-3 border border-gray-100 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-sm font-semibold text-gray-700">{day.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                            <div className="text-xs text-gray-500">{day.toLocaleDateString()}</div>
                          </div>
                          <div className="text-xs text-gray-500">{apts.length} appt</div>
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {apts.length === 0 ? (
                            <div className="text-xs text-gray-400">No appointments</div>
                          ) : (
                            apts.map((apt: any) => (
                              <div key={apt.id} onClick={() => router.push(`/adminstration/doctor/booking/${apt.bookingId}`)} className="w-full p-3 border-b last:border-b-0 flex items-center gap-3 cursor-pointer">
                                <div className="text-xs text-gray-600 w-14 flex-shrink-0">{apt.time}</div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-semibold text-gray-800 truncate">{apt.name}</div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs text-gray-500 truncate">{apt.type}</span>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono flex-shrink-0">
                                      {apt.bookingId ? String(apt.bookingId).substring(0, 6) : apt.id}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>

          {/* Middle Column - All Appointments */}
          <div className="bg-white rounded-2xl shadow-none p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">All Appointments</h2>
              <span className="text-xs text-gray-500">Total: {filteredAppointments.length}</span>
            </div>
            
            {/* Service Filter - Only show services doctor is assigned to */}
            <div className="mb-4 flex flex-wrap gap-2">
              {doctorServices.length > 0 ? (
                <>
                  {doctorServices.map((service: any) => (
                    <button
                      key={service}
                      onClick={() => setSelectedService(service)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        selectedService === service
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </>
              ) : (
                <div className="text-xs text-gray-500">No services assigned</div>
              )}
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No appointments</div>
              ) : (
                filteredAppointments.map((apt: any) => (
                  <div key={apt.id} onClick={() => router.push(`/adminstration/doctor/booking/${apt.bookingId}`)} className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition cursor-pointer">
                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white ${apt.status === 'active' ? 'bg-gradient-to-br from-teal-400 to-teal-500' : 'bg-gray-300'}`}>
                      {apt.name.split(' ')[0][0]}{apt.name.split(' ')[1] ? apt.name.split(' ')[1][0] : ''}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm">{apt.name}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs text-gray-500">{apt.type}</p>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded font-mono">
                          ID: {apt.bookingId ? String(apt.bookingId).substring(0, 8) : apt.id}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${apt.status === 'active' ? 'bg-teal-500' : 'bg-gray-300'}`}></span>
                      <span className="text-teal-600 font-semibold text-xs whitespace-nowrap">{apt.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column - Patient File & Reviews */}
          <div className="space-y-6">
            {/* Patient Files */}
            <div className="bg-white rounded-2xl shadow-none p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">Patient File</h2>
                <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold">View All</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {patientFiles.map((file) => (
                  <div key={file.id} className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-lg transition">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 text-sm font-bold text-blue-600">📄</div>
                    <p className="font-semibold text-gray-800 text-xs flex-1 truncate">{file.name}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${file.status === 'new' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-600'}`}>
                      {file.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient Reviews */}
            <div className="bg-white rounded-2xl shadow-none p-8">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Patient Feedback</h2>
              <div className="space-y-3">
                {patientReviews.map((review) => (
                  <div key={review.id} className="p-3 bg-blue-50 rounded-lg border-l-4 border-teal-500">
                    <p className="font-semibold text-gray-800 text-xs">{review.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{review.review}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
