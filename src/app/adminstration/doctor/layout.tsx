'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Calendar, Settings, LogOut, List, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<{ name?: string; avatar?: string; _id?: string } | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem('user_data');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      setUser(parsed || null);
    } catch (e) {
      // ignore
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'M';

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-28 bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col items-center py-6 space-y-8 fixed h-screen z-40">
        {/* Logo / Profile - Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-xl overflow-hidden hover:ring-2 hover:ring-yellow-300 transition"
            title={user?.name || 'Profile'}
          >
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name || 'avatar'} className="w-full h-full object-cover" />
            ) : (
              <span>{initials}</span>
            )}
          </button>

          {/* Dropdown Menu */}
          {showProfileDropdown && (
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 rounded-lg shadow-xl py-2 w-48 z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="font-semibold text-sm">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.name ? 'Profile' : 'No name'}</p>
              </div>
              {user?._id && (
                <Link
                  href={`/doctor/${user._id}`}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition text-sm"
                  onClick={() => setShowProfileDropdown(false)}
                >
                  <User className="w-4 h-4" />
                  View Profile
                </Link>
              )}
              <button
                onClick={() => {
                  localStorage.removeItem('auth_token');
                  localStorage.removeItem('user_role');
                  localStorage.removeItem('user_data');
                  setShowProfileDropdown(false);
                  router.push('/auth/signin');
                }}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 transition text-sm text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Navigation Icons */}
        <nav className="flex flex-col space-y-8">
          <Link
            href="/adminstration/doctor"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/doctor" ? "bg-teal-500" : "bg-blue-600 hover:bg-blue-500"}`}
            title="Dashboard"
          >
            <LayoutDashboard className="w-6 h-6 text-white" />
          </Link>
          <button
            className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500 transition"
            title="Patients"
          >
            <Users className="w-6 h-6 text-white" />
          </button>
          <Link
            href="/adminstration/doctor/calendar"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/doctor/calendar" ? "bg-teal-500" : "bg-blue-600 hover:bg-blue-500"}`}
            title="Calendar Planning"
          >
            <Calendar className="w-6 h-6 text-white" />
          </Link>
<<<<<<< HEAD:src/app/adminstration/layout.tsx
          <Link href="/adminstration/doctor/bookings" className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === '/adminstration/doctor/bookings' ? 'bg-teal-500' : 'bg-blue-600 hover:bg-blue-500'}`} title="Bookings">
            <List className="w-6 h-6 text-white" />
          </Link>
          <button className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500 transition" title="Settings">
=======
          <button
            className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500 transition"
            title="Settings"
          >
>>>>>>> d3242c68c663701aa26979bc9e0cf97c02abfb4a:src/app/adminstration/doctor/layout.tsx
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
