'use client';

import React, { useEffect, useState } from 'react';
import { Search, Filter, UserPlus, X, CheckCircle } from 'lucide-react';
import api from '@/app/shared/services/axios';

interface Appointment {
  id: number;
  patientName: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'assigned' | 'completed' | 'cancelled';
  doctor?: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Davis'];

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, searchTerm, filterStatus]);

  const fetchAppointments = async () => {
    try {
      // Mock data - replace with actual API call
      const mockData: Appointment[] = [
        { id: 1, patientName: 'John Doe', service: 'General Checkup', date: '2024-02-15', time: '10:00 AM', status: 'pending' },
        { id: 2, patientName: 'Jane Smith', service: 'Dental Cleaning', date: '2024-02-15', time: '11:00 AM', status: 'assigned', doctor: 'Dr. Smith' },
        { id: 3, patientName: 'Bob Johnson', service: 'Eye Exam', date: '2024-02-16', time: '09:00 AM', status: 'pending' },
        { id: 4, patientName: 'Alice Brown', service: 'Blood Test', date: '2024-02-16', time: '02:00 PM', status: 'completed', doctor: 'Dr. Johnson' },
        { id: 5, patientName: 'Charlie Wilson', service: 'X-Ray', date: '2024-02-17', time: '03:00 PM', status: 'cancelled' },
      ];
      setAppointments(mockData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const filterAppointments = () => {
    let filtered = appointments;

    if (searchTerm) {
      filtered = filtered.filter(apt => 
        apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(apt => apt.status === filterStatus);
    }

    setFilteredAppointments(filtered);
  };

  const handleAssignDoctor = async () => {
    if (!selectedAppointment || !selectedDoctor) return;

    try {
      // API call to assign doctor
      const updated = appointments.map(apt => 
        apt.id === selectedAppointment.id 
          ? { ...apt, doctor: selectedDoctor, status: 'assigned' as const }
          : apt
      );
      setAppointments(updated);
      setShowAssignModal(false);
      setSelectedAppointment(null);
      setSelectedDoctor('');
    } catch (error) {
      console.error('Error assigning doctor:', error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      const updated = appointments.map(apt => 
        apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
      );
      setAppointments(updated);
    } catch (error) {
      console.error('Error rejecting appointment:', error);
    }
  };

  const handleCancel = async (id: number) => {
    try {
      const updated = appointments.map(apt => 
        apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
      );
      setAppointments(updated);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Appointments Management</h1>
        <p className="text-gray-600 mt-2">Manage and assign appointments to doctors</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by patient name or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Patient Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Service</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Doctor</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{appointment.patientName}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{appointment.service}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{appointment.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{appointment.time}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{appointment.doctor || '-'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      {appointment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowAssignModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Assign Doctor"
                          >
                            <UserPlus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(appointment.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {appointment.status === 'assigned' && (
                        <button
                          onClick={() => handleCancel(appointment.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Cancel"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAssignModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Assign Doctor</h2>
            <p className="text-gray-600 mb-4">
              Patient: <span className="font-semibold">{selectedAppointment?.patientName}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Service: <span className="font-semibold">{selectedAppointment?.service}</span>
            </p>
            
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            >
              <option value="">Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor} value={doctor}>{doctor}</option>
              ))}
            </select>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedAppointment(null);
                  setSelectedDoctor('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignDoctor}
                disabled={!selectedDoctor}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
