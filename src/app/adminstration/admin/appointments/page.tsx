"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, UserPlus, X } from "lucide-react";

interface Booking {
  _id: string;
  doctorId: string;
  patientId?: string;
  service: string;
  date: string;
  time: string;
  patientEmail?: string;
  patientName?: string;
  patientPhone?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface Doctor {
  _id: string;
  name: string;
  email: string;
  specialization?: string;
}

const API_BASE = "http://localhost:4000/api";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${API_BASE}/bookings`);
      const data = await res.json();
      console.log('Appointments data:', data);
      if (data.success) {
        setAppointments(data.data);
      } else {
        console.error('Failed to fetch appointments:', data.error);
      }
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${API_BASE}/doctors`);
      const data = await res.json();
      console.log('Doctors data:', data);
      if (data.success) {
        setDoctors(data.data);
      } else {
        console.error('Failed to fetch doctors:', data.error);
      }
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    }
  };

  const handleAssignDoctor = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
    setShowAssignModal(true);
  };

  const confirmAssign = async () => {
    if (!selectedAppointment || !selectedDoctor) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/bookings/${selectedAppointment}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorId: selectedDoctor, status: "confirmed" }),
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(
          appointments.map((apt) =>
            apt._id === selectedAppointment ? data.data : apt
          )
        );
        setShowAssignModal(false);
        setSelectedDoctor("");
      } else {
        alert(data.error || "Failed to assign doctor");
      }
    } catch (err) {
      alert("Failed to assign doctor");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm("Are you sure you want to reject this appointment?")) return;
    try {
      const res = await fetch(`${API_BASE}/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(appointments.map((apt) => (apt._id === id ? data.data : apt)));
      } else {
        alert(data.error || "Failed to reject appointment");
      }
    } catch (err) {
      alert("Failed to reject appointment");
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      const res = await fetch(`${API_BASE}/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(appointments.map((apt) => (apt._id === id ? data.data : apt)));
      } else {
        alert(data.error || "Failed to cancel appointment");
      }
    } catch (err) {
      alert("Failed to cancel appointment");
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch = apt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchesFilter = filterStatus === "All" || apt.status === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getDoctorName = (doctorId: string) => {
    const doctor = doctors.find(d => d._id === doctorId);
    return doctor ? doctor.name : "Not assigned";
  };

  return (
    <div className="p-8" suppressHydrationWarning>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Appointments Management</h1>
        <p className="text-gray-600 mt-1">Assign doctors, approve or reject appointments</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            suppressHydrationWarning
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            suppressHydrationWarning
          >
            <option>All</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-6 text-gray-600 font-semibold">Patient</th>
              <th className="text-left py-4 px-6 text-gray-600 font-semibold">Service</th>
              <th className="text-left py-4 px-6 text-gray-600 font-semibold">Date & Time</th>
              <th className="text-left py-4 px-6 text-gray-600 font-semibold">Assigned Doctor</th>
              <th className="text-left py-4 px-6 text-gray-600 font-semibold">Status</th>
              <th className="text-left py-4 px-6 text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 px-6 text-center text-gray-500">
                  {appointments.length === 0 ? "No appointments found in the database." : "No appointments match your search criteria."}
                </td>
              </tr>
            ) : (
              filteredAppointments.map((apt) => (
              <tr key={apt._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-6 font-medium">{apt.patientName || apt.patientEmail || "N/A"}</td>
                <td className="py-4 px-6">{apt.service}</td>
                <td className="py-4 px-6">
                  {apt.date} <br />
                  <span className="text-sm text-gray-500">{apt.time}</span>
                </td>
                <td className="py-4 px-6">
                  {getDoctorName(apt.doctorId)}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      apt.status === "pending"
                        ? "bg-orange-100 text-orange-600"
                        : apt.status === "confirmed"
                          ? "bg-green-100 text-green-600"
                          : apt.status === "completed"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-red-100 text-red-600"
                    }`}
                  >
                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    {apt.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleAssignDoctor(apt._id)}
                          className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                        >
                          <UserPlus className="w-4 h-4" />
                          Assign
                        </button>
                        <button
                          onClick={() => handleReject(apt._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {(apt.status === "confirmed" || apt.status === "completed") && (
                      <button
                        onClick={() => handleCancel(apt._id)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )))}
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
                suppressHydrationWarning
              >
                <option value="">Choose a doctor...</option>
                {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name} {doc.specialization ? `- ${doc.specialization}` : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={confirmAssign}
                disabled={!selectedDoctor || loading}
                className="flex-1 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 text-white py-2 rounded-lg"
              >
                {loading ? "Assigning..." : "Confirm"}
              </button>
              <button
                onClick={() => setShowAssignModal(false)}
                disabled={loading}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg disabled:opacity-50"
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
