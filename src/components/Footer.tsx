import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-200">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/business" className="text-gray-600 hover:text-gray-900">For business</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
            </ul>
          </div>

          
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link href="/privacy">Notice of privacy practices</Link>
              <Link href="/terms">Terms of use and site privacy</Link>
              <Link href="/nondiscrimination">Statement of nondiscrimination</Link>
            </div>
            <p className="text-sm text-gray-600 mt-4 md:mt-0">
              Copyright © 2026 virtuwell.com. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;