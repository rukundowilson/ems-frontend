'use client';

import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DoctorDashboard() {
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
  const initialAppointments = [
    { id: 1, name: 'Linda Brown', time: '08:00 AM', type: 'First call', status: 'active', assignedTo: 'me', controlled: false, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 2, name: 'Nelly Dean', time: '09:00 AM', type: 'First call', status: 'active', assignedTo: 'me', controlled: false, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 3, name: 'John Doe', time: '10:00 AM', type: 'First call', status: 'active', assignedTo: 'me', controlled: true, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 4, name: 'James Vane', time: '10:45 AM', type: 'First call', status: 'inactive', assignedTo: 'other', controlled: true, date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 5, name: 'Mary Smith', time: '11:00 AM', type: 'Consultation', status: 'inactive', assignedTo: 'me', controlled: false, date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 6, name: 'Alex Roe', time: '02:00 PM', type: 'Follow-up', status: 'active', assignedTo: 'me', controlled: true, date: new Date().toISOString() },
  ];

  const [upcomingAppointmentsState, setUpcomingAppointmentsState] = React.useState(initialAppointments);

  function toggleControlled(id: number) {
    setUpcomingAppointmentsState((prev) => prev.map((a) => (a.id === id ? { ...a, controlled: !a.controlled } : a)));
  }

  // UI state: 'day' shows last 7 days, 'week' shows last 4 weeks
  const [view, setView] = React.useState<'day' | 'week'>('day');

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
      const slice = apts.filter((a) => {
        const t = new Date(a.date).getTime();
        return t >= start && t < end && a.assignedTo === 'me';
      });
      result.push({ name: formatDayLabel(d), pending: slice.filter((s) => !s.controlled).length, solved: slice.filter((s) => s.controlled).length });
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
      const slice = apts.filter((a) => {
        const t = new Date(a.date).getTime();
        return t >= start && t < end && a.assignedTo === 'me';
      });
      const weekLabel = new Date(start).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' }) + ' - ' + new Date(end - 1).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
      result.push({ name: weekLabel, pending: slice.filter((s) => !s.controlled).length, solved: slice.filter((s) => s.controlled).length });
    }
    return result;
  }

  const chartData = view === 'day' ? aggregateByDay(upcomingAppointmentsState, 7) : aggregateByWeek(upcomingAppointmentsState, 4);
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
    <div className="min-h-screen bg-blue-50 p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Hello James!</h1>
            <p className="text-gray-600 text-sm max-w-md">Welcome James to Our Platform. Let's help patients to live a healthier and happier life</p>
          </div>
          <button className="bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600 transition font-bold text-lg">+</button>
        </div>

        {/* Top Section - 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Appointments Chart - Left (2 cols) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
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
          <div className="bg-white rounded-2xl shadow-lg p-8">
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
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Calendar</h2>
                <span className="text-xs text-gray-500">Showing: Today & Tomorrow</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(() => {
                  const days = [new Date(), new Date(Date.now() + 24 * 60 * 60 * 1000)];
                  function getAppointmentsForDay(d: Date) {
                    const start = startOfDay(d).getTime();
                    const end = start + 24 * 60 * 60 * 1000;
                                    return upcomingAppointmentsState
                      .filter((a) => a.assignedTo === 'me')
                      .filter((a) => {
                        const t = new Date(a.date).getTime();
                        return t >= start && t < end;
                      })
                      .sort((x, y) => new Date(x.date).getTime() - new Date(y.date).getTime());
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
                            apts.map((apt) => (
                              <div key={apt.id} className="flex items-center justify-between gap-3 p-2 rounded-md hover:shadow-sm transition">
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-12 text-xs font-bold text-white flex items-center justify-center rounded-md" style={{ background: apt.controlled ? 'linear-gradient(90deg,#bbf7d0,#10b981)' : 'linear-gradient(90deg,#a7f3d0,#06b6d4)' }}>
                                    {apt.time}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-sm font-semibold text-gray-800 truncate">{apt.name}</div>
                                    <div className="text-xs text-gray-500 truncate">{apt.type}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button onClick={() => toggleControlled(apt.id)} className="px-2 py-1 text-xs rounded-full border hover:bg-gray-50">
                                    {apt.controlled ? 'Mark Pending' : 'Mark Solved'}
                                  </button>
                                  <div className="text-xs">
                                    {apt.controlled ? (
                                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Solved</span>
                                    ) : (
                                      <span className="px-2 py-1 text-xs bg-teal-100 text-teal-700 rounded-full">Pending</span>
                                    )}
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

          {/* Middle Column - Upcoming Appointments */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Upcoming Appointment</h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
              {upcomingAppointmentsState.map((apt) => (
                <div key={apt.id} className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-lg transition">
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white ${apt.status === 'active' ? 'bg-gradient-to-br from-teal-400 to-teal-500' : 'bg-gray-300'}`}>
                    {apt.name.split(' ')[0][0]}{apt.name.split(' ')[1][0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{apt.name}</p>
                    <p className="text-xs text-gray-500">{apt.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${apt.status === 'active' ? 'bg-teal-500' : 'bg-gray-300'}`}></span>
                    <span className="text-teal-600 font-semibold text-xs whitespace-nowrap">{apt.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Patient File & Reviews */}
          <div className="space-y-6">
            {/* Patient Files */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
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
            <div className="bg-white rounded-2xl shadow-lg p-8">
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
  );
}
