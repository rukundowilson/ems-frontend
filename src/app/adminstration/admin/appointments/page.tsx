"use client";

import React, { useState } from "react";
import { Search, Filter, UserPlus, X } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";

const dummyAppointments = [
  {
    id: 1,
    patient: "John Doe",
    service: "General Consultation",
    date: "2024-02-10",
    time: "10:00 AM",
    status: "Pending",
    assignedDoctor: null,
  },
  {
    id: 2,
    patient: "Jane Wilson",
    service: "Cardiology Checkup",
    date: "2024-02-10",
    time: "11:30 AM",
    status: "Assigned",
    assignedDoctor: "Dr. Sarah Smith",
  },
  {
    id: 3,
    patient: "Mike Brown",
    service: "Neurology Consultation",
    date: "2024-02-11",
    time: "2:00 PM",
    status: "Pending",
    assignedDoctor: null,
  },
];

const availableDoctors = [
  "Dr. Sarah Smith",
  "Dr. John Johnson",
  "Dr. Emily Davis",
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(dummyAppointments);
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<number | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const handleAssignDoctor = (appointmentId: number) => {
    setSelectedAppointment(appointmentId);
    setShowAssignModal(true);
  };

  const confirmAssign = () => {
    if (selectedAppointment && selectedDoctor) {
      setAppointments(
        appointments.map((apt) =>
          apt.id === selectedAppointment
            ? { ...apt, assignedDoctor: selectedDoctor, status: "Assigned" }
            : apt
        )
      );
      setShowAssignModal(false);
      setSelectedDoctor("");
    }
  };

  const handleReject = (id: number) => {
    setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, status: "Rejected" } : apt)));
  };

  const handleCancel = (id: number) => {
    setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, status: "Cancelled" } : apt)));
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch = apt.patient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || apt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Appointments Management</h1>
        <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Assign doctors, approve or reject appointments</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Assigned</option>
            <option>Confirmed</option>
            <option>Rejected</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div className={`rounded-xl shadow-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <table className="w-full">
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th className={`text-left py-4 px-6 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Patient</th>
              <th className={`text-left py-4 px-6 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Service</th>
              <th className={`text-left py-4 px-6 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Date & Time</th>
              <th className={`text-left py-4 px-6 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Assigned Doctor</th>
              <th className={`text-left py-4 px-6 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Status</th>
              <th className={`text-left py-4 px-6 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((apt) => (
              <tr key={apt.id} className={`border-b transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                <td className={`py-4 px-6 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{apt.patient}</td>
                <td className={`py-4 px-6 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{apt.service}</td>
                <td className={`py-4 px-6 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                  {apt.date} <br />
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{apt.time}</span>
                </td>
                <td className={`py-4 px-6 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                  {apt.assignedDoctor || <span className={`italic ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Not assigned</span>}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      apt.status === "Pending"
                        ? "bg-orange-100 text-orange-600"
                        : apt.status === "Assigned"
                          ? "bg-blue-100 text-blue-600"
                          : apt.status === "Confirmed"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                    }`}
                  >
                    {apt.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    {apt.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleAssignDoctor(apt.id)}
                          className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                        >
                          <UserPlus className="w-4 h-4" />
                          Assign
                        </button>
                        <button
                          onClick={() => handleReject(apt.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {(apt.status === "Assigned" || apt.status === "Confirmed") && (
                      <button
                        onClick={() => handleCancel(apt.id)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAssignModal && (
        <div className="fixed inset-0 bg-gray-100 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Assign Doctor</h3>
              <button onClick={() => setShowAssignModal(false)}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Doctor
              </label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Choose a doctor...</option>
                {availableDoctors.map((doc) => (
                  <option key={doc} value={doc}>
                    {doc}
                  </option>
                ))}
              </select>
            </div>
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
