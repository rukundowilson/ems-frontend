'use client';

import React from 'react';
import { LayoutDashboard, Users, Calendar, Settings } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-28 bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col items-center py-6 space-y-8 fixed h-screen z-40">
        {/* Logo */}
        <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-blue-900 text-xl">
          M
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-col space-y-8">
          <button className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center hover:bg-teal-400 transition" title="Dashboard">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </button>
          <button className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500 transition" title="Patients">
            <Users className="w-6 h-6 text-white" />
          </button>
          <button className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500 transition" title="Appointments">
            <Calendar className="w-6 h-6 text-white" />
          </button>
          <button className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500 transition" title="Settings">
            <Settings className="w-6 h-6 text-white" />
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-28 overflow-auto">
        {children}
      </div>
    </div>
  );
}
