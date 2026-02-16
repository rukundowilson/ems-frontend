"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Settings,
  LogOut,
  Briefcase,
  UserCircle,
  Home,
  User,
  Search,
  Bell,
  Plus,
  Moon,
  Sun,
  ChevronRight,
} from "lucide-react";
import QueryProvider from "@/app/providers/QueryProvider";
import { ThemeProvider, useTheme } from "@/app/contexts/ThemeContext";

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();

  const [user, setUser] = useState<{ name?: string; avatar?: string } | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("user_data");
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
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "A";

  return (
    <QueryProvider>
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Fixed Sidebar */}
      <div className="w-28 bg-gradient-to-b from-blue-900 to-blue-700 text-white flex flex-col items-center py-6 space-y-8 fixed h-screen z-40">
        <Link
          href="/adminstration/admin"
          className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-blue-900 text-xl overflow-hidden hover:ring-2 hover:ring-yellow-300 transition"
          title={user?.name || "Admin"}
        >
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || "avatar"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </Link>

        <nav className="flex flex-col space-y-8">
          <Link
            href="/adminstration/admin"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/admin" ? "bg-teal-500" : "bg-blue-600 hover:bg-blue-500"}`}
            title="Overview"
          >
            <LayoutDashboard className="w-6 h-6 text-white" />
          </Link>
          <Link
            href="/adminstration/admin/doctors"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/admin/doctors" ? "bg-teal-500" : "bg-blue-600 hover:bg-blue-500"}`}
            title="Doctors"
          >
            <Users className="w-6 h-6 text-white" />
          </Link>
          <Link
            href="/adminstration/admin/patients"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/admin/patients" ? "bg-teal-500" : "bg-blue-600 hover:bg-blue-500"}`}
            title="Patients"
          >
            <UserCircle className="w-6 h-6 text-white" />
          </Link>
          <Link
            href="/adminstration/admin/appointments"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/admin/appointments" ? "bg-teal-500" : "bg-blue-600 hover:bg-blue-500"}`}
            title="Appointments"
          >
            <Calendar className="w-6 h-6 text-white" />
          </Link>
          <Link
            href="/adminstration/admin/manage/services"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname?.includes("/services") ? "bg-teal-500" : "bg-blue-600 hover:bg-blue-500"}`}
            title="Services"
          >
            <Briefcase className="w-6 h-6 text-white" />
          </Link>
          <Link
            href="/adminstration/admin/settings"
            className={`w-12 h-12 rounded-lg flex items-center justify-center hover:bg-teal-400 transition ${pathname === "/adminstration/admin/settings" ? "bg-teal-500" : "bg-blue-600 hover:bg-blue-500"}`}
            title="Settings"
          >
            <Settings className="w-6 h-6 text-white" />
          </Link>
        </nav>
        <div className="mt-auto mb-4">
          <button
            onClick={() => {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("user_role");
              localStorage.removeItem("user_data");
              router.push("/auth/signin");
            }}
            className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400 transition"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-28 flex flex-col">
        {/* Fixed Header */}
        <div className={`${darkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-white shadow-md'} px-8 py-4 flex items-center justify-between fixed top-0 right-0 left-28 z-30`}>
          <div className="flex items-center gap-6 flex-1">
            {/* Breadcrumbs */}
            <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dashboard</span>
              {pathname !== "/adminstration/admin" && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span className={`capitalize ${darkMode ? 'text-white' : 'text-gray-900'}`}>{pathname.split("/").pop()}</span>
                </>
              )}
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search patients, doctors..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (!e.target.value.trim()) {
                      setShowSearchResults(false);
                      setSearchResults([]);
                    }
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      setSearching(true);
                      setShowSearchResults(true);
                      try {
                        const [patients, doctors, appointments] = await Promise.all([
                          fetch('http://localhost:4000/api/admin/patients', {
                            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
                          }).then(r => r.json()),
                          fetch('http://localhost:4000/api/admin/doctors', {
                            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
                          }).then(r => r.json()),
                          fetch('http://localhost:4000/api/admin/bookings', {
                            headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
                          }).then(r => r.json())
                        ]);
                        
                        const query = searchQuery.toLowerCase();
                        const results = [
                          ...(patients.data || []).filter((p: any) => 
                            p.name?.toLowerCase().includes(query) || p.email?.toLowerCase().includes(query)
                          ).map((p: any) => ({ ...p, type: 'patient' })),
                          ...(doctors.data || []).filter((d: any) => 
                            d.name?.toLowerCase().includes(query) || d.email?.toLowerCase().includes(query) || d.specialization?.toLowerCase().includes(query)
                          ).map((d: any) => ({ ...d, type: 'doctor' })),
                          ...(appointments.data || []).filter((a: any) => 
                            a.patientName?.toLowerCase().includes(query) || a.service?.toLowerCase().includes(query)
                          ).map((a: any) => ({ ...a, type: 'appointment' }))
                        ];
                        setSearchResults(results);
                      } catch (err) {
                        console.error('Search error:', err);
                      } finally {
                        setSearching(false);
                      }
                    }
                  }}
                  onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
                  onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
                />
                {showSearchResults && (
                  <div className={`absolute top-full left-0 right-0 mt-2 rounded-lg shadow-lg border max-h-96 overflow-y-auto z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    {searching ? (
                      <div className="px-4 py-3 text-center text-sm text-gray-500">Searching...</div>
                    ) : searchResults.length === 0 ? (
                      <div className="px-4 py-3 text-center text-sm text-gray-500">No results found</div>
                    ) : (
                      searchResults.map((result, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            if (result.type === 'patient') router.push('/adminstration/admin/patients');
                            else if (result.type === 'doctor') router.push('/adminstration/admin/doctors');
                            else if (result.type === 'appointment') router.push('/adminstration/admin/appointments');
                            setShowSearchResults(false);
                          }}
                          className={`px-4 py-3 cursor-pointer border-b last:border-b-0 ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'}`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                                {result.name || result.patientName || 'N/A'}
                              </p>
                              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {result.email || result.service || ''}
                              </p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${result.type === 'patient' ? 'bg-blue-100 text-blue-700' : result.type === 'doctor' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                              {result.type}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Actions */}
            <div className="relative">
              <button
                onClick={() => setShowQuickAdd(!showQuickAdd)}
                className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-all"
                title="Quick Add"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden md:inline">Quick Add</span>
              </button>
              {showQuickAdd && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border py-2 z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <button
                    onClick={() => { setShowQuickAdd(false); router.push('/adminstration/admin/appointments'); }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-purple-50'}`}
                  >
                    New Appointment
                  </button>
                  <button
                    onClick={() => { setShowQuickAdd(false); router.push('/adminstration/admin/patients'); }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-purple-50'}`}
                  >
                    New Patient
                  </button>
                  <button
                    onClick={() => { setShowQuickAdd(false); router.push('/adminstration/admin/doctors'); }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-purple-50'}`}
                  >
                    New Doctor
                  </button>
                  <button
                    onClick={() => { setShowQuickAdd(false); router.push('/adminstration/admin/services'); }}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-purple-50'}`}
                  >
                    New Service
                  </button>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                title="Notifications"
              >
                <Bell className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg border py-2 z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className={`px-4 py-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <h3 className={`font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className={`px-4 py-3 cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>New appointment request</p>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>2 minutes ago</p>
                    </div>
                    <div className={`px-4 py-3 cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Doctor profile updated</p>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>1 hour ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
            </button>

            {/* User Info */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
              <span className={`text-sm font-medium ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>{user?.name || "Admin"}</span>
              <User className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>

            {/* Home Button */}
            <button 
              onClick={() => router.push('/')}
              className="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-white transition-all"
              title="Go to Home"
            >
              <Home className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto mt-20">
          {children}
        </div>
      </div>
    </div>
    </QueryProvider>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </QueryProvider>
    </ThemeProvider>
  );
}
