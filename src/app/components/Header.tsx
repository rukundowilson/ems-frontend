"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      const role = typeof window !== 'undefined' ? localStorage.getItem('user_role') : null;
      const userData = typeof window !== 'undefined' ? localStorage.getItem('user_data') : null;
      setIsLogged(!!token);
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

  const handleProfileClick = () => {
    if (userRole === 'doctor') {
      router.push('/adminstration/doctor');
    } else {
      router.push('/get-started');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_data');
    setIsLogged(false);
    setUserName(null);
    setUserRole(null);
    router.push('/');
  };

  return (
    <header className="py-2 bg-white shadow-sm mb-12 sticky top-0 z-50">
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
            <Link href="/get-started/booking-search" className="text-purple-600 hover:text-purple-700 font-semibold text-base">track-appointment</Link>
          </nav>

          <div className="flex items-center">
            {isLogged ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-3 text-gray-700 hover:text-gray-900 font-semibold text-base focus:outline-none"
                >
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm">
                    {userName ? userName.charAt(0).toUpperCase() : 'P'}
                  </div>
                  <span>{userName || 'Profile'}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 font-semibold text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/auth/signin" className="text-purple-600 hover:text-purple-700 font-semibold text-base">
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