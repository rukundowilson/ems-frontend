"use client"
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { setAuthToken } from '@/app/shared/services/axios';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      const role = typeof window !== 'undefined' ? localStorage.getItem('user_role') : null;
      const userData = typeof window !== 'undefined' ? localStorage.getItem('user_data') : null;
      setIsLogged(!!token);
      // ensure axios has the auth header set on initial mount
      setAuthToken(token);
      setUserRole(role);
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          setUserName(parsed?.name || parsed?.email || null);
        } catch (e) {
          setUserName(null);
        }
      }
    } catch (e) {
      setIsLogged(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_data');
    // clear axios auth header
    setAuthToken(null);
    setIsLogged(false);
    setUserName(null);
    setUserRole(null);
    setDropdownOpen(false);
    router.push('/');
  };

  return (
    <header className="py-2 bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">EMS</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-12">
            <Link href="/how-it-works" className="text-gray-700 hover:text-gray-900 font-medium text-base">How it works</Link>
            <Link href="/treatments" className="text-gray-700 hover:text-gray-900 font-medium text-base">Treatment & services</Link>
            <Link href="/pricing" className="text-gray-700 hover:text-gray-900 font-medium text-base">Pricing & insurance</Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium text-base">Inside Virtuwell</Link>
            <Link href="/reviews" className="text-gray-700 hover:text-gray-900 font-medium text-base">Reviews</Link>
            <Link href="/blog" className="text-gray-700 hover:text-gray-900 font-medium text-base">Blog</Link>
            <Link href="/faq" className="text-gray-700 hover:text-gray-900 font-medium text-base">FAQ</Link>
            <Link href="/get-started/booking-search" className="text-blue-600 hover:text-blue-700 font-semibold text-base">track-appointment</Link>
          </nav>

          <div className="flex items-center">
            {isLogged ? (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 text-gray-700 hover:text-gray-900 font-semibold text-base focus:outline-none"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                    {userName ? userName.charAt(0).toUpperCase() : 'P'}
                  </div>
                  <span>{userName || 'Profile'}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">{userName || 'User'}</p>
                      <p className="text-xs text-gray-500 capitalize">{userRole || 'User'}</p>
                    </div>
                    
                    <nav className="py-2">
                      <Link
                        href={userRole === 'doctor' ? '/adminstration/doctor' : '/get-started'}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Appointments
                      </Link>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                    </nav>

                    <div className="border-t border-gray-200 p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-semibold text-base">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;