'use client';

import React, { useState } from 'react';
import { Search, Mail, Phone, Award } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  experience: string;
  avatar: string;
  status: 'available' | 'busy' | 'offline';
}

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      email: 'sarah.j@hospital.com',
      phone: '+1 (555) 123-4567',
      experience: '15 years',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff',
      status: 'available',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      email: 'michael.c@hospital.com',
      phone: '+1 (555) 234-5678',
      experience: '12 years',
      avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=6366F1&color=fff',
      status: 'busy',
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrician',
      email: 'emily.r@hospital.com',
      phone: '+1 (555) 345-6789',
      experience: '10 years',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=EC4899&color=fff',
      status: 'available',
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedic Surgeon',
      email: 'james.w@hospital.com',
      phone: '+1 (555) 456-7890',
      experience: '18 years',
      avatar: 'https://ui-avatars.com/api/?name=James+Wilson&background=F59E0B&color=fff',
      status: 'available',
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      specialty: 'Dermatologist',
      email: 'lisa.a@hospital.com',
      phone: '+1 (555) 567-8901',
      experience: '8 years',
      avatar: 'https://ui-avatars.com/api/?name=Lisa+Anderson&background=10B981&color=fff',
      status: 'offline',
    },
    {
      id: 6,
      name: 'Dr. Robert Taylor',
      specialty: 'General Practitioner',
      email: 'robert.t@hospital.com',
      phone: '+1 (555) 678-9012',
      experience: '20 years',
      avatar: 'https://ui-avatars.com/api/?name=Robert+Taylor&background=8B5CF6&color=fff',
      status: 'available',
    },
  ];

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'busy':
        return 'bg-orange-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'busy':
        return 'Busy';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Doctors</h1>
        <p className="text-gray-600 mt-2">View and manage doctor profiles</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="relative">
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full"
                />
                <div
                  className={`absolute bottom-0 right-0 w-4 h-4 ${getStatusColor(
                    doctor.status
                  )} rounded-full border-2 border-white`}
                  title={getStatusText(doctor.status)}
                ></div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                <p className="text-sm text-blue-600">{doctor.specialty}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{doctor.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{doctor.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="w-4 h-4 text-gray-400" />
                <span>{doctor.experience} experience</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                  doctor.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : doctor.status === 'busy'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className={`w-2 h-2 ${getStatusColor(doctor.status)} rounded-full`}></div>
                {getStatusText(doctor.status)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No doctors found matching your search.</p>
        </div>
      )}
    </div>
  );
}
