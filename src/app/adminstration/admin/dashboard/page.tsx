'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, Users, CheckCircle, Clock, UserCog } from 'lucide-react';
import api from '@/app/shared/services/axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    totalServices: 0,
    totalDoctors: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [genderData, setGenderData] = useState({ male: 0, female: 0 });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock data - replace with actual API calls
      setStats({
        totalAppointments: 45,
        pendingAppointments: 12,
        completedAppointments: 33,
        totalServices: 8,
        totalDoctors: 6,
      });
      
      setChartData([
        { day: 'Mon', pending: 2, completed: 4 },
        { day: 'Tue', pending: 3, completed: 5 },
        { day: 'Wed', pending: 1, completed: 6 },
        { day: 'Thu', pending: 4, completed: 3 },
        { day: 'Fri', pending: 2, completed: 7 },
      ]);

      setGenderData({ male: 4000, female: 1000 });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Hello !</h1>
        <p className="text-gray-600 mt-2">Welcome to Your Dashboard. Let's manage appointments and services efficiently</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Appointments</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalAppointments}</p>
            </div>
            <Calendar className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{stats.pendingAppointments}</p>
            </div>
            <Clock className="w-10 h-10 text-orange-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Services</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalServices}</p>
            </div>
            <Users className="w-10 h-10 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Doctors</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalDoctors}</p>
            </div>
            <UserCog className="w-10 h-10 text-green-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Appointments Status</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-teal-500 text-white rounded-full text-sm">Day</button>
              <button className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm">Week</button>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-around gap-4">
            {chartData.map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center gap-2 mb-2">
                  <div 
                    className="w-full bg-orange-400 rounded-t"
                    style={{ height: `${data.pending * 20}px` }}
                  ></div>
                  <div 
                    className="w-full bg-teal-400 rounded-t"
                    style={{ height: `${data.completed * 20}px` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">{data.day}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Completed</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="text-3xl font-bold text-teal-600">{stats.pendingAppointments}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-3xl font-bold text-teal-600">{stats.completedAppointments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Services Overview</h2>
          
          <div className="flex justify-center items-center mb-6">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#06b6d4" 
                  strokeWidth="20"
                  strokeDasharray="200 251.2"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#93c5fd" 
                  strokeWidth="20"
                  strokeDasharray="51.2 251.2"
                  strokeDashoffset="-200"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Active Services</span>
              </div>
              <span className="font-semibold text-gray-800">{stats.totalServices}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                <span className="text-sm text-gray-600">Total Bookings</span>
              </div>
              <span className="font-semibold text-gray-800">{stats.totalAppointments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
