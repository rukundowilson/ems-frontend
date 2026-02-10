"use client"
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface MenuItem {
  title: string;
  highlighted?: boolean;
}

const PhoneMockup: React.FC = () => {
  const menuItems: MenuItem[] = [
    { title: 'Acne', highlighted: true },
    { title: 'Allergies' },
    { title: 'Asthma & Inhalers' },
    { title: 'Birth Control' },
  ];

  return (
    <div className="relative w-full max-w-xs mx-auto">
      {/* Phone Frame */}
      <div className="relative bg-white rounded-[2.25rem] p-1 shadow-xl border-[8px] border-gray-800">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-gray-800 rounded-b-xl z-10 flex items-center justify-center gap-2">
          <div className="w-8 h-1 bg-gray-700 rounded-full mt-1"></div>
          <div className="w-2 h-2 bg-gray-700 rounded-full mt-1"></div>
        </div>

        {/* Screen Container */}
        <div className="relative bg-white rounded-[2rem] overflow-hidden">
          {/* Status Bar */}
          <div className="bg-white pt-8 px-6 pb-2">
            <div className="flex justify-between items-center text-xs text-gray-900">
              <span className="font-semibold">6:30</span>
              <div className="flex items-center gap-1.5">
                {/* Signal bars */}
                <div className="flex gap-0.5 items-end">
                  <div className="w-0.5 h-2 bg-gray-900 rounded-full"></div>
                  <div className="w-0.5 h-2.5 bg-gray-900 rounded-full"></div>
                  <div className="w-0.5 h-3 bg-gray-900 rounded-full"></div>
                  <div className="w-0.5 h-3.5 bg-gray-900 rounded-full"></div>
                </div>
                {/* WiFi */}
                <svg className="w-3.5 h-3" viewBox="0 0 14 11" fill="currentColor">
                  <path d="M7 11C7.55228 11 8 10.5523 8 10C8 9.44772 7.55228 9 7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11Z"/>
                  <path d="M4.5 7C5.21667 6.28333 6.06667 5.925 7 5.925C7.93333 5.925 8.78333 6.28333 9.5 7L10.5 6C9.51667 5.01667 8.35 4.525 7 4.525C5.65 4.525 4.48333 5.01667 3.5 6L4.5 7Z"/>
                  <path d="M1.5 4C2.98333 2.51667 4.81667 1.775 7 1.775C9.18333 1.775 11.0167 2.51667 12.5 4L13.5 3C11.75 1.25 9.58333 0.375 7 0.375C4.41667 0.375 2.25 1.25 0.5 3L1.5 4Z"/>
                </svg>
                {/* Battery */}
                <svg className="w-6 h-3" viewBox="0 0 24 12" fill="none">
                  <rect x="0.5" y="1.5" width="18" height="9" rx="2" stroke="currentColor" strokeWidth="1"/>
                  <rect x="2" y="3" width="15" height="6" rx="1" fill="currentColor"/>
                  <rect x="19" y="4" width="2" height="4" rx="1" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Browser Bar */}
          <div className="px-6 pb-4">
            <div className="bg-gray-50 rounded-xl px-4 py-2.5 flex items-center gap-2 border border-gray-200">
              <svg className="w-3 h-3 text-gray-400" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span className="text-xs text-gray-600 font-medium">ems.com</span>
            </div>
          </div>

          {/* Logo */}
          <div className="px-4 pb-5 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 via-purple-500 to-teal-400 rounded-lg flex items-center justify-center shadow-sm">
              <div className="w-6 h-6 border-2 border-white/40 rounded-sm transform rotate-45"></div>
            </div>
            <span className="text-lg font-bold text-gray-900">EMS</span>
          </div>

          {/* Main Content */}
          <div className="px-4 pb-6 space-y-3">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              I'm here for:
            </h1>

            {/* Menu Items */}
            <div className="space-y-2.5">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className={`
                    rounded-2xl p-4 transition-all duration-200
                    ${item.highlighted 
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg shadow-purple-200' 
                      : 'bg-white border border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className={`font-bold text-base ${item.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </div>
                  <div className={`text-sm flex items-center gap-0.5 mt-1 font-medium ${item.highlighted ? 'text-purple-100' : 'text-purple-600'}`}>
                    Continue
                    <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom spacing for home indicator */}
          <div className="h-4"></div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default PhoneMockup;
