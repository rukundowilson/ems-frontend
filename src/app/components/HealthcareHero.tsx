import React from 'react';

export default function HealthcareHero() {
  return (
    <div className="relative  w-full h-[600px] lg:h-[700px]">
      {/* Full-width background image */}
      <div className="absolute inset-0">
        <img
          src="/images/FEATURE_human-connection_2240x850_2x-100.webp"
          alt="Healthcare professional"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Overlay text card */}
      <div className="relative h-full flex items-center justify-end px-6 lg:px-16 xl:px-24 max-w-screen-xl">
        <div className="bg-white rounded shadow-lg p-8 lg:p-10 max-w-md lg:max-w-lg">
          {/* Title */}
          <p className="text-xs lg:text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
            Real people
          </p>
          
          {/* Subtitle */}
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Always a human connection
          </h2>

          {/* Description */}
          <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
            Board-certified nurse practitioners are at the heart of every visit. 
            They create a custom treatment plan you can trust. And, they're 
            available to answer any questions about your plan for free.
          </p>

          {/* Divider */}
          <div className="w-full h-0.5 bg-gradient-to-r from-emerald-400 via-emerald-300 to-transparent mt-6"></div>
        </div>
      </div>
    </div>
  );
}