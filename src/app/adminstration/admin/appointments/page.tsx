"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, UserPlus, X } from "lucide-react";

import { useTheme } from "@/app/contexts/ThemeContext";
import api, { setAuthToken } from "@/app/shared/services/axios";

interface Booking {
  id: string;
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

const availableDoctors = [
  "Dr. Sarah Smith",
  "Dr. John Johnson",
  "Dr. Emily Davis",
];

export default function AppointmentsPage() {
  const { darkMode } = useTheme();
  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setAuthToken(token);
    }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/bookings");
      setAppointments(response.data.data || response.data || []);
    } catch (error: any) {
      console.error("Error fetching bookings:", error.response?.data || error.message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignDoctor = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
    setShowAssignModal(true);
  };

  const confirmAssign = () => {
    if (selectedAppointment && selectedDoctor) {
      setAppointments(
        appointments.map((apt) =>
          apt.id === selectedAppointment
            ? { ...apt, doctorId: selectedDoctor, status: "assigned" }
            : apt
        )
      );
      setShowAssignModal(false);
      setSelectedDoctor("");
    }
  };

  const handleReject = (id: string) => {
    setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, status: "rejected" } : apt)));
  };

  const handleCancel = (id: string) => {
    setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, status: "cancelled" } : apt)));
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patientPhone.includes(searchTerm);
    const matchesFilter =
      filterStatus === "All" ||
      apt.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-lg`}>
          Loading bookings...
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
          Appointments Management
        </h1>
        <p className={`mt-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Assign doctors, approve or reject appointments
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-gray-100"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option>All</option>
            <option>pending</option>
            <option>assigned</option>
            <option>confirmed</option>
            <option>rejected</option>
            <option>cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div
        className={`rounded-xl shadow-md overflow-x-auto ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <table className="w-full min-w-max">
          <thead className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-sm">Patient Info</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Service</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Date & Time</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Payment</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Doctor ID</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((apt) => (
                <tr
                  key={apt.id}
                  className={`border-b ${
                    darkMode
                      ? "border-gray-700 hover:bg-gray-700"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="font-medium text-sm truncate max-w-[200px]">
                      {apt.patientEmail}
                    </div>
                    <div className="text-xs text-gray-500">
                      {apt.patientPhone}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-sm">{apt.service}</td>

                  <td className="py-3 px-4">
                    <div className="text-sm">{apt.date}</div>
                    <div className="text-xs text-gray-500">{apt.time}</div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="text-xs">{apt.paymentMethod}</div>
                    <div className="font-semibold text-green-600 text-sm">
                      ${apt.amount}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-sm text-gray-600">
                    {apt.doctorId || "—"}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                        apt.status === "pending"
                          ? "bg-orange-100 text-orange-600"
                          : apt.status === "assigned"
                          ? "bg-blue-100 text-blue-600"
                          : apt.status === "confirmed"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      {apt.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleAssignDoctor(apt.id)}
                            className="bg-teal-500 hover:bg-teal-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1"
                          >
                            <UserPlus className="w-3 h-3" />
                            Assign
                          </button>
                          <button
                            onClick={() => handleReject(apt.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {(apt.status === "assigned" ||
                        apt.status === "confirmed") && (
                        <button
                          onClick={() => handleCancel(apt.id)}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className={`py-8 text-center ${
                    darkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-gray-100/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className={`rounded-xl p-6 w-96 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Assign Doctor</h3>
              <button onClick={() => setShowAssignModal(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4 text-black"
            >
              <option value="">Choose a doctor...</option>
              {availableDoctors.map((doc) => (
                <option key={doc} value={doc}>
                  {doc}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <button
                onClick={confirmAssign}
                disabled={!selectedDoctor}
                className="flex-1 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white py-2 rounded-lg"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowAssignModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
