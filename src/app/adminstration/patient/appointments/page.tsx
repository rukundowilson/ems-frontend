"use client";

import React, { useState } from "react";
import { Search, Calendar, Clock, MapPin, Download } from "lucide-react";

interface Booking {
  _id: string;
  doctorId: string;
  service: string;
  date: string;
  time: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  patientEmail: string;
  patientPhone: string;
  paymentMethod: string;
  amount: number;
}

const dummyAppointments: Booking[] = [
  {
    _id: "698a3d7f21c67387a82e9b21",
    doctorId: "doctor-1",
    service: "Cardiology",
    date: "2026-02-09",
    time: "10:30 AM",
    status: "confirmed",
    createdAt: "2026-02-09T20:03:11.797Z",
    updatedAt: "2026-02-09T20:03:11.797Z",
    patientEmail: "willyscriptor@gmail.com",
    patientPhone: "0790080450",
    paymentMethod: "MTN Mobile Money",
    amount: 150,
  },
  {
    _id: "698a3d7f21c67387a82e9b22",
    doctorId: "doctor-2",
    service: "General Checkup",
    date: "2026-02-15",
    time: "2:00 PM",
    status: "pending",
    createdAt: "2026-02-10T10:15:22.123Z",
    updatedAt: "2026-02-10T10:15:22.123Z",
    patientEmail: "willyscriptor@gmail.com",
    patientPhone: "0790080450",
    paymentMethod: "Credit Card",
    amount: 100,
  },
  {
    _id: "698a3d7f21c67387a82e9b23",
    doctorId: "doctor-3",
    service: "Dental Cleaning",
    date: "2026-02-18",
    time: "11:00 AM",
    status: "confirmed",
    createdAt: "2026-02-11T14:30:45.456Z",
    updatedAt: "2026-02-11T14:30:45.456Z",
    patientEmail: "willyscriptor@gmail.com",
    patientPhone: "0790080450",
    paymentMethod: "Insurance",
    amount: 80,
  },
  {
    _id: "698a3d7f21c67387a82e9b24",
    doctorId: "doctor-4",
    service: "Eye Examination",
    date: "2026-02-22",
    time: "9:30 AM",
    status: "completed",
    createdAt: "2026-01-28T08:20:11.789Z",
    updatedAt: "2026-02-05T16:45:33.234Z",
    patientEmail: "willyscriptor@gmail.com",
    patientPhone: "0790080450",
    paymentMethod: "Cash",
    amount: 120,
  },
  {
    _id: "698a3d7f21c67387a82e9b25",
    doctorId: "doctor-5",
    service: "Physical Therapy",
    date: "2026-01-20",
    time: "3:00 PM",
    status: "cancelled",
    createdAt: "2026-01-15T12:10:30.567Z",
    updatedAt: "2026-01-18T09:25:15.890Z",
    patientEmail: "willyscriptor@gmail.com",
    patientPhone: "0790080450",
    paymentMethod: "Debit Card",
    amount: 90,
  },
];

export default function PatientAppointmentsPage() {
  const [appointments] = useState<Booking[]>(dummyAppointments);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch = apt.service.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          apt.doctorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          apt.patientEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || apt.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-orange-100 text-orange-600";
      case "assigned":
        return "bg-blue-100 text-blue-600";
      case "completed":
        return "bg-gray-100 text-gray-600";
      case "cancelled":
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const downloadReceipt = (appointmentId: string) => {
    alert(`Downloading receipt for appointment ${appointmentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
        <p className="text-gray-600 text-sm">View and manage all your bookings</p>
      </div>

      <div className="p-8">
        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by service or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3fac]"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a3fac]"
          >
            <option>All</option>
            <option>pending</option>
            <option>assigned</option>
            <option>confirmed</option>
            <option>completed</option>
            <option>cancelled</option>
            <option>rejected</option>
          </select>
        </div>

        {/* Appointments Grid */}
        {filteredAppointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAppointments.map((apt) => (
              <div key={apt._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
                <div className="bg-gradient-to-r from-[#1a3fac] to-[#1a3fac] p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold text-lg">{apt.service}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(apt.status)}`}
                    >
                      {apt.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-[#1a3fac]" />
                    <span className="text-sm font-medium">{apt.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4 text-[#1a3fac]" />
                    <span className="text-sm">{apt.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-[#1a3fac]" />
                    <span className="text-sm">Doctor: {apt.doctorId}</span>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Payment</p>
                        <p className="text-sm font-semibold text-gray-700">{apt.paymentMethod}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Amount</p>
                        <p className="text-lg font-bold text-green-600">${apt.amount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex gap-2">
                    <button
                      onClick={() => downloadReceipt(apt._id)}
                      className="flex-1 bg-[#1a3fac] hover:bg-[#1a3fac] text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition"
                    >
                      <Download className="w-4 h-4" />
                      Receipt
                    </button>
                    {apt.status.toLowerCase() === "confirmed" && (
                      <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg text-sm transition">
                        Reschedule
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 text-center">
                    Booked on {new Date(apt.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Appointments Found</h3>
            <p className="text-gray-500 mb-6">You don't have any appointments yet. Book your first appointment now!</p>
            <button className="px-6 py-3 bg-[#1a3fac] hover:bg-[#1a3fac] text-white rounded-lg transition">
              Book Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
