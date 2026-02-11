'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Calendar, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<{ name?: string; avatar?: string } | null>(null);

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
        {/* Logo / Profile */}
        <div
          className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-xl overflow-hidden"
          title={user?.name || 'Profile'}
        >
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name || 'avatar'} className="w-full h-full object-cover" />
          ) : (
            <span>{initials}</span>
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
          <button
            className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500 transition"
            title="Settings"
          >
            <Settings className="w-6 h-6 text-white" />
          </button>
        </nav>
        <div className="mt-auto mb-4">
          <button
            onClick={() => {
              localStorage.removeItem('auth_token');
              localStorage.removeItem('user_role');
              localStorage.removeItem('user_data');
              router.push('/auth/signin');
            }}
            className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400 transition"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-28 overflow-auto">
        {children}
      </div>
    </div>
  );
}
