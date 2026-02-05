'use client'
import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-purple-600 rounded-lg mr-2"></div>
              <span className="text-xl font-bold text-gray-900">SkyClinic</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">How it works</Link>
            <Link href="/treatments" className="text-gray-600 hover:text-gray-900">Treatment & services</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing & insurance</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">Inside Virtuwell</Link>
            <Link href="/reviews" className="text-gray-600 hover:text-gray-900">Reviews</Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
            <Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link>
          </nav>

          <div className="flex items-center">
            <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;