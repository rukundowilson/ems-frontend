'use client'
import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="py-2 bg-white shadow-md sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg"></div>
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
          </nav>

          <div className="flex items-center">
            <Link href="/login" className="text-purple-600 hover:text-purple-700 font-semibold text-base">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;