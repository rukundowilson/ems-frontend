import React from 'react';
import { ChevronRight } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            {/* Section Label */}
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              How it works
            </p>

            {/* Main Heading */}
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Answer questions from anywhere on any device
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed">
              Quickly get a diagnosis, treatment plan and prescription (if needed) from one of our board-certified nurse practitioners.
            </p>

            {/* Divider Line */}
            <div className="w-16 h-0.5 bg-gray-300"></div>

            {/* CTA Link */}
            <a 
              href="#" 
              className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-semibold text-lg transition-colors group"
            >
              How it works
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Column - Circular Image with Purple Arc */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Purple Arc */}
              <svg className="absolute inset-0 w-full h-full -rotate-45" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="purpleArc" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#d946ef', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <circle
                  cx="200"
                  cy="200"
                  r="190"
                  fill="none"
                  stroke="url(#purpleArc)"
                  strokeWidth="16"
                  strokeDasharray="280 1000"
                  strokeLinecap="round"
                />
              </svg>

              {/* Circular Image Container */}
              <div className="absolute inset-0 p-4 flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden shadow-2xl">
                  {/* Replace with actual image */}
                  <img 
                    src="/images/how-it-works.avif" 
                    alt="Hand holding phone with Virtuwell app"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
