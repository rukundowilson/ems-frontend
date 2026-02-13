"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Users, Calendar, Briefcase, AlertCircle, Home, User, Download, FileText, Activity } from "lucide-react";
import { usePatients, useDoctors, useServices, useBookings } from "@/app/shared/hooks/useAdminData";
import { useRouter } from "next/navigation";
import { SkeletonCard, SkeletonTable } from "@/app/components/Skeleton";
import { useTheme } from "@/app/contexts/ThemeContext";

const dummyStats = {
  totalDoctors: 24,
  activeDoctors: 18,
  totalAppointments: 156,
  pendingAppointments: 23,
  totalServices: 12,
  activeServices: 10,
};

const recentAppointments = [
  { id: 1, patient: "John Doe", doctor: "Dr. Smith", service: "Consultation", date: "2024-02-10", status: "Pending" },
  { id: 2, patient: "Jane Wilson", doctor: "Dr. Johnson", service: "Checkup", date: "2024-02-10", status: "Confirmed" },
  { id: 3, patient: "Mike Brown", doctor: "Dr. Davis", service: "Surgery", date: "2024-02-11", status: "Pending" },
];

export default function AdminOverview() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");
  const { darkMode } = useTheme();
  const { data: patients, isLoading: loadingPatients, error: patientsError } = usePatients();
  const { data: doctors, isLoading: loadingDoctors, error: doctorsError } = useDoctors();
  const { data: services, isLoading: loadingServices, error: servicesError } = useServices();
  const { data: bookings, isLoading: loadingBookings } = useBookings();

  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    if (userData) {
      const user = JSON.parse(userData);
      setAdminName(user.name || user.email || "Admin");
    }
  }, []);

  const totalDoctors = doctors?.length || 0;
  const totalPatients = patients?.length || 0;
  const totalServices = services?.length || 0;

  const bookingStats = useMemo(() => {
    if (!bookings) return { pending: 0, confirmed: 0, completed: 0, cancelled: 0 };
    return bookings.reduce((acc: any, b: any) => {
      acc[b.status] = (acc[b.status] || 0) + 1;
      return acc;
    }, {});
  }, [bookings]);

  const recentBookings = useMemo(() => {
    if (!bookings) return [];
    return [...bookings]
      .sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 5)
      .map((b: any) => ({
        ...b,
        doctorName: doctors?.find((d: any) => d._id === b.doctorId)?.name || 'Unknown',
        serviceName: services?.find((s: any) => s._id === b.service)?.title || b.service || 'N/A',
      }));
  }, [bookings, doctors, services]);

  const hasError = patientsError || doctorsError || servicesError;

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need admin privileges to access this page.</p>
          <button
            onClick={() => router.push('/auth/signin')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Sign In as Admin
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Hello, {adminName}!</h1>
          <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Welcome back to your dashboard. Here's what's happening today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {loadingDoctors || loadingPatients || loadingServices || loadingBookings ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
          <div className={`rounded-xl shadow-md p-6 border-l-4 border-blue-500 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Doctors</p>
                <h3 className={`text-3xl font-bold mt-1 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{loadingDoctors ? '...' : totalDoctors}</h3>
                <p className="text-green-600 text-sm mt-2">{totalDoctors} Active</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-md p-6 border-l-4 border-teal-500 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Bookings</p>
                <h3 className={`text-3xl font-bold mt-1 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{loadingBookings ? '...' : bookings?.length || 0}</h3>
                <p className="text-orange-600 text-sm mt-2">{bookingStats.pending || 0} Pending</p>
              </div>
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                <Calendar className="w-7 h-7 text-teal-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-md p-6 border-l-4 border-purple-500 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Services</p>
                <h3 className={`text-3xl font-bold mt-1 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{loadingServices ? '...' : totalServices}</h3>
                <p className="text-green-600 text-sm mt-2">{totalServices} Active</p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-purple-600" />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-md p-6 border-l-4 border-indigo-500 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Patients</p>
                <h3 className={`text-3xl font-bold mt-1 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{loadingPatients ? '...' : totalPatients}</h3>
                <p className="text-blue-600 text-sm mt-2">{totalPatients} Registered</p>
              </div>
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
                <Users className="w-7 h-7 text-indigo-600" />
              </div>
            </div>
          </div>
            </>
          )}
        </div>

        {/* Appointments Graph and Patient Gender */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className={`lg:col-span-2 rounded-xl shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Appointments (Assigned to me)</h2>
              <div className="flex gap-2">
                <button className="px-4 py-1 bg-teal-500 text-white rounded-full text-sm">Day</button>
                <button className="px-4 py-1 bg-teal-100 text-teal-600 rounded-full text-sm">Week</button>
              </div>
            </div>
            <div className="h-64 flex items-end justify-around gap-4 border-b border-l pb-4 pl-4">
              {["Wed, 2/4", "Thu, 2/5", "Fri, 2/6", "Sat, 2/7", "Sun, 2/8", "Mon, 2/9", "Tue, 2/10"].map((day, i) => (
                <div key={day} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="w-full h-32 bg-gradient-to-t from-orange-100 to-transparent rounded-t"></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{day}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Solved</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pending</p>
                <p className="text-3xl font-bold text-teal-600">{bookingStats.pending || 0}</p>
              </div>
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Confirmed</p>
                <p className="text-3xl font-bold text-teal-600">{bookingStats.confirmed || 0}</p>
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-md p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Patient Gender</h2>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="20" strokeDasharray={`${(patients?.filter((p: any) => p.gender === 'male').length || 0) / (patients?.length || 1) * 251} 251`} />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#0891b2" strokeWidth="20" strokeDasharray={`${(patients?.filter((p: any) => p.gender === 'female').length || 0) / (patients?.length || 1) * 251} 251`} strokeDashoffset={`-${(patients?.filter((p: any) => p.gender === 'male').length || 0) / (patients?.length || 1) * 251}`} />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Male</span>
                </div>
                <span className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{patients?.filter((p: any) => p.gender === 'male').length || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Female</span>
                </div>
                <span className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{patients?.filter((p: any) => p.gender === 'female').length || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className={`rounded-xl shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Recent Bookings</h2>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last 5 bookings</span>
          </div>
          {loadingBookings ? (
            <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading...</p>
          ) : recentBookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No bookings yet</p>
            </div>
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className={`border-b-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                  <th className={`text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Patient</th>
                  <th className={`text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Doctor</th>
                  <th className={`text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Service</th>
                  <th className={`text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</th>
                  <th className={`text-left py-4 px-6 font-semibold text-sm uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Time</th>
                  <th className={`text-center py-4 px-6 font-semibold text-sm uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Status</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {recentBookings.map((booking: any, index: number) => (
                  <tr key={booking._id} className={`transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} ${index % 2 === 0 ? (darkMode ? 'bg-gray-800' : 'bg-white') : (darkMode ? 'bg-gray-750' : 'bg-gray-50')}`}>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-3">
                          {booking.patientName?.charAt(0) || 'P'}
                        </div>
                        <div>
                          <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{booking.patientName || 'N/A'}</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{booking.patientEmail || ''}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{booking.doctorName}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        {booking.serviceName}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <p className={darkMode ? 'text-gray-200' : 'text-gray-900'}>{booking.date}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className={darkMode ? 'text-gray-200' : 'text-gray-900'}>{booking.time || 'N/A'}</p>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${
                          booking.status === "pending"
                            ? "bg-orange-100 text-orange-700 border border-orange-300"
                            : booking.status === "confirmed"
                            ? "bg-green-100 text-green-700 border border-green-300"
                            : booking.status === "completed"
                            ? "bg-blue-100 text-blue-700 border border-blue-300"
                            : "bg-gray-100 text-gray-700 border border-gray-300"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
