"use client";

import React from "react";
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const dummyStats = {
  totalBookings: 12,
  upcomingAppointments: 3,
  completedAppointments: 7,
  cancelledAppointments: 2,
};

const upcomingAppointments = [
  { id: 1, doctor: "Dr. Sarah Smith", service: "General Checkup", date: "2024-02-15", time: "10:00 AM", status: "Confirmed", location: "Room 203" },
  { id: 2, doctor: "Dr. John Johnson", service: "Dental Cleaning", date: "2024-02-18", time: "2:30 PM", status: "Pending", location: "Room 105" },
  { id: 3, doctor: "Dr. Emily Davis", service: "Eye Examination", date: "2024-02-22", time: "11:00 AM", status: "Confirmed", location: "Room 301" },
];

const recentActivity = [
  { id: 1, action: "Appointment Confirmed", description: "Your appointment with Dr. Sarah Smith has been confirmed", time: "2 hours ago", type: "success" },
  { id: 2, action: "Booking Created", description: "New appointment booked for Dental Cleaning", time: "1 day ago", type: "info" },
  { id: 3, action: "Appointment Completed", description: "Completed consultation with Dr. Michael Brown", time: "3 days ago", type: "success" },
  { id: 4, action: "Reminder", description: "Upcoming appointment tomorrow at 10:00 AM", time: "5 days ago", type: "warning" },
];

export default function PatientOverview() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
          <p className="text-gray-600 text-sm">Track your appointments and manage your health journey</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition">
            Book New Appointment
          </button>
        </div>
      </div>

      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#1a3fac]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Bookings</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">{dummyStats.totalBookings}</h3>
              </div>
              <div className="w-14 h-14 bg-[#1a3fac] rounded-full flex items-center justify-center">
                <Calendar className="w-7 h-7 text-[#1a3fac]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Upcoming</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">{dummyStats.upcomingAppointments}</h3>
              </div>
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                <Clock className="w-7 h-7 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">{dummyStats.completedAppointments}</h3>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Cancelled</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">{dummyStats.cancelledAppointments}</h3>
              </div>
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-7 h-7 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
              <button className="text-teal-600 text-sm hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{apt.doctor}</h3>
                      <p className="text-sm text-gray-600 mt-1">{apt.service}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {apt.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {apt.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">📍 {apt.location}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        apt.status === "Confirmed"
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === "success" ? "bg-green-100" :
                    activity.type === "warning" ? "bg-orange-100" :
                    "bg-blue-100"
                  }`}>
                    {activity.type === "success" ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : activity.type === "warning" ? (
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                    ) : (
                      <Calendar className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800">{activity.action}</h4>
                    <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appointment Status Timeline */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Status Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <p className="text-sm font-semibold text-gray-700">Booking Created</p>
              <p className="text-xs text-gray-500 mt-1">Request submitted</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <p className="text-sm font-semibold text-gray-700">Pending Review</p>
              <p className="text-xs text-gray-500 mt-1">Awaiting approval</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1a3fac] rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-[#1a3fac]">3</span>
              </div>
              <p className="text-sm font-semibold text-gray-700">Doctor Assigned</p>
              <p className="text-xs text-gray-500 mt-1">Provider confirmed</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-teal-600">4</span>
              </div>
              <p className="text-sm font-semibold text-gray-700">Confirmed</p>
              <p className="text-xs text-gray-500 mt-1">Ready to go</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl font-bold text-green-600">5</span>
              </div>
              <p className="text-sm font-semibold text-gray-700">Completed</p>
              <p className="text-xs text-gray-500 mt-1">Visit finished</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
