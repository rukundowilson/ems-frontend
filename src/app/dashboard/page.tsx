'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock patient data - replace with real data from your backend later
const patientData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+250 123 456 789',
  dateOfBirth: 'January 15, 1990',
  bloodType: 'O+',
  allergies: ['Penicillin', 'Peanuts'],
  medicalId: 'MED-2024-001234',
};




const pastAppointments = [
  {
    id: 3,
    service: 'Dental Care',
    doctor: 'Dr. Emily White',
    date: 'Jan 28, 2024',
    time: '09:00 AM',
    status: 'Completed',
    diagnosis: 'Routine checkup - All good',
  },
  {
    id: 4,
    service: 'Laboratory Services',
    doctor: 'Lab Technician',
    date: 'Jan 20, 2024',
    time: '11:00 AM',
    status: 'Completed',
    diagnosis: 'Blood test - Results normal',
  },
];

const prescriptions = [
  {
    id: 1,
    medication: 'Amoxicillin 500mg',
    dosage: '1 tablet, 3 times daily',
    duration: '7 days',
    prescribedBy: 'Dr. Sarah Johnson',
    date: 'Jan 28, 2024',
    status: 'Active',
  },
  {
    id: 2,
    medication: 'Ibuprofen 400mg',
    dosage: '1 tablet as needed',
    duration: '14 days',
    prescribedBy: 'Dr. Emily White',
    date: 'Jan 20, 2024',
    status: 'Expired',
  },
];

export default function PatientDashboard() {
  const router = useRouter();

  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'prescriptions' | 'profile'>('overview');

  useEffect(() => {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setUpcomingAppointments(appointments);
  }, []);

  const handleConfirmAppointment = (appointmentId: number) => {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updated = appointments.map((apt: any) => 
      apt.id === appointmentId ? { ...apt, status: 'Confirmed' } : apt
    );
    localStorage.setItem('appointments', JSON.stringify(updated));
    setUpcomingAppointments(updated);
  };

  const handleCancelAppointment = (appointmentId: number) => {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const updated = appointments.filter((apt: any) => apt.id !== appointmentId);
    localStorage.setItem('appointments', JSON.stringify(updated));
    setUpcomingAppointments(updated);
  };

  const handleClearAll = () => {
    if (confirm('Clear all appointments?')) {
      localStorage.removeItem('appointments');
      setUpcomingAppointments([]);
    }
  };

  const handleRequestAppointment = () => {
    router.push('/services/all');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Patient Portal</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <Link 
                href="/services"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Browse Services
              </Link>
              <button
                onClick={handleRequestAppointment}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Request Appointment
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{patientData.name}</p>
                  <p className="text-xs text-gray-500">{patientData.medicalId}</p>
                </div>
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {patientData.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {patientData.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600">
            Manage your appointments, view prescriptions, and track your health journey.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-4 px-1 font-semibold transition-colors ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`pb-4 px-1 font-semibold transition-colors ${
                  activeTab === 'appointments'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Appointments
              </button>
              <button
                onClick={() => setActiveTab('prescriptions')}
                className={`pb-4 px-1 font-semibold transition-colors ${
                  activeTab === 'prescriptions'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Prescriptions
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-4 px-1 font-semibold transition-colors ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Profile
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Upcoming</p>
                    <p className="text-2xl font-bold text-gray-900">{upcomingAppointments.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{pastAppointments.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Active Rx</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {prescriptions.filter(p => p.status === 'Active').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
              </div>
              <div className="p-6 space-y-4">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((apt) => (
                    <div key={apt.id} className="border-l-4 border-purple-600 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">{apt.service}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {apt.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {apt.time}
                            </span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          apt.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
                )}
                <button
                  onClick={handleRequestAppointment}
                  className="block w-full text-center text-purple-600 hover:text-purple-700 font-semibold py-2 hover:bg-purple-50 rounded-lg transition-colors"
                >
                  Request New Appointment →
                </button>
              </div>
            </div>

            {/* Active Prescriptions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Active Prescriptions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {prescriptions.filter(p => p.status === 'Active').map((rx) => (
                    <div key={rx.id} className="flex justify-between items-start p-4 bg-blue-50 rounded-lg">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{rx.medication}</h3>
                        <p className="text-sm text-gray-600 mb-2">{rx.dosage}</p>
                        <p className="text-xs text-gray-500">
                          Prescribed by {rx.prescribedBy} • {rx.date}
                        </p>
                      </div>
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {rx.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
                <div className="flex gap-2">
                  {upcomingAppointments.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={handleRequestAppointment}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Request New
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((apt) => (
                    <div key={apt.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-lg text-gray-900">{apt.service}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              apt.status === 'Confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {apt.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500 text-xs mb-1">Date</p>
                              <p className="font-medium text-gray-900">{apt.date}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 text-xs mb-1">Time</p>
                              <p className="font-medium text-gray-900">{apt.time}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {apt.status === 'Pending' && (
                            <button 
                              onClick={() => handleConfirmAppointment(apt.id)}
                              className="text-green-600 hover:text-green-700 px-3 py-1 rounded border border-green-600 hover:bg-green-50 transition-colors text-sm font-medium"
                            >
                              Confirm
                            </button>
                          )}
                          <button 
                            onClick={() => handleCancelAppointment(apt.id)}
                            className="text-red-600 hover:text-red-700 px-3 py-1 rounded border border-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">No upcoming appointments</div>
                )}
              </div>
            </div>

            {/* Past Appointments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Past Appointments</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {pastAppointments.map((apt) => (
                  <div key={apt.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg text-gray-900">{apt.service}</h3>
                          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                            {apt.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{apt.doctor}</p>
                        <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Date</p>
                            <p className="font-medium text-gray-900">{apt.date}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Time</p>
                            <p className="font-medium text-gray-900">{apt.time}</p>
                          </div>
                        </div>
                        <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r">
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">Diagnosis:</span> {apt.diagnosis}
                          </p>
                        </div>
                      </div>
                      <button className="text-purple-600 hover:text-purple-700 px-3 py-1 rounded border border-purple-600 hover:bg-purple-50 transition-colors text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prescriptions' && (
          <div className="space-y-6">
            {/* Active Prescriptions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Active Prescriptions</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {prescriptions.filter(p => p.status === 'Active').map((rx) => (
                  <div key={rx.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{rx.medication}</h3>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Dosage</p>
                            <p className="font-medium text-gray-900">{rx.dosage}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Duration</p>
                            <p className="font-medium text-gray-900">{rx.duration}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Prescribed by <span className="font-semibold">{rx.prescribedBy}</span> on {rx.date}
                        </p>
                      </div>
                      <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Prescriptions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Past Prescriptions</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {prescriptions.filter(p => p.status === 'Expired').map((rx) => (
                  <div key={rx.id} className="p-6 opacity-75">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{rx.medication}</h3>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Dosage</p>
                            <p className="font-medium text-gray-900">{rx.dosage}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Duration</p>
                            <p className="font-medium text-gray-900">{rx.duration}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Prescribed by <span className="font-semibold">{rx.prescribedBy}</span> on {rx.date}
                        </p>
                      </div>
                      <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-semibold">
                        Expired
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                <button className="text-purple-600 hover:text-purple-700 font-semibold">
                  Edit
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Full Name</p>
                    <p className="font-semibold text-gray-900">{patientData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Medical ID</p>
                    <p className="font-semibold text-gray-900">{patientData.medicalId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                    <p className="font-semibold text-gray-900">{patientData.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Blood Type</p>
                    <p className="font-semibold text-gray-900">{patientData.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-semibold text-gray-900">{patientData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="font-semibold text-gray-900">{patientData.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Medical Information</h2>
                <button className="text-purple-600 hover:text-purple-700 font-semibold">
                  Update
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">Allergies</p>
                  <div className="flex gap-2">
                    {patientData.allergies.map((allergy, index) => (
                      <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Emergency Contact</p>
                  <p className="font-semibold text-gray-900">Jane Doe - +250 987 654 321</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}