"use client";

import React from "react";
import { Users, Calendar, Briefcase } from "lucide-react";

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
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hello !</h1>
          <p className="text-gray-600 text-sm">Welcome to Your Dashboard. Let's help patients to live a healthier and happier life</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white text-xl">+</button>
          <div className="w-10 h-10 bg-purple-500 rounded-full"></div>
        </div>
      </div>

      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Doctors</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">{dummyStats.totalDoctors}</h3>
                <p className="text-green-600 text-sm mt-2">{dummyStats.activeDoctors} Active</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Appointments</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">{dummyStats.totalAppointments}</h3>
                <p className="text-orange-600 text-sm mt-2">{dummyStats.pendingAppointments} Pending</p>
              </div>
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                <Calendar className="w-7 h-7 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Services</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">{dummyStats.totalServices}</h3>
                <p className="text-green-600 text-sm mt-2">{dummyStats.activeServices} Active</p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Graph and Patient Gender */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Appointments (Assigned to me)</h2>
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
                <span className="text-sm text-gray-600">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Solved</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-3xl font-bold text-teal-600">3</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Solved</p>
                <p className="text-3xl font-bold text-teal-600">2</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Patient Gender</h2>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="20" strokeDasharray="188 251" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#0891b2" strokeWidth="20" strokeDasharray="63 251" strokeDashoffset="-188" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Male</span>
                </div>
                <span className="text-sm font-semibold">4000</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">Female</span>
                </div>
                <span className="text-sm font-semibold">1000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Appointments</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Patient</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Doctor</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Service</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((apt) => (
                  <tr key={apt.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{apt.patient}</td>
                    <td className="py-3 px-4">{apt.doctor}</td>
                    <td className="py-3 px-4">{apt.service}</td>
                    <td className="py-3 px-4">{apt.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          apt.status === "Pending"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
